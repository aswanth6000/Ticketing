const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); 
const PORT = process.env.PORT || 3001;
const session = require('express-session');
const app = express();
app.use(express.json());


app.set('trust proxy', true);
app.use(session({
    secret : 'secret-key',
    resave : false,
    saveUninitialized : true
}))

// mongodb://auth-mongo-srv:27017/auth

app.use(require('./routes/userRouter'));
const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://gadgeteaseinfo:ZR8c5WPdNkn7dI8r@cluster0.tpymocf.mongodb.net/?retryWrites=true&w=majority');
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}!!!`);
    });
};
start();

