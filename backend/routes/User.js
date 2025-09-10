var express = require('express');
var router = express.Router();   
const Loading_Controler = require ('../Controller/User');
const HandleControler = new Loading_Controler ();
const updateImage = require ('../Middleware/image');


router.get ('/Select' , HandleControler.Select);
router.post ('/Login' , HandleControler.Login);
router.post ('/Add' , updateImage.updateIMG.single("Image"), HandleControler.Add);
router.delete ('/Delete/:ID' , HandleControler.Delete);
router.get ('/Search' , HandleControler.Search);
router.put ('/Disable/:ID' , HandleControler.Disable);
module.exports = router;