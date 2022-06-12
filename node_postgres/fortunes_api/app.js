const fortuneData = require("./data/fortunes.json");
const fs = require("fs");
const bodyParser = require("body-parser");
const express = require("express");
const port = 3000;

const app = express();
const writeToFortunes = (json) => {
  fs.writeFile("./data/fortunes.json", JSON.stringify(json), (err) =>
    console.log(err)
  );
};

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

app.use(bodyParser.json()); //middleware to parse requests

app.post("/fortunes", (req, res) => {
  const { message, lucky_number, spirit_animal } = req.body;
  const fortune_ids = fortuneData.map((fortune) => fortune.id);

  // const newFortune = {
  //   id: (fortune_ids.length > 0 ? Math.max(...fortune_ids) : 0) + 1,
  //   message,
  //   lucky_number,
  //   spirit_animal,
  // };

  const updatedFortuneData = fortuneData.concat({
    id: (fortune_ids.length > 0 ? Math.max(...fortune_ids) : 0) + 1,
    message,
    lucky_number,
    spirit_animal,
  });

  writeToFortunes(updatedFortuneData);
  res.json(fortuneData);
});

app.put("/fortunes/:id", (req, res) => {
  const { id } = req.params;
  const old_fortune = fortuneData.find((f) => f.id == id);
  // const { message, lucky_number, spirit_animal } = req.body;  --> not needed when optimized
  //if gaurd clauses added to allow partial updating
  //if put request doesnt include a change in a certain parameter, parameter retains the previous value

  // if (message) fortuneData[id].message = message;
  // if (lucky_number) fortuneData[id].lucky_number = lucky_number;
  // if (spirit_animal) fortuneData[id].spirit_animal = spirit_animal;

  //optimized code below (either postman doesnt work or my code is bad)
  const parameters = ["message", "lucky_number", "spirit_animal"];
  parameters.forEach((parameter) => {
    if (req.body[parameter]) {
      old_fortune[parameter] = req.body[parameter];
    }
  });

  writeToFortunes(fortuneData);
  res.json(fortuneData);
  console.log(fortuneData);
});

app.listen(port, () => {
  console.log(`listening on port number: ${port}`);
});
