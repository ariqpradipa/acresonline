const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const sha512 = require("js-sha512").sha512;

const next = require("next");
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const accountModel = require("./accountModel");

const cloudDB = '';

const scrambleCatalyst = 'TheAcresOnlineWorld';

const rand = () => {

  return Math.random().toString(36).substring(2);

}

const token = (data) => {

  return sha512(rand() + sha512(rand() + data) + rand()) + sha512(rand() + sha512(rand() + data) + rand()) + sha512(Date.now().toString());

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
  });

  server.post("/srv/register", (req, res) => {

    const userRaw = req.body.username;
    const emailRaw = req.body.email;
    const passRaw = req.body.password;

    const username = sha512(scrambleCatalyst + userRaw.toLowerCase() + scrambleCatalyst) + sha512(userRaw.toLowerCase() + scrambleCatalyst);
    const password = sha512(scrambleCatalyst + passRaw + scrambleCatalyst) + sha512(passRaw + scrambleCatalyst);
    const email = sha512(scrambleCatalyst + emailRaw.toLowerCase() + scrambleCatalyst);

    const accountData = {
      username: username,
      email: email,
      password: password,
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

  server.post("/srv/validateToken", (req, res) => {

    const userRaw = req.body.username;
    const useToken = req.body.token;

    const username = sha512(scrambleCatalyst + userRaw.toLowerCase() + scrambleCatalyst) + sha512(userRaw.toLowerCase() + scrambleCatalyst);

    db
      .collection("accounts")
      .find({ username })
      .toArray(function (err, result) {
        if (err) {

          res.status(400).end("Error fetching listings!");

        } else {
          if (result.length === 0 || result === null) {

            res.end('4404');

          } else {
            if (result[0].currToken === useToken) {

              res.end("3302");

            } else {

              res.end("4403");

            }
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