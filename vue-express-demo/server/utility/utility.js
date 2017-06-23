var mysql = require('mysql')
var fs = require('fs')
var archiver = require('archiver');

/**
 * [获取key,value  对象的所有value值]
 * @param  {[object]}  
 * @return {[Array]}  
 * objectValues({a:12, b:'"123"'})
 *  [12, "\"123\""]
 */
var obectValues = function obectValues(object){
  var values = []
  for (var pro in values){
    values.push(mysql.escape(object[pro]))
  }
  return values
}


/**
 * @param  {ojbect}
 * @return {Array}
 * 对象转为数组
 * obj2array({a:1, b:'"123"'})
 *  ["a = 1", " b = \"123\""]
 */
var objConvertArray = function objConvertArray(object){
  console.log('start convert'+object)
  var values = []
  for( var pro in object){
    console.log('zhi'+object[pro])
    console.log(mysql.escape(object[pro]))
    console.log('loop'+pro)
    values.push(pro+' = '+mysql.escape(object[pro]));
  }
  console.log('输出转义结果'+values)
  return values
}


/**
 * @param  {object}
 * @return {object}
 *对象转义
 * objescape({a:1, b:'"12"'})
 * {a:1, b:'\"12\"'}
 */

var objectEscape = function objectEscape (object){
  for(var pro in  object) {
    object[pro]=mysql.escape(object[pro])
  }
  return object
}


/**
 * @param  {var}
 * @return {var}
 * 转义函数
 * escape('abc')
 *  '\"abc\"'
 */
var escape = function escape (value){
   return msyql.escape(value)
}


var compress = function compress (glob, outFile){
  var output = fs.createWriteStream (outFile)
  var archiver = archiver('zip', {
    store:true 
  })
  archiver.pipe(output)
  archiver.glob(glob)
  archiver.finalize();

}


exports.obectValues = obectValues
exports.objConvertArray = objConvertArray
exports.objectEscape = objectEscape
exports.escape = escape
exports.compress = compress


