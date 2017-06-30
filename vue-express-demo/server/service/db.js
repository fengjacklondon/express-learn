var db    = {};  
var mysql = require('mysql');  
var pool  = mysql.createPool({  
  connectionLimit : 10,  
  host :'localhost',  
  port :4706,
  user : 'root',  
  password : 'Wewechat',  
  database : 'db_blog'  
});  

/*db.query = function(sql, callback){  
  
    if (!sql) {  
        callback();  
        return;  
    }  
    pool.query(sql, function(err, rows, fields) {  
      if (err) {  
        console.log(err);  
        callback(err, null);  
        return;  
      };  
  
      callback(null, rows, fields);  
    });  
}  */


db.query = function (sql,callback){
  pool.getConnection(function(err,connection)
  {
    if(!err){
      connection.query(sql, function(err, result){
          connection.release()
          callback(err,result)
      })
    } else {
        callback(err,sql)
    }
    return err;
  })
}

/**
 * @param  {[String]} table:表名
 * @param  {[String}  字段
 * @param  {[String}  条件
 * @param  {[String]}   范围
 * @param  {Function}  
 * @return {[type]}
 */
db.search = function (table,fields,condition,range,callback){
  var sqlString = '';
  console.log('dbdbdbdbd')
  if(range){
    sqlString = `select ${fields}  from  ${table} where ${condition} limit ${range.from}, ${range.count} ; `
  }else{
     sqlString = `select ${fields} from ${table} where ${condition};`
  }
  console.log(sqlString)
  this.query(sqlString,function(err, result){
    callback(err, result)
  });
}


db.list = function (table, fields, range, callback) {
  if(!range)
    sqlString = `select ${fields}  from ${table}`
  else
    sqlString = `select ${fields} from ${table} limit ${range.from}, ${range.count}`
  this.query (sqlString, function (err, result){
    callback(err, result)
  })
}



module.exports = db; 