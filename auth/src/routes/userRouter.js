const express = require('express');
const router = express.Router()
const {body, validationResult} = require('express-validator')
const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


router.get('/api/users/currentuser', (req, res)=>{
    res.send('iuhiugiiugh')
    console.log(`HII therererere`);
})
router.post('/api/users/signin', async (req, res)=>{
    const {username , password} = req.body; 
    // if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD_HASH) {
    //     req.session.isAdminLoggedIn = true;
    //     return res.redirect('/admindashboard');
    // }
    const user = await User.findOne({username});
    console.log(user);
    if(!user || !bcrypt.compareSync(password, user.password)){
        return res.status(201).json({ success: false, message: "Invalid username or password" });
    }
    req.session.user = user; 
    res.send('user logged in')
    console.log(`HII therererere`);
})
router.post('/api/users/signout', (req, res)=>{
    res.send('sdfgsd')
    console.log(`HII therererere`);
})
router.post('/api/users/signup', async (req, res) => {
    const { username, password, confirmPassword, phone, email } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        username: username,
        password: hashedPassword,
        phoneNumber: phone,
        email: email
    });
console.log(process.env.JWT_KEY);
    try {
        await user.save();
        const userJWT = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_KEY);
        

        req.session.user = userJWT;
        console.log(userJWT);

        res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ success: false, message: "An error occurred during signup" });
    }
});

module.exports = router