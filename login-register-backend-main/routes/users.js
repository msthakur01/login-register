const express = require('express');
const { register, login } = require("../controller/newUser");


const router = express.Router();

router.route('/').get((req,res)=>{
    res.send('Welcome Master')
})

router.route('/register').post(register);

router.route('/login').post(login);

module.exports = router