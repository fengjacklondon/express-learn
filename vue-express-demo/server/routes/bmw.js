var express = require('express');
var router = express.Router();
var db = require('../db.js');
var sql = 'select count(*) as count from tb_user' ;

router.get('/', (req, res) => {
	db.query(sql, function(err, rows, fields){  
    if (err) {  
        console.log(err);  
        return;  
    }
    console.log('用户数量 : ', rows[0].count);  
});  

});

module.exports = router;