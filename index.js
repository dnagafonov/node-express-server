const express = require(`express`);
const app = express();
const bodyParser = require('body-parser'); 

const url = `127.0.0.1`;
const port = process.env.port || 3300;
let family = [ 
    {
        "name": "Ivan",
        "surname": "Butko",
        "age": 61,
        "wife": "Valyuha"
    },
    {
        "name": "Valya",
        "surname": "Butko",
        "age": 59,
        "husband": "Ivan"
    },
    {
        "name": "Anna",
        "surname": "Butko",
        "age": 25,
        "husband": "Kostya"
    }
];

app.use(express.static("public"));

app.get(`/family`, (req, res) => {
    res.json(family);
});

app.get(`/family/:name`, (req, res) => {
    console.log(`Send ${req.params.name} informaion`);
    const person = family.find(el => el.name === req.params.name);
    res.json(person);
});

app.listen(port, url, () => {
    console.log(`Server ${url} on port ${port}`);
})