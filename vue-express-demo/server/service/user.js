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


exports.search = search
exports.list = list