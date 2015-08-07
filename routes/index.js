var express = require('express');
var router = express.Router();
var getinfo = require('../module/getinfo.js');
var storeinfo = require('../module/storeinfo.js');

//getinfo.getInfo();
//getinfo.getreadInfo();
//getinfo.getattachmentInfo();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'EmailInfo'});
});


router.post('/login',function(req,res){
  var userinfo = req.body;
  console.log(userinfo);   //{ id: 'sdf', pass: 'sdf' }
  getinfo.getInfo(userinfo);
  getinfo.getreadInfo(userinfo);
  getinfo.getattachmentInfo(userinfo);

  res.render('emailinfo');


});
router.get('/read',function(req,res){
  var read = storeinfo.getreadnumber();
  var unread = storeinfo.getunreadnumber();
  var attachment = storeinfo.getattachmentnumber();
  var total = storeinfo.gettotalnumber();
  var attachmenttype = storeinfo.getattachmenttype();

  var renderobj = { title: 'EmailInfo',
    readnumber : read,
    unreadnumber : unread,
    attachment : attachment,
    total : total,
    attachmenttype : attachmenttype
  };
  res.status(200).json(renderobj);
  ;
});


module.exports = router;



