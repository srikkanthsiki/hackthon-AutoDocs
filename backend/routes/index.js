var express = require('express');
var router = express.Router();
var  selecttemplate = require('../middleware/selecttemplate');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/autodocs',selecttemplate.mapTemplate,function(req,res,error){res.send("completed")});

module.exports = router;
