const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); 
const PORT = process.env.PORT || 3000;
const session = require('express-session');
const app = express();
app.use(express.json());


app.set('trust proxy', true);
app.use(session({
    secret : 'secret-key',
    resave : false,
    saveUninitialized : true
}))
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

