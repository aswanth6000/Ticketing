const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); 
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use(require('./routes/userRouter'));

const start = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}!!!`);
    });
};
start();

