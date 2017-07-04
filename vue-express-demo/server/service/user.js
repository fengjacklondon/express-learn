var conf = require('../conf/conf.js')
var utility = require('../utility/utility.js')
var db = require('../service/db.js')
const TABLE_USER = conf.mysql.tables.TABLE_USER

var search = function search (fields,condition,range,callback){
  db.search(TABLE_USER,fields,condition,range,callback)
}


var list = function list (fields, condition, range, callback){
  db.list(TABLE_USER, fields, condition, range, callback)
}

var add = fucntion add (user, callback){
  var values =utility.objescape(user)
  var sqlString = ``
  db.query(sqlString, function (err, result){
// 这里的回调 看看
//  谁和谁 什么关系，先后
//  当前的函数 和回调函数 ，当前函数 100% 执行完了，才开始执行的回调函数
    callback (err || !result.affectedRows, result)
    return (err || result.affectedRows)
  })

}

var edit = function edit (values, callback){
  var condition = `name=` + utility.escape(values.name)
  db.update(TABLE_USER, values, condition, callback)

}

exports.search = search
exports.list = list