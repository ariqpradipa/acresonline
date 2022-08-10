import { connectToDatabase } from "../../util/mongodb";

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const sha512 = require("js-sha512").sha512;

const cloudDB = 'mongodb+srv://superuser:AStO4UUKTtWLPE05@acresonline.atgzxpe.mongodb.net/acres?retryWrites=true&w=majority';

const scrambleCatalyst = 'TheAcresOnlineWorld';


const rand = () => {

    return Math.random().toString(36).substring(2);

}

const token = (data) => {

    return sha512(rand() + sha512(rand() + data) + rand()) + sha512(rand() + sha512(rand() + data) + rand()) + sha512(Date.now().toString());

}

export default function loginApi(req, res) {

    const { db } = await connectToDatabase();


    console.log(req);
    console.log(res);

    const server = express();
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use(cors());

    mongoose.connect(cloudDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", () => console.log("~Database connected~"));

    const userRaw = req.body.username;
    const passRaw = req.body.password;

    const username = sha512(scrambleCatalyst + userRaw.toLowerCase() + scrambleCatalyst) + sha512(userRaw.toLowerCase() + scrambleCatalyst);

    db
        .collection("accounts")
        .find({ username })
        .toArray(function (err, result) {
            if (err) {

                res.status(400).end("Error fetching listings!");

            } else {
                if (result.length === 0 || result === null) {
                    res.end('4401');

                } else {
                    const password = sha512(scrambleCatalyst + passRaw + scrambleCatalyst) + sha512(passRaw + scrambleCatalyst);

                    if (password === result[0].password) {

                        const scramble = sha512(password + username + password);
                        const useToken = token(scramble);
                        db
                            .collection("accounts")
                            .updateOne({ username }, { $set: { "currToken": useToken } }, function (err, result) {
                                if (err) {

                                    console.log(err);

                                } else {

                                    res.end(useToken);

                                }
                            });
                    }
                }
            }
        });

}
