var db    = {};  
var mysql = require('mysql');  
var pool  = mysql.createPool({  
  connectionLimit : 10,  
  host :'localhost',  
  port :3306,
  user : 'root',  
  password : 'Wewechat',  
  database : 'db_blog'  
});  
  
db.query = function(sql, callback){  
  
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
  var condition = '1=1' 
  var sqlString = '';
  console.log('dbdbdbdbd')
  if(range){
    sqlString = 'select count(*) as count from tb_user;'
  }else{
     sqlString = `select ${fields} from ${table} where ${condition};`
  }
  console.log(sqlString)
  this.query(sqlString,function(err,rows,fields){
     if (err) {  
        console.log(err);  
        return;  
    }
    console.log('用户数量 : ', rows[0].count);  
  });


}



module.exports = db; 