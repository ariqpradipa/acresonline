const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const uri = process.env.MONGODB_URI;
const options = {

    useNewUrlParser: true,
    useUnifiedTopology: true,

};

if (!process.env.MONGODB_URI) {

    throw new Error('database url in .env.local not found!');

}

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());
mongoose.connect(uri, options);

const db = mongoose.connection;

// async function database(req, res, next) {

//     const db = mongoose.connection;
//     db.on("error", console.error.bind(console, "connection error: "));
//     db.once("open", () => console.log("~Database connected~"));
//     req.db = db;
//     return next();

// }

// const middleware = nextConnect();

// middleware.use(database);

// export default middleware;

export default db;
