const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Corrected the function call
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/users/currentuser', (req, res) => {
    res.send('Hi there');
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}!!!`);
});
