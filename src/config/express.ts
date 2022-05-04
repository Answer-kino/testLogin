import express from "express";
import dotenv from "dotenv";

import indexRotuer from "../route/index";

dotenv.config();
const app = express();
app.use("/", indexRotuer);

export default app;
