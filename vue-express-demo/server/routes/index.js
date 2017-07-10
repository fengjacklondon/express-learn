var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  /* if(!req.session.uid){
    var ua = req.header['user-agent']
    var tokent = md5(ua.toString())
    req.session.uid = token
    visitor.add({token: token, ua: ua },(err, result) => {
      //TODO: 错误处理
    })
  } */
  res.render('index', { title: 'Express' });
});

module.exports = router;
