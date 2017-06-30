var express = require('express') 
var router = express.Router() 
var session = require ('express-session')
var md5 = require('md5')
var db = require('../service/db.js') 
var utility = require('../utility/utility.js')
var visitor = require('../service/visitor')
var sql = 'select count(*) as count from tb_user'  
var user = require('../service/user.js')
var discuss = require('../service/discuss')

router.get('/', (req, res,next) => {
    if(req.session.loginstate == 'true'){
        return next() 
    }
    var params = req.query  
    console.log('params:' + params.name)
    switch(params.action) {
        case 'user-login':
            var fields = 'name'  
            var condition = {
                name: params.name,
                password: md5(params.password)
            } 
            var conditionString = utility.objConvertArray(condition).join(' AND ')
            console.log('condition:' + conditionString)
            var range = {from : 0, count: 1}
            user.search(fields, conditionString, range, (err, result)=> {
                if(!err && result.length){
                    console.log(result.length)
                    req.session.loginstate = 'true' 
                    res.end(JSON.stringify({err:false, result:result})) 
                }
                else{
                    res.end(JSON.stringify({err:true, result:'user not exists or password war wrong'})) 
                }

            }) 
            break
            default:
            res.end(JSON.stringify({err:true, result:'undefined request action'})) 
            break

    }
   
}) 

router.get('/', function(req,res){
    console.log('the next is come in ')
    var params =req.query
    switch(params.action){
        case 'user-login':
          res.end(JSON.stringify({err: false, result: true}))
          break
        case 'blog-state':
          var days = Number(params.days) 
          var timestamp = Date.parse(new Date()) - days * 24 * 60 * 60 * 60 
          var dateBegin = new Date(timestamp) 
          var formatDate = ''+dateBegin.getFullYear()+'-'+(dateBegin.getMonth()+1)+'-'+dateBegin.getDate() 
          var range = null 
          timestamp = timestamp / 1000 
          visitor.search('id', `timeVisited >= '${formatDate}'`, range, (err, resultVisitor)=>{
            if(!err)
              {
              discuss.search('id', `timeCreate >= '${formatDate}'`, range, (err, resultDiscuss)=>{
                if(!err){
                var result = {visitorCount:resultVisitor.length, discussCount:resultDiscuss.length} 
                res.end(JSON.stringify({err:false, result:result})) 
              }
            }) 
          }else
            res.end(JSON.stringify({err:true, result:'error'})) 
          }) 
          break 
          case 'user-range':
          console.log('执行 get user-range')
          var range = {from :Number(params.from), count: Number(params.count)}
          var fields = 'name, nickname, authority, timeCreate'
          user.list(fields, range, (err,result) => {
            
            if(!err){
              res.end(JSON.stringify({err: false, result: result}))
            } else {
              res.end(JSON.stringify({err: true, result: 'error'}))
            }
          })
          default:
          res.end(JSON.stringify({err:true, result:'undefined request action'})) 
          break 
    }
})



// router.get('/', (req, res) => {

//     console.log(99999999)
//  var result = 10
//  db.query(sql, function(err, rows, fields){  
//     if (err) {  
//         console.log(err)   
//         return   
//     }
//     result = rows[0].count
//     console.log('用户数量 : ', rows[0].count)   
//     res.json({ result: result })
   
// })   

    
module.exports = router 