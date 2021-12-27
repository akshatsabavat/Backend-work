const express = require('express');
const fortunes = require('./data/fortunes.json');
//creates and stores the express model in the express variable 
const bodyParser = require('body-parser');
//creates and stores the body parser to parse incoming json data
const app = express();
//creates the express application using the express function
const port = 3000;

app.use(bodyParser.json());
//tells app to start parsing any incoming json data

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

app.get('/fortunes/:id', (req, res) => {
    res.json(fortunes.find(fortune => fortune.id == req.params.id));
})

app.listen(port, () => {
    console.log(`Running at port : ${port}`);
})