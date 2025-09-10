var express = require('express');
var router = express.Router();
const Loading_Controler = require('../Controller/Demo');
const HandleControler = new Loading_Controler();


router.get('/Select', HandleControler.Select);
module.exports = router;