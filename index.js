const express = require("express");
const app = express();
const compression = require("compression");
const { hash, compare } = require("./utils/bc.js");
const {
    addRegister,
    getHash,
    getUser,
    updateAvatar,
    updateBio,
    getLastUsers,
    getMatchingUsers,
    getFriendState,
    addFriendRequest,
    cancelFriendRequest,
    acceptFriendRequest,
    unfriend,
    deleteprofile,
    getAllFriends,
    getChatMessages,
    insertMessage,
    getPrivateMessages
} = require("./utils/db.js");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const s3 = require("./s3");
const config = require("./config");
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });
// for heroku list you app with star in the end, List myapp.herokuapp.com:*

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});
const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.use(compression());
app.use(express.static("./public"));
app.use(express.json());

const cookieSessionMiddleware = cookieSession({
    secret:
        process.env.NODE_ENV == "production"
            ? process.env.SESS_SECRET
            : require("./secrets").sessionSecret,
    maxAge: 1000 * 60 * 60 * 24 * 14
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get("/welcome", (req, res) => {
    if (req.session.user) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/welcome", function(req, res) {
    if (!req.body.password) {
        res.json(false);
    } else {
        hash(req.body.password).then(hash => {
            addRegister(req.body.first, req.body.last, req.body.email, hash)
                .then(data => {
                    req.session.user = {
                        name: data[0].first,
                        user_id: data[0].id
                    };
                    res.json(true);
                })
                .catch(error => {
                    console.log(error);
                    res.json(false);
                });
        });
    }
});

app.post("/login", function(req, res) {
    getHash(req.body.email)
        .then(data => {
            compare(req.body.password, data.password)
                .then(match => {
                    if (match) {
                        req.session.user = {
                            user_id: data.id,
                            name: data.first
                        };

                        res.json(true);
                    } else {
                        res.json(false);
                    }
                })
                .catch(error => {
                    console.log(error);
                    res.json(false);
                });
        })
        .catch(error => {
            console.log(error);
            res.json(false);
        });
});

app.get("/user", async (req, res) => {
    try {
        const data = await getUser(req.session.user.user_id);

        res.json(data[0]);
    } catch (error) {
        console.log(error);
    }
});

app.post("/upload", uploader.single("file"), s3.upload, async (req, res) => {
    const url =
        config.s3Url + `${req.session.user.user_id}/${req.file.filename}`;

    try {
        const data = await updateAvatar(url, req.session.user.user_id);

        res.json(data);
    } catch (error) {
        console.log(error);
        res.json(false);
    }
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});

app.post("/bio", async (req, res) => {
    try {
        const data = await updateBio(
            req.body.draftbio,
            req.session.user.user_id
        );

        res.json(data);
    } catch (error) {
        console.log(error);
        res.json(false);
    }
});

app.get("/api/users/:user_id", async (req, res) => {
    try {
        const data = await getUser(req.params.user_id);

        if (data[0] == null) {
            res.json({ nouser: true });
        } else if (data[0].id == req.session.user.user_id) {
            res.json({ sameuser: true });
        } else {
            res.json(data[0]);
        }
    } catch (error) {
        console.log(error);
        res.json(false);
    }
});

app.get("/last/users", async (req, res) => {
    try {
        const lastUsers = await getLastUsers(req.session.user.user_id);

        res.json(lastUsers);
    } catch (error) {
        console.log(error);
        res.json(false);
    }
});

app.get("/last/users/:match", async (req, res) => {
    try {
        const matchingUsers = await getMatchingUsers(
            req.params.match,
            req.session.user.user_id
        );

        res.json(matchingUsers);
    } catch (error) {
        console.log(error);
        res.json(false);
    }
});

app.get("/button/:otheruser", (req, res) => {
    const profile_id = req.session.user.user_id;
    const other_id = req.params.otheruser;
    getFriendState(profile_id, other_id)
        .then(data => {
            if (data == "") {
                res.json({
                    button: "Send friend request"
                });
            } else {
                if (data[0].accepted) {
                    res.json({
                        button: "Unfriend"
                    });
                } else {
                    if (data[0].receiver_id == profile_id) {
                        res.json({
                            button: "Accept friend request"
                        });
                    } else {
                        res.json({
                            button: "Cancel friend request"
                        });
                    }
                }
            }
        })
        .catch(error => {
            console.log(error);
            res.json(false);
        });
});

app.post("/request", (req, res) => {
    const profile_id = req.session.user.user_id;
    const other_id = req.body.id;
    addFriendRequest(profile_id, other_id)
        .then(data => {
            res.json({
                button: "Cancel friend request"
            });
        })
        .catch(error => {
            console.log(error);
            res.json(false);
        });
});

app.post("/cancel", (req, res) => {
    const profile_id = req.session.user.user_id;
    const other_id = req.body.id;
    cancelFriendRequest(profile_id, other_id)
        .then(data => {
            res.json({
                button: "Send friend request"
            });
        })
        .catch(error => {
            console.log(error);
            res.json(false);
        });
});

app.post("/accept", (req, res) => {
    const profile_id = req.session.user.user_id;
    const other_id = req.body.id;
    acceptFriendRequest(profile_id, other_id)
        .then(data => {
            res.json({
                button: "Unfriend"
            });
        })
        .catch(error => {
            console.log(error);
            res.json(false);
        });
});

app.post("/unfriend", (req, res) => {
    //
    const profile_id = req.session.user.user_id;
    const other_id = req.body.id;
    unfriend(profile_id, other_id)
        .then(data => {
            res.json({
                button: "Send friend request"
            });
        })
        .catch(error => {
            console.log(error);
            res.json(false);
        });
});

app.post("/deleteuser", (req, res) => {
    Promise.all([
        s3.delete(req.session.user.user_id),
        deleteprofile(req.session.user.user_id)
    ])
        .then(() => {
            req.session = null;
            res.json(true);
        })
        .catch(error => {
            console.log(error);
            res.json(false);
        });
});

app.get("/friends-wannabes", (req, res) => {
    getAllFriends(req.session.user.user_id)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log(error);
        });
});

