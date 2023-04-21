# Our Places

## What is it?

A social media style map application which allows groups to share a map. Our Places allows people to share locations with friends, family, or even their social media followers, in a much easier and visual way!

This project was built in two weeks for a software engineering bootcamp final project.

## Tech Stack

Our Places is built using React.js and Sass for the front-end, Node.js and Express.js for the back-end, and MySQL for the database, using Knex.js for migrations and seeding.

## How does it work?

People first sign up for an account, and then can create and join groups. Within a group, the map is shared between all members, including pins and comments/reviews. All members can contribute to the map by pinning locations of interest, allowing their friends to be able to see all the places that they like. As each group has its own map, people can have separate maps with different friend groups. For example, a group of foodies could have a map dedicated to their favourite places to eat, or a couple could mark out potential date spots!

## Why?

Not sure where to eat/go? Rather than only going off the opinion of reviews from people you don’t know, listen to opinions you can trust and go to places where your friends have enjoyed. Or, follow influencers that you admire and see all the places that they enjoy! You can view all of these saved places from people that you trust in a much more visual format than having to scroll through your group chat to find links or names!

# Our Places Setup Instructions

NOTE: Most of the web app is only designed for mobile screens, so please view at a width of between 320-600px when testing.

1. Clone both the client and server repos and npm i in both to install all required packages
2. Create a new MySQL database locally called "our_places_db" or whatever you prefer
3. "npm run full" in server to run seed files and migrations
4. Fill out .env files following the .env.example in both client and server. For the mapbox token on the client, you have to get this from https://account.mapbox.com/access-tokens/ (the default public token will be fine)
5. "npm start" in client and "npm run dev" in server
6. Sign up for an account and then log in with that account
7. Once logged in, create a new group. Usually, you could ask your friends to invite you to a pre-existing group. To simulate this, you can go to the user_group table in MySQL workbench/TablePlus and add yourself to group with group_id 1
8. Click to enter the new group and begin exploring the map! You can click on points of interest and add markers to them, and leave comments on those markers
