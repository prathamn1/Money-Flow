const express = require("express");
const cors = require("cors");
const db = require("./database/db");
const { readdirSync } = require("fs");
const path = require("path");

const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 5000;

// middlewares

app.use(express.json()); // for parsing incoming requests with JSON data
app.use(cors());

// routes

readdirSync("./routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("listening to port", PORT);
  });
};

// app.use(express.static(path.join(__dirname,'../frontend/build')))
// app.get('*' , (req,res) => {
//     res.sendFile(path.join(__dirname,'../frontend/build/index.html'))
// })

// render deployment

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
}

server();
