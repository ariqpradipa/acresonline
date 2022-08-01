const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const sha256 = require("js-sha256").sha256;

const next = require("next");
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const accountModel = require("./accountModel");

const cloudDB = 'mongodb+srv://superuser:AStO4UUKTtWLPE05@acresonline.atgzxpe.mongodb.net/acres?retryWrites=true&w=majority';

const rand = () => {

  return Math.random().toString(36).substring(2);

}

const token = (data) => {

  return sha256(rand() + sha256(rand() + data) + rand()) + sha256(rand() + sha256(rand() + data) + rand());

}


app.prepare().then(() => {
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

  server.post("/srv/login", (req, res) => {

    const username = sha256(req.body.username);
    const password = req.body.password;

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
            if (sha256(password) === result[0].password) {

              const scramble = sha256(password + email + password);
              res.end(token(scramble));
            }
          }
        }
      });
  });

  server.post("/srv/register", (req, res) => {

    const username = sha256(req.body.username);

    const accountData = {
      username: sha256(req.body.username),
      email: req.body.email,
      password: sha256(req.body.password),
      createdAt: new Date(),
    };

    db
      .collection("accounts")
      .find({ username })
      .toArray(function (err, result) {
        if (err) {

          res.status(400).end("Error fetching listings!");

        } else {
          if (result.length === 0 || result === null) {

            db
              .collection("accounts")
              .insertOne(accountData, function (err, result) {
                if (err) {

                  res.status(400).end("Error creating account!");

                } else {
                  console.log("account created with id: " + result.insertedId);
                  res.end("3301");
                }
              });

          } else {
            res.end("4402");
          }
        }
      });


  });


  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});