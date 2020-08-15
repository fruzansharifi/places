var express = require('express');
var router = express.Router();
var Places = require('../models/places');
var Images = require('../models/images');
var Comments = require('../models/comments');

const fileUpload = require('express-fileupload');


router.post(
    '/upload/:placeId',
    [
        fileUpload({createParentPath: true}),
    ],
    async (req, res)=>{
        res.setHeader("Access-Control-Allow-Origin", '*');
        res.setHeader("Access-Control-Allow-Methods", '*');
        res.setHeader("Access-Control-Allow-Headers","*");
        var placeId = req.params.placeId;
        var userId  = 1;

        var place = await Places.findById(placeId);

        if(place)
        {
            if(place.user_id == userId){
                if(!req.files){
                    res.status(400).json({status:false, message:"فایلی اپلود نشده است"});
                }else{
                    var photo = req.files.photo;
                    var path = './public/uploads/'+ photo.name;
                    photo.mv(path);

                    var imageModel = new Images();
                    imageModel.name = photo.name;
                    imageModel.placeId = placeId;
                    imageModel.path = path.replace('./public', '');

                    var result = await imageModel.save();
                    if(result){
                        res.status(200).json({status:true, message: 'فایل اپلود شد', data:{name:photo.name, mimeType: photo.mimeType, size:photo.size}});
                    }else{
                        res.status(500).json({status:false, message:"اووپس، مشکلی پیش امده"});
                    }

                }
            }
            else{
                res.status(403).json({status:false, message:"شما دسترسی اپلود برای این مکان را ندارید"});
            }
        }
        else
        {
            res.status(404).json({status:false, message:"مکان مورد نظر یافت نشد"});
        }

    })

router.post('/comments/:id', async function(req, res){
    var imageId = req.params.id;
    var image = await Images.findById(imageId);
    if(image)
    {
        var comments = await Comments.select('*', 'image_id='+imageId);
        res.status(200).json({image:image, comments:comments});
    }
    else{
        res.status(404).json({'message':'not found image'});
    }
})

module.exports = router;
