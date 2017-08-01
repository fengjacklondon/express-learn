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
var moment = require('moment')
var article  = require('../service/article')
var feature = require ('../service/feature')

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
          break
          default:
          res.end(JSON.stringify({err:true, result:'undefined request action'})) 
          break 
    }
})

/**
 * 管理员提交信息
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */

router.put('/', function(req, res){
  // 单词拼错了 。。
  if (req.session.loginstate != 'true') {
    return res.end(JSON.stringify({err: true, result: '未登录无权限编辑'}))
  }

  var params = req.query
  switch (params.action) {
    case 'user-add':
    var newUser = req.body.user
    console.log('用户密码加密前' + newUser.password )
    newUser.password = md5(newUser.password)
    user.add(newUser, (err,result) => {
      if (!err)
        res.end(JSON.stringify({err: false, result: newUser.name}))
      else 
        res.end(JSON.stringify({err: true, result: 'add user wrong'}))
    })

    break
    case 'user-edit':
    var newUser = req.body.user
    newUser.timeCreate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    console.log('更新初始参数值：' + JSON.stringify(newUser));
    user.edit(newUser, (err, result) => {
      if(!err)
        res.end(JSON.stringify({err: false, result: true}))
      else 
        res.end(JSON.stringify({err: true, result: 'edit user wrong '}))
    })
    break
    case 'user-del':
    var condition = 'name = ' + utility.escape(req.body.name)
    user.del(condition, (err, result) => {
      if (!err)
        res.end(JSON.stringify({err: false, result: true}))
      else
        res.end(JSON.stringify({err: true, result: 'delete user wrong '}))
    } )

    break
    case 'article-add':
    console.log('article add  coming ')
    var newArticle = req.body.article
    var currentDate = new Date()
    newArticle.license = ''
    newArticle.timeRelease = currentDate.getFullYear()+'-'+(currentDate.getMonth()+1)+'-'+currentDate.getDate()+''+currentDate.getHours()+':'+currentDate.getMinutes()
    +':'+currentDate.getSeconds()
    article.add(newArticle, (err, result) =>{
      if (!err) {
        res.end(JSON.stringify({err:false, result: newArticle}))
      } else {
        res.end(JSON.stringify({err:true, result: 'add article wrong '}))
      }
    })
    break
    case 'article-edit':
    var newArticle = req.body.article
    delete newArticle.timeCreated
    article.edit(newArticle, (err, result) =>{
      if (!err) {
        res.end(JSON.stringify({err: false,result: true}))
      } else {
        res.end(JSON.stringify({err:true, result:'edit article wrong'}))
      }
    })
    break
    case 'article-del':
    var articleId = req.body.articleId
    article.del (articleId, (err,result) => {
      if (!err) {
        res.end(JSON.stringify({err: false, result: true}))
      } else {
        res.end(JSON.stringify({err: true, result: 'edit article wrong'}))
      }
    })
    case 'feature-add':
    var newFeature = req.body.feature
    feature.add(newFeature, (err, result) => {
      if (!err) {
        res.end(JSON.stringify({err: false, result: true}))
      } else {
        res.end(JSON.stringify({err: true, result: 'add feature wrong'}))
      }
    })
    break
    case 'feature-update':
    var newFeature = req.body.feature
    feature.update(newFeature ,(err,result) => {
      if (!err) {
        res.end(JSON.stringify({err: false, result: 'true'}))

      } else {
        res.end(JSON.stringify({err: true, result: 'false'}))
      }
    })
    break
    default :
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