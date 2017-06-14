var express = require('express');
var router = express.Router();
var db = require('../db.js');
var sql = 'select count(*) as count from tb_user' ;

router.get('/', (req, res) => {
	var result = 10
	db.query(sql, function(err, rows, fields){  
    if (err) {  
        console.log(err);  
        return;  
    }
    result = rows[0].count
    console.log('用户数量 : ', rows[0].count);  
    res.json({ result: result })
   
});  
	
});

module.exports = router;