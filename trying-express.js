const express = require(`express`);
const readStream = require(`fs`).createReadStream(`${__dirname}/fileToRead.txt`);
const booksRouter = express.Router();

const app = express();
const hostName = `127.0.0.1`;
const port = 8000;

const arrayOfNum = [ 1,2,3,4,5 ];
const products = [ `apple`, `orange`, `lemon`, `strawberry`];

app.get(`/`, (request, response) => {
    response.send(readStream)
});

app.get(`/products`, (request, response) => {
    console.log(request.query.page);
    response.send(products);
});

app.get(`/products/:id`, (req, res) => {
    if(!products[req.params.id])
        res.status(404).send(`Invalid index`);
    else
        res.send(products[req.params.id])
});

app.get(`/download`, (req, res) => {
    res.download(`./fileToread`);
})

app.get(`/git`, (req, res) => {
    res.redirect(`https://github.com/dnagafonov/node-express-server`);
})

booksRouter.get(`/`, (req, res) => {
    res.send(`Books`);
});

booksRouter.get(`/about`, (req, res) => {
    res.send(`About books`);
});

app.use(`/books`, booksRouter);

app.listen(port, hostName, () => {
    console.log(`Server ${hostName} on port ${port}`);
})