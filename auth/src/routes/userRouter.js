const express = require('express');
const router = express.Router()
const {body, validationResult} = require('express-validator')
const User = require('../model/User')
const bcrypt = require('bcrypt')

router.get('/api/users/currentuser', (req, res)=>{
    res.send('sdfgsd')
    console.log(`HII therererere`);
})
router.post('/api/users/signout', (req, res)=>{
    res.send('sdfgsd')
    console.log(`HII therererere`);
})
router.post('/api/users/signup/:id', async (req, res)=>{
    const {username, password, confirmPassword, phone, email} = req.body;

        if (password !== confirmPassword) {
            return { success: false, message: "Passwords do not match" };
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username: username,
            password: hashedPassword,
            phoneNumber: phone,
            email: email
        });
        try {
            await user.save();
            return { success: true, message: "User registered successfully" };
        } catch (error) {
            console.error('Error during signup:', error);
            res.status(500).render('./user/error', { errorMessage: 'An error occoured during signup', statusCode : '404' });
        }
    
    console.log('creating a user...');
    res.send({});
})
router.post('/api/users/signin', (req, res)=>{
    res.send('sdfgsd')
    console.log(`HII therererere`);
})

module.exports = router