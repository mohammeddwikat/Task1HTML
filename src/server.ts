import express from "express";
import bodyParser from "body-parser";
import mongoose, { Schema } from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/task", { useNewUrlParser: true });
const dataBase = mongoose.connection;
dataBase.once("error", (error) => console.error(error));
dataBase.once("open", () => console.log("Connected to database Successfully"));

const app = express();
const port = 3100;
const router = require("../router/router");

app.use("/task", router);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.listen(port, () => {
  console.log("Application Running on port :" + port);
});
