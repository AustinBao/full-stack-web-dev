import express from "express";
import bodyParser from "body-parser";

import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
// var bandName = "";  // A diff way to do it is with two middle wares

app.use(bodyParser.urlencoded({ extended: true }));

// function bandNameGen(req, res, next) {
//   bandName = req.body["street"] + req.body["pet"];
//   next();
// }

// app.use(bandNameGen);


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {                   // or use bandName var.
  res.send("<h1> Band Name: <h1/>" + "<h2>" + req.body["street"] + req.body["pet"] + "<h2/>");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
