const PORT = 8000;
const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
app.use(cors());
app.use(express.json());


app.get('/videos', (req, res) => {
    const search = req.query.search;
    console.log(search);
    axios.get(`https://www.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_API}&type=video&part=snippet&maxResults=5&q=${search}`)
        .then(response => {
            res.send(response.data);
        })
        .catch(err => {
            console.log(err);
        })
});


app.listen(PORT, console.log("Listening on port " + PORT));