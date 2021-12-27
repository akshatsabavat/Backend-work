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

app.post('/fortunes', (req, res) => {
    console.log(req.body);

    const { id, message, lucky_number, spirit_animal } = req.body;
    const fortune_ids = fortune.map(fortune => fortune.id);
    //mapping and getting all the fortune ids
    const fortune = { id: (fortune_ids.length > 0 ? Math.max(...fortune_ids) : 0) + 1 , message, lucky_number, spirit_animal } ;
    const new_fortunes = fortunes.concat(fortune);
})

app.listen(port, () => {
    console.log(`Running at port : ${port}`);
})