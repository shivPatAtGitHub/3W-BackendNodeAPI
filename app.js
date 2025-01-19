import dotenv from "dotenv";
import express from "express";
import dbConnect from "./Utils/dbconnection.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import relations from "./Utils/relations.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.get("/", (req, res) => {
  res.send(
    `<h1 style="text-align: center; font-family: monospace; margin-top: 5rem; font-size: 3.5rem; color: white; text-shadow: 3px 3px 5px rgba(0,0,0,1)">WELCOME To 3W</h1>`
  );
});

relations(app);

dbConnect.sync().then(() => {
  console.log(`Connected To Database`);
});

app.listen(process.env.PORT, () => {
  console.log(`Server live - ${process.env.PORT}`);
});
