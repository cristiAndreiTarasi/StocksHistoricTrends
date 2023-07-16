require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const port = 3001;
const baseUrl = "https://data.nasdaq.com/api/v3";
const dbCode = "WIKI";

app.get('/api/companies/:page', async (req, res) => {
    const page = req.params.page ?? 1;
    
    try {
        const response = await fetch(`${baseUrl}/datasets/?database_code=${dbCode}&page=${page}&api_key=${process.env.REACT_APP_QUANDL_API_KEY}`)
            .then(data => data.json())
            .then(data => data) 
console.log(response.datasets)
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/time-series/:company', async (req, res) => {
    const company = req.params.company;

    try {
        const response = await fetch(`${baseUrl}/datasets/${dbCode}/${company}/data.json?api_key=${process.env.REACT_APP_QUANDL_API_KEY}`)
            .then(data => data.json())
            .then(data => data.dataset_data);

        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
