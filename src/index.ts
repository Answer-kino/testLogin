import app from "./config/express";

const port = process.env.PORT || 3001;

app.listen(port, async () => {
  console.log(`Server listening on port : ${port}`);
});
