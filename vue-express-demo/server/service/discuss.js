var conf = require('../conf/conf')
var utility = require('../utility/utility.js')
var db = require('./db.js')
var TABLE_DISCUSS = conf.mysql.tables.TABLE_DISCUSS
var search = function search (fields, condition, range, callback){
  db.search(TABLE_DISCUSS, fields, condition, range ,callback)
}
exports.search = search
