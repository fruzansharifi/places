const express = require('express');
const router = express.Router();
const { check, validationResult} = require("express-validator");
const Users = require('../models/users');

/* GET users listing. */
router.post('/',   (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader("Access-Control-Allow-Methods", '*');
    res.setHeader("Access-Control-Allow-Headers","*");
	return res.status(200).json({message:"hello"});
})
router.post('/programmer', async function(req, res){
    var programmer = await Users.all();
    if(programmer){
      res.status(200).json(programmer);
    }
  })

  module.exports = router;
  