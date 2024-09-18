const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const router = require("./router/admin");
const userRouter=require("./router/user");
const bookRouter=require("./router/book");
const bookIssueRouter=require("./router/bookissue");


const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT;
const DB = process.env.db;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
  .connect(DB)
  .then(console.log("Database connected"))
  .catch((error) => {
    console.error("Database connection failed", error);
  });


app.use("/", router);
app.use("/user", userRouter);
app.use("/book", bookRouter);
app.use("/bookop", bookIssueRouter);


app.listen(PORT, () => {
  console.log(`Server listening from http://localhost:${PORT}`);
});