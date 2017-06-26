var conf = require('../conf/conf')
var utility = require('../utility/utility.js')
var db = require('./db.js')
var TABLE_VISITOR = conf.mysql.tables.TABLE_VISITOR

var search = function search(fields, condition, range, callback){
  database.search(TABLE_VISITOR, fields, condition,range,callback)
}

exports.search = search 
