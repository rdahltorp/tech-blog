# Tech Blog

## Description

The world of coding is a big place, so it helps to share your thoughts and learnings with a community. That is where the Tech Blog comes into play! 

Non-registered users can review blog posts and comments and have the ability to sign up and join the community. Registered users, once signed in, can review posts and comments, but also create their own posts and comment on other posts!

This application was created from sctrach and uses backend and frontend functionality. It taugh me a lot about more complex Express routes, rendering HTML and data using Handlebars, and about cookies and authorization.


## Installation

To install this code on your machine, first clone down this repo and open in your favorite code editor. Once open be sure to:
- 'npm i' to install all packages

- open mySQL and source the schema.sql file in the DB folder. 

- If you would like starting data, run 'npm run seed'to inject the pre-made data into the SQL tables.

Then run 'npm start' to fire up the application. Once active the app will be located on server port 3001. 


## Usage

Users can use this application to learn more about coding topics from other users. Once registered, users have the ability to fillu interact with the content on the blog from creating new posts to commenting.

For a better look at this application, see the demo below, or visit this link to see it live: 

** ADD IN THE DEMO AND LINK TO HEROKU **


    ```md
    ![alt text](assets/images/screenshot.png)
    ```


## Features

Key faetures of this application include:

- Cookies and session data to allow authorized users special interactions like comments and creating new posts. 

– The cookie has an expiration to imporve security so after being idle for 5 minutes the user will need to login again. 

