# Hack-News

An hackathon platform to post challenges and manage them

## What is this Repository

This Project is a MERN Stack Project which demonstrates the following

1. Creating a Fuctional Components in React
2. Making HTTP calls using fetch API method
3. Communicating between parent and child component
4. Using NodeJS for backend
5. Creating backend endpoint APIs in NodeJS
6. Connecting ReactJS app to the backend NodeJS server
7. Using Basic Routing in React

---

## Description about the project

A web application which let users of an organisation
add/manage challenges to internal hackathons which they organise every month.
The application has these features,

- Allow users to enter into application with 'employee id'.
- Allow users to add a new challenges.
- A challenge will have a title, description and tags
- Tags will be chosen from fixed pre-defined tags
- Users can upvote a challenge, except the user who added the challenge
- Show the list of all challenges on home page

### How Hack-News app works

Initially, an user need to sign in to the application using their employee ID since this app is used internally in an organisation

After signing in, the user will have options to create a new challenge or they can view and accept challenges created by others

The user will also have option to vote (upvote/downvote) a challenge based on their liking towards the challenge

The user who created a challenge will not be able to accept or vote the same challenge they created.

---

## Prerequisites

### Install Node JS

Refer to https://nodejs.org/en/ to install Nodejs

### Install create-react-app

Install create-react-app npm package globally. This will help to easily run the project and also build the source files easily. Use the following command to install create-react-app

```bash
npm install -g create-react-app
```

or you can use the shorthand

```bash
npm i -g create-react-app
```

---

## Cloning and Running the Application in local

Clone the project into local

To install all the npm packages, Go into the project folder `(hack-news)` and type the following commands to install all npm packages

1. To install concurrently (This is to install both client and server side dependencies in a single command)

```bash
npm install
```

2. To install both client and server side dependencies in a single command

```bash
npm run install-all
```

In order to `run` the application Type the following command in `hack-news` directory

```bash
npm run start
```

The React application runs on **localhost:3000** and the Node server runs on **localhost:8000**

---

## Dependencies

#### Client Dependency

1. **`react-router-dom`** : This package is to use routing inside our React app _(to give our Single Page Application (SPA) application a multipage feel)_

#### Server Dependencies

1. **`express`** : This package is to provide small, robust tooling for HTTP servers

2. **`cors`** : This package is for providing a Connect/Express middleware that can be used to enable CORS with various options

3. **`helmet`** : This package helps you secure your Express apps by setting various HTTP headers

4. **`morgan`** : This is a HTTP request logger middleware for node.js

5. **`dotenv`** : This package is very helpful to use the environmental variables

6. **`jsonwebtoken`** : This is used to create and verify JSON Web Tokens which are used to protect the routes

7. **`uuid`** : This package helps us to get some unique ids for our challenges

8. **`nodemon`** : This is a tool that helps develop node.js faster based applications by automatically restarting the node application when file changes in the directory are detected _(installed as a development dependency in this application)_

## Application Design

#### Components

1. **Header** Component : This Component is the header component for the entire application

2. **Login** Component : This Component displays the login form to let the employees login and use the application

3. **Home** Component : This Component displays a list challenges created. It is the component that restricts the user of a specific challenge not to vote or accept the same

4. **Creator** Component : This Component is to create a new challenge and post it

5. **ModalUI** Component : This is a reusable component that helps to use modal in some parent components

6. **SelectUI** Component : This is component responsible for handling the dropdown checkbox menu to choose the tags related to the challenges

#### HTTP client

**fetch** builtin library to make http calls

---
