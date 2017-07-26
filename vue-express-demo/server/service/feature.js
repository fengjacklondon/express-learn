var conf=require('../conf/conf.js')
var utility = require ('../utility/utility.js')
var db = require('./db.js')
const TABLE_FEATURE = conf.mysql.tables.TABLE_FEATURE

var add = function add (feature, callback) {
    console.log(JSON.stringify(feature))
    var values = utility.objectEscape(feature)
    var sqlString = `insert into ${TABLE_FEATURE}
    (
      title, author, coverLink, introduction
    )values
    (
      ${values.title}, ${values.author}, ${values.coverLink}, ${values.introduction}
    );`
    db.query(sqlString, function(err, result){
      callback(err ||!result.affectedRows, result)
      return (err || result.affectedRows)
    })
}

var del = function del (condition, callback) {
  db.del(TABLE_FEATURE, condition, callback)
}


var update = function update (values, callback){
  var condition = `id=`+ utility.escape(values.id)
  db.update(TABLE_FEATURE, values, condition, callback)
}

var list = function list (fields, range, callback){
  db.list(TABLE_FEATURE, fields, range, callback)
}

var search = function search (fields, condition,range, callback){
  db.search (tables, fields, condition, range, callback)
}

exports.add = add
exports.del = del
exports.update = update
exports.list = list
exports.search = search
