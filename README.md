# Cornel's Blog Backend

This is the Node.js + Express backend for Cornel's Blog. It provides a REST API for blog posts, storing data in a local JSON file.

## Features
- REST API for blog posts (GET, POST, DELETE, PUT)
- Data persisted in posts.json
- CORS enabled for frontend access

## Tech Stack
- Node.js
- Express
- CORS middleware
- File system (fs) for persistence

## Running Locally
1. Install dependencies:
   ```
   npm install
   ```
2. Start the server:
   ```
   npm start
   ```
3. The API will be available at [http://localhost:4000/posts](http://localhost:4000/posts)

## Frontend
You need to run the frontend SPA for the user interface. See the [frontend repo](../frontend) for setup instructions.