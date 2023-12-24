'use strict';

const express = require('express');
const app = express();

//define all endpoints here
app.get('/hello', function (req, res)
{
    res.type('text');
    res.send('Hello World');
});

//add a new GET endpoint , /math/circle/:r, which take sa radius as a URL parameter.
//it shold then responsd in JSON with the area and circumferance
app.get('/math/circle/:r', function (req, res)
{
    let r = req.params.r;

    //check if r is provided an is a number 
    if(!r || isNaN(r))
    {
        res.status(400).send('Bad Request');
        return;
    }

    let area = Math.PI * r * r;
    let circumferance = 2 * Math.PI * r;
    let result = {area: area, circumferance: circumferance};
    res.json(result);
});

app.get('/hello/name/:first/:last', function (req, res)
{

    let first = req.params.first;
    let last = req.params.last;

    let missingParams = [];

    if (!first || typeof first !== 'string') {
        missingParams.push('first');
    }

    if (!last || typeof last !== 'string') {
        missingParams.push('last');
    }

    if (missingParams.length > 0) {
        res.status(400).send(`Missing Required GET parameters: ${missingParams.join(', ')}`);
        return;
    }

    res.type('text');
    res.send(`Hello ${first} ${last}`);
});

app.get('/hello/name/:first', function (req, res)
{
    let first = req.params.first;

    res.status(400).send(`Missing Required GET parameters: last`);
    return;
});

app.use(express.static('public'));
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => 
{
    console.log(`Server running on port ${PORT}`);
});