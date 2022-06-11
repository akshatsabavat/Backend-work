const fortuneData = require("./data/fortunes.json");
const express = require("express");
const port = 3000;

const app = express();

app.get("/fortunes", (req, res) => {
  res.json(fortuneData);
});

app.get("/fortunes/random", (req, res) => {
  randomFortune = Math.floor(Math.random() * 3);
  res.json(fortuneData[randomFortune].message);
});

app.get("/fortunes/:fortune_id", (req, res) => {
  res.json(
    fortuneData.filter((fortune) => fortune.id == req.params.fortune_id)
  );
});

app.listen(port, () => {
  console.log(`listening on port number: ${port}`);
});
