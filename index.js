const express = require(`express`);
const app = express();
const familyRouter = express.Router();
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

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} IP: ${req.ip}`);
    next();
})
app.use(express.static("public"));
app.use(`/family`, familyRouter);
app.set(`view engine`, `pug`);
app.set(`views`, `./views`);
//app.set(`views`, `./views/template.pug`);

familyRouter.get(`/`, (req, res) => {
    res.json(family);
});

familyRouter.get(`/query`, (req, res) => {
    console.log(req.query);
    res.send(req.query);
});

familyRouter.get(`/temp`, (req, res) => {
    res.render(`template`, {
        title: "test title",
        h1mes: "Thats my family!",
        family
    });
});

familyRouter.get(`/:name`, (req, res) => {
    const existedPerson = family.find(el => el.name === req.params.name);
    if(existedPerson){
        console.log(`Send ${req.params.name} informaion`);
        res.status(200).json(existedPerson);
    }
    else
        res.status(404).send(`404`);
});

app.get((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send(err.stack);
});

app.listen(port, url, () => {
    console.log(`Server ${url} on port ${port} ${new Date}`);
})