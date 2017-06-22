var express = require('express');
var router = express.Router();
var session = require ('express-session')
var md5 = require('md5')
// var db = require('../db.js');
var utility = require('../utility/utility.js')
var sql = 'select count(*) as count from tb_user' ;
var user = require('../service/user.js')


router.get('/', (req, res) => {

    console.log(99999999)
// 	var result = 10
// 	db.query(sql, function(err, rows, fields){  
//     if (err) {  
//         console.log(err);  
//         return;  
//     }
//     result = rows[0].count
//     console.log('用户数量 : ', rows[0].count);  
//     res.json({ result: result })
   
// });  
    
    var params = req.query;
    console.log('params:' + params)
    switch(params.action) {
        case 'user-login':
            var fields = 'name' ;
            var condition = {
                name: params.name,
                password: md5(params.password)
            };
            var conditionString = utility.objConvertArray(condition).join(' AND ')
            console.log('condition:' + conditionString)
            var range = {from : 0, count: 1}
            user.search(fields, conditionString, range, (err, result)=> {
                if(!err && result.length){
                    consol.log(result.length)
                    req.session.loginstate = 'true';
                    res.end(JSON.stringify({err:false, result:result}));
                }
                else{
                    res.end(JSON.stringify({err:true, result:'user not exists or password war wrong'}));
                }

            });
            break
            default:
            res.end(JSON.stringify({err:true, result:'undefined request action'}));
            break

    }
	
});

module.exports = router;