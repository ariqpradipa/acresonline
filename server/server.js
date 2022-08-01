const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const next = require("next");

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const localDB = 'mongodb+srv://superuser:AStO4UUKTtWLPE05@acresonline.atgzxpe.mongodb.net/acres?retryWrites=true&w=majority';

app.prepare().then(() => {
  const server = express();
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cors());

  mongoose.connect(localDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", () => console.log("~Database connected~"));

  server.post("/srv/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.collection("accounts")
      .find({})
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send("Error fetching listings!");
        } else {
          res.send(result);
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
