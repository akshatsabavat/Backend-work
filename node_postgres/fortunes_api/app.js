const express = require('express');
const fortunes = require('./data/fortunes.json');
//creates and stores the express model in the express variable 
const app = express();
//creates the express application using the express function
const port = 3000;

app.get('/fortunes', (req, res) => {
    res.json(fortunes);
})
//allows us to specify the endpoint and access fires the call back function after the endpoint is called

app.get('/fortunes/random', (req, res) => {
    console.log("Requesting random fortune");
    const randomIndex = Math.floor(Math.random() * fortunes.length);
    const randomFortune = fortunes[randomIndex];
    res.json(randomFortune);
})

app.get('/fortunes:idNumber', (req, res) => {
    console.log(req.params);
})

app.listen(port, () => {
    console.log(`Running at port : ${port}`);
})