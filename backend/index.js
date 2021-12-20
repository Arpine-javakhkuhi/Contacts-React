const express = require('express');
const path = require('path');
const api = require('./api/server').router;
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("../frontend"));

app.use('/api/contacts', api);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/index.html');
});


app.listen(5050, () => {
    console.log('Listening on port 5050');
});