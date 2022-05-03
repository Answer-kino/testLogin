import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
import indexRotuer from "../route/index";

app.use("/", indexRotuer);

export default app;
