# Average achiever

Social network for average achievers

[![Welcome](https://i.gyazo.com/76a690625656d72ec25edd7df95e6e1c.png)](https://gyazo.com/76a690625656d72ec25edd7df95e6e1c)

A social network for average achievers is a single page application that I built as an assignment in [Spiced Academy](https://www.spiced-academy.com/) bootcamp and a part of learning React, React Hooks, Redux and Socket.io.

## Table of contents

-   [What I used?](#what-i-used)
-   [What I have?](#what-i-have)
-   [Showroom](#showroom)
-   [What I want?](#what-i-want)

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

Next functionalities I want to add:

-   Show all private messages on another route
-   Mobile responsiveness
-   Get notification when friend comes online
-   Create a wall on profile page where other users can post
-   Show notification when a friend request arrives
