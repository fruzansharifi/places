const express=require('express');
const router=express.Router();
const { check, validationResult} = require("express-validator");
var Images = require('../models/images');
const Votes=require('../models/votes')

router.post(
	'/create',
	[
		check('vote', 'امتیاز مورد نظر رو حتما باید وارد کنید').not().isEmpty(),
		check('image_id', 'ایدی اون عکسه رو وارد کنید').not().isEmpty()
    ], 
    
	async function(req, res){
        res.setHeader("Access-Control-Allow-Origin", '*');
        res.setHeader("Access-Control-Allow-Methods", '*');
        res.setHeader("Access-Control-Allow-Headers","*");
        const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
              errors: errors.array()
          });
      }
      var {vote, image_id} = req.body;

      var imageExists = await Images.findById(image_id);
      if(imageExists){
          var voteModel = new Votes();
          voteModel.vote = vote;
          voteModel.imageId = image_id;
          
          var result = await voteModel.save();
          if(result){
              res.status(200).json({"message":"امتیاز با موفقیت ثبت شد ", status:true});
          }
      }
      else{
          res.status(404).json({message:"not found iamge", status:false});
      }
   console.log(vote);
   
}
)

    
module.exports = router;