app.get("*", function(req, res) {
    if (!req.session.user) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

const onlineUsers = {};
server.listen(8080, function() {
    console.log("I'm listening.");
});

io.on("connection", function(socket) {
    const user_id = socket.request.session.user.user_id;
    if (!user_id) {
        return socket.disconnect(true);
    }

    onlineUsers[socket.id] = user_id;

    let onlineUsersIds = Object.values(onlineUsers);

    io.sockets.emit("online users", onlineUsersIds);

    getChatMessages()
        .then(data => {
            const reverseData = data.reverse();
            io.sockets.emit("ten messages", reverseData);
        })
        .catch(error => {
            console.log(error);
        });

    socket.on("get texts", otheruser => {
        getPrivateMessages(user_id, otheruser).then(data => {
            const reverseData = data.reverse();
            socket.emit("all texts", reverseData);
        });
    });

    socket.on("singleMessage", msg => {
        insertMessage(user_id, msg, null)
            .then(() => {
                getChatMessages().then(data => {
                    const reverseData = data.reverse();
                    io.sockets.emit("ten messages", reverseData);
                });
            })
            .catch(error => {
                console.log(error);
            });
    });

    socket.on("new text", msg => {
        insertMessage(user_id, msg.text, msg.receiver_id)
            .then(() => {
                getPrivateMessages(user_id, msg.receiver_id).then(data => {
                    const reverseData = data.reverse();
                    for (let property in onlineUsers) {
                        if (onlineUsers[property] == msg.receiver_id) {
                            io.sockets.sockets[property].emit(
                                "check texts",
                                reverseData
                            );
                            io.sockets.sockets[property].emit(
                                "text notification",
                                user_id
                            );
                        } else {
                            console.log("user not online, do smth");
                        }
                    }
                    socket.emit("all texts", reverseData);
                });
            })
            .catch(error => {
                console.log(error);
            });
    });

    socket.on("disconnect", function() {
        delete onlineUsers[socket.id];

        let onlineUsersIds = Object.values(onlineUsers);

        io.sockets.emit("online users", onlineUsersIds);
    });
});
