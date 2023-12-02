# Blogging Website

Welcome to the Blogging Site,where user can register and can post Blogs on any topic, expressing his words on the perticular topic.here I have Built Backend for Blogging website using tech stacks - Node.js MongoDB, Express.js.along with Functionalities of posting ,updating ,deleting and seeing avilable Blogs by registering as a user or author.


## Table of Contents
- [Getting Started](#getting-started)
- [Setup](#Set-up)
- [Technology Stack](#technology-stack) 
- [Features](#features)
- [API](#API)
- [License](#license) 

## Getting Started
1. **Create an Account :** Register or sign-up for an account.
2. **Log-in :** Login by providing Valid Email and Password. 
3. **create or explore :** see available blogs,or create own blogs with deletion ,updation functionalities at users convinience.

 

## Setup

To run this Blogging Site App locally, follow these steps:-

**Set up the database:**
    - Create a MongoDB database or use an existing one
    - Ensure that you have Mongoose installed and running on your local machine
    
1. Clone this repository:
   ```bash
   git clone https://github.com/Kartik-Shrikhande/Blogging-Website-Assignment.git
   ```


2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the necessary environment variables in a `.env` file 

4. Run the API:
   ```bash
   npm start
   ```

## Technology Stack
- **MongoDB:** A database to store blogs related data records as well as authors or user records.
- **Express.js:** The framework for creating and smothly driving server with powerful functionalities and features
- **Node.js:** a server side runtime environment The backbone of server, handling requests with ease.
- **bcrypt:** Safeguarding users privacy and sensative data with password hashing.
- **jsonwebtoken:** Ensuring secured access for users or authors for good blogging experience.

## Features
- **User Authentication:** A secure and user-friendly system for account creation and login, powered by JSON Web Tokens (JWT).
- **Create, Edit, Delete Posts:** Craft and edit your posts effortlessly, and say goodbye when it's time to move on.

## API
## API Endpoints

## Authors API
### POST/signup
- authors or users registration

**Request Body:**
```json
{
 "title":"Mr",
 "authorsname":"Rahul raj",
 "email":"imRaj123@email.com",
"password":"Raj0123@"

}

```

**Response:**
```json
{
    "status": true,
    "message": "Author created",
    "userdata": {
        "title": "Mr",
        "authorsname": "$2b$08$wHAx/jURP9iN0piiua23teIg/baW1Asn.eMS0mYyErhX6eEBgZUx.",
        "email": "imRaj123@email.com",
        "password": "$2b$08$UzJRJfm9EJi6BOGPjx3iQ.ka41hh2sYNMFKd1jviozpxvLbuEJ0bK",
        "_id": "656ac8b2f3b02e5cdcedb6ef",
        "createdAt": "2023-12-02T06:03:30.927Z",
        "updatedAt": "2023-12-02T06:03:30.927Z",
        "__v": 0
    }
}
```

### POST/login
- author log in

**Request Body:**
```json
{
"email":"imRaj123@email.com",
"password":"Raj0123@"
}

```

**Response:**
```json
{
  "staus": true,
    "message":"User login Successfully"
}
```



## Blogs API

### GET /Blogs

Retrieve all Blogs

**Response:**
```json
{
    "status": true,
    "message": "Blogs List",
    "total": 12,
    "data": [
        {
            "_id": "656a173a269c79c296b12324",
            "title": "wwe",
            "category": "sports",
            "content": "its a modern way of wrest;ing boom",
            "authorId": "656a16e6269c79c296b12320",
            "isDeleted": false,
            "createdAt": "2023-12-01T17:26:18.622Z",
            "updatedAt": "2023-12-01T17:26:18.622Z",
            "__v": 0
        }
//more blogs....
}]
```

### GET /blog/:blogId

Retrive Blogs by Id

**Parameters:**
- `blogId`: blogId

**Response:**
```json
{
{
    "status": true,
    "message": "Blog Details",
    "data": {
        "_id": "656acc07cf8f3e57bf4a547e",
        "title": "Bitcoin",
        "category": "Crypto",
        "content": "Bitcoins are the strongest crypto currency as well highly in demand currency it appears in dubais crypto market",
        "authorId": "656a16e6269c79c296b12320",
        "isDeleted": false,
        "createdAt": "2023-12-02T06:17:43.148Z",
        "updatedAt": "2023-12-02T06:17:43.148Z",
        "__v": 0
    }
}
}
```

### POST blog/:authorId

Create a new Blog

**Request Body:**
```json
{
  "title":"Bitcoin",
    "category":"Crypto",
    "content":"Bitcoins are the strongest crypto currency as well highly in demand currency it appears in dubais crypto market"
}
```

**Response:**
```json

{
      "status": true,
    "message": "Blog successfully created",
    "createBlog": {
        "title": "Bitcoin",
        "category": "Crypto",
        "content": "Bitcoins are the strongest crypto currency as well highly in demand currency it appears in dubais crypto market",
        "authorId": "656a16e6269c79c296b12320",
        "isDeleted": false,
        "_id": "656acc07cf8f3e57bf4a547e",
        "createdAt": "2023-12-02T06:17:43.148Z",
        "updatedAt": "2023-12-02T06:17:43.148Z",
        "__v": 0
}
```

### PUT /updateblog/:authorId/:blogId

Update an existing Blog.

**Parameters:**
- `BlogId`: existing Blogs Id
- `authorId`:authorised authorId

**Request Body:**
```json
{
"category":"finance",
 "content":"crypto markets takes new highs as cryptocurrencies are gaining legal currency status"
}
```

**Response:**
```json
{
 "status": true,
    "message": "Blog is updated",
    "updateBlog": {
        "_id": "656acc07cf8f3e57bf4a547e",
        "title": "Bitcoin",
        "category": "finance",
        "content": "crypto markets takes new highs as cryptocurrencies are gaining legal currency status",
        "authorId": "656a16e6269c79c296b12320",
        "isDeleted": false,
        "createdAt": "2023-12-02T06:17:43.148Z",
        "updatedAt": "2023-12-02T06:29:10.478Z",
        "__v": 0
   }

```

### DELETE deleteblog/:authorId/:blogId

Delete blog by Id 

**Parameters:**
- `blogId`: Blog Id to delete
- `authorId` :authentic user to delete Blog

**Response:**
```
{
   "status":true,
    "message":"Blog is deleted"
}
```

## License

This project is licensed under the MIT License. ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
