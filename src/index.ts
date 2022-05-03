import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.get("/", function (req: Request, res: Response) {
  res.send("hello world");
});

app.listen(port, async () => {
  console.log(`Server listening on port : ${port}`);
});
