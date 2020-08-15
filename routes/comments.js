var express = require('express');
var router = express.Router();
const { check, validationResult} = require("express-validator");
var Images = require('../models/images');
var Comments = require('../models/comments');

router.post(
	'/create',
	[
		check('comment', 'متن مورد نظر رو حتما باید وارد کنید').not().isEmpty(),
		check('full_name', 'نام کامل را وارد کنید').not().isEmpty(),
		check('image_id', 'ایدی اون عکسه رو وارد کنید').not().isEmpty()
	], 

	async function(req, res){
	  	const errors = validationResult(req);
	    if (!errors.isEmpty()) {
	        return res.status(400).json({
	            errors: errors.array()
	        });
	    }

	    var {comment, full_name, image_id} = req.body;

	   	var imageExists = await Images.findById(image_id);
	   	if(imageExists){
	   		var commentModel = new Comments();
	   		commentModel.comment = comment;
	   		commentModel.imageId = image_id;
	   		commentModel.fullName = full_name;

	   		var result = await commentModel.save();
	   		if(result){
	   			res.status(200).json({"message":"کامنت با موفقیت ثبت شد ", status:true});
	   		}
	   	}
	   	else{
	   		res.status(404).json({message:"not found iamge", status:false});
	   	}
	    console.log(comment, full_name);
		
	}
)


module.exports = router;
