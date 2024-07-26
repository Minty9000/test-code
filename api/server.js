const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const serverless = require('serverless-http');

// Increase the limit for JSON payloads and URL-encoded form data
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());

let products = [];

app.post('/data', (req, res) => {
    products.push(req.body);
    res.status(201).json(req.body);
});

app.get('/data', (req, res) => {
    res.json(products);
});

app.delete('/data/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (index >= 0 && index < products.length) {
        products.splice(index, 1);
        res.status(200).json({ message: 'Deleted successfully' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

module.exports = app;
module.exports.handler = serverless(app);
