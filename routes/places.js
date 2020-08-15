var express = require('express');
var router = express.Router();
var Places = require('../models/places');
const { check, validationResult} = require("express-validator");
var Images = require('../models/images');
var Users = require('../models/users');
var Comments = require('../models/comments');
var Votes = require('../models/votes');
/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
});

/* POST list places */
router.post('/list', async (req, res) => {
    var data = [];
    var places = await Places.all();

    for(var i=0; i<places.length; i++)
    {
        var images = await Images.select('*', 'place_id='+places[i].id);
        places[i].images = images;

        var user  = await Users.findById(places[i].user_id);
        places[i].user = user;
    }


    res.status(200).json({places:places});
})

router.post(
    '/create',
    [
        check("title", "لطفا عنوان مکان را وارد کنید").not().isEmpty(),
        check("description", "لطفا توضیحات مکان را وارد کنید").not().isEmpty(),
        check("address", 'لطفا آدرس مکان را وارد کنید').not().isEmpty(),
    ],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const {title, description, address} = req.body;

        var placeModel = new Places();
        placeModel.title = title;
        placeModel.description = description;
        placeModel.address = address;
        // placeModel.userId = req.user.id;
        placeModel.userId = 1;

        var result = await placeModel.save();
        if(result){
            var response = {
                message:"مکان با موفقیت ثبت شد",
                id: placeModel.id
            };
            res.status(200).json(response);
        }
        else{
            var response = {message:"اووپس، مشکلی پیش امده"};
            res.status(500).json(response);
        }
})

router.post('/view/:id',async (req, res)=>{
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader("Access-Control-Allow-Methods", '*');
    res.setHeader("Access-Control-Allow-Headers","*");
    var placeId = req.params.id;
    var place = await Places.findById(placeId);
 
    if(place){
        var images = await Images.select('*', 'place_id='+place.id);
        var user = await Users.findById(place.user_id);

        if(images){
                for(var i=0; i<images.length; i++){
                    var comments = await Comments.select('*', 'image_id='+images[i].id);
                    images[i].comments = comments;
                }
            if(images){
                for(var i=0; i<images.length; i++){
                    var votes = await Votes.select('*', 'image_id='+images[i].id);
                    images[i].votes = votes;
                }   
            }
        }
        place.images = images;
        place.user = user;
        res.status(200).json(place);
    }
    else{
        res.status(404).json({'message':'not found place'});
    }
})
module.exports = router;
