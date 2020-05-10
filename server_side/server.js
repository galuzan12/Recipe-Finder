const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

require('dotenv').config()
const PORT = process.env.PORT || 5000;

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }), bodyParser.json())

app.get('/' ,(req, res, next) => {
    res.send("server connected")
    
})

app.get('/api/select', async function (req, res) {
    const type = req.query.type;
    const response = [];
    try {
        let htmlResult = await fetch(`https://spoonacular.com/food-api/docs#${type}`).then(response => response.text())
        if (type !== 'Diets') {
            htmlResult = htmlResult.split(`<h2>${type}</h2>`)[1].split('</ul>')[0].split(`<ul class="pageList">`)[1];
            htmlResult = htmlResult.split(`</ul>`)[0].split(`<li>`);
            htmlResult.forEach(element => {
                element = element.split('<')[0];
                response.push(element)
            });
        }
        else {
            htmlResult = htmlResult.split('<h2>Diet Definitions</h2>')[1].split('<img>')[0];
            htmlResult = htmlResult.split('<h4>');
            htmlResult.forEach(element => {
                if (element.includes('</h4>')) {
                    element = element.split('</h4>')[0];
                    response.push(element)
                }
            });
        }
        res.status(200).json({ result: response.filter((element) => element !== '\n') })
    }
    catch (err) {
        res.status(500).json({ result: "error" })
    }
})


app.get('/api/recipes', async function (req, res) {

    let query = req.originalUrl.split('?')[1];

    const url = `https://api.spoonacular.com/recipes/search?apiKey=${process.env.API_KEY}&${query}&number=20`
    console.log(url);

    try {
        let result = await fetch(url);
        result = await result.json()
        res.status(200).json({ result })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ result: "error, try again later" });

    }

})

app.listen(PORT, () => console.log(`server running on port ${PORT}`));