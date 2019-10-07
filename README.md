# Average achievers

Social network for average achievers

[![Welcome](https://i.gyazo.com/76a690625656d72ec25edd7df95e6e1c.png)](https://gyazo.com/76a690625656d72ec25edd7df95e6e1c)

A social network for average achievers is a single page application that I built as an assignment in [Spiced Academy](https://www.spiced-academy.com/) bootcamp and a part of learning React, React Hooks, Redux and Socket.io.

## Table of contents

-   [What I used?](#what-i-used)
-   [What I have?](#what-i-have)
-   [Showroom](#showroom)
-   [What I want?](#what-i-want)
-   [Why? - the story behind](#why)

## What I used? <a name="what-i-used"></a>

HTML, CSS, Node.js / Express, Bundle.js, PostgreSQL, React, React Hooks, Redux;

Socket.io

Csurf, Cookie Session, Bcrypt

## What I have? <a name="what-i-have"></a>

All the features:

-   Log in / Registration / Log out
-   Upload / change avatar
-   Create / edit bio
-   Find users
    -   Show last registered users OR
    -   Search bar for users, list updates on each input
-   Other user profile
    -   Image, name, bio
    -   Add Friend / Accept friendship / Pending friendship / Unfriend button depending on the current status
-   Friends and wannabes
    -   List of friends
        -   Text friend button - opens real-time private messages chat
        -   Unfriend button - removes from friends list immediately
        -   Notification if online
        -   Notification if a message has been received from that friend
        -   If no friends, link to Find people
        -   Thumbnail is a link to other user's profile
    -   List of pending friendships
        -   Accept friendship button - user immediately moved to Friends list
        -   Thumbnail is a link to other user's profile
-   Chat - real-time public chat with anyone registered
-   Private direct messages - real time chat with a certain user, with friendship already established

Created bonus features (outside general school requirement):

-   Delete profile: show all friends in modal, delete profile from database, delete image from S3 bucket, logout, redirect
-   Private messages with friends
-   Notification about received private messages in header
-   Notification about received messages on the profile of the sender in Friends list
-   Show if a friend is online

*   Added dummy users and dummy events into the database for display purposes

## <a name="showroom"></a>Showroom

## Find users

[![Find users](/public/find.gif)](/public/find.gif)

## Send and accept friend request

[![Send and accept friend request](/public/friendrequest.gif)](/public/friendrequest.gif)

## Receiving a private text message

[![Receiving a private text message](/public/text.gif)](/public/text.gif)

## Public chat

[![Public chat](https://i.gyazo.com/df1dfe5a646c8ffc66bcd95785b1bdad.png)](https://gyazo.com/df1dfe5a646c8ffc66bcd95785b1bdad)

## Delete profile

[![Image from Gyazo](https://i.gyazo.com/c0edb7e6bef99bf1567b953561827b5a.png)](https://gyazo.com/c0edb7e6bef99bf1567b953561827b5a)

## Unfriend

[![Unfriend](/public/unfriend.gif)](/public/unfriend.gif)

## <a name="what-i-want"></a>What I want?

This project was supposed to be finished and presented in 6 days so I ignored some obvious functionalities not to lose time, especially the ones I have done before on other projects and I am sure I can easily do again.

Next functionalities I want to add:

-   Develop profile - delete profile (automatically all hosted events), add interests sections
-   Develop event page - add discussion board, delete event by host - all attendees get a message that the event has been deleted
-   Develop users' connections - add Message host, show all messages with other users, block a user

## <a name="why"></a>Why? - the story behind

"From Dryanuary through to Sober October, this is the place to explore the world of sober possibilities. Attend events to meet other sober people, try something new, or find inspiration what to do today (and maybe go get wasted tomorrow). We don't judge, we inspire"

When I started the web development bootcamp, I decided to have a break from alcohol so I can help my brain cope with such a large influx of information every day and not to waste time on brain-wrecking hangovers. Obviously, I haven't become smarter, just slightly more stressed but I did have a bit more time and for most of it I had to still be in a bar, listening to drunk friends and wondering what other alcohol free overpriced drink the bar might have and when is it ok to go home. There is just so much of Jever Fun that a person can take.

When living in big cities, especially "party" places like Berlin, it is sometimes hard to socialise in any other manner than going to a bar, even up to a point where NOT binge drinking is seen as a weakness and a sign of the ultimate bore. It makes us more comfortable with people, it makes us want to talk to people, sometimes even for 10h (who would do that sober), it makes us actually like people or at least be able to stand them. It makes us feel great about ourselves and how much fun we are having. So we drink again. Cause all our friends are and cause that's what you do when you meet. Cause the work hours are done. Cause it's Friday. Cause it's any day of the week, does it really matter?

When we started doing our final project, the teacher told us to think about something that you personally would like to use - and this was the first thing that came out. So I could find inspiration what to do and find other likeminded people on these events that are not slurring and telling me about that one special time they regret. On the other hand, this is not a platform to advise people against drinking [(that's these guys)](https://www.aa.org/), but just to give different options of having fun. Something that I would actually like to see.
