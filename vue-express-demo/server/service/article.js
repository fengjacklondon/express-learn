var conf = require('../conf/conf.js')
var utility = require('../utility/utility.js')
var db = require('./db.js')
const fs = require('fs')
var path = require('path')
var markdown = require('markdown').markdown
const TABLE_ARTICLE = conf.mysql.tables.TABLE_ARTICLE

var add = function add (article, callback) {

	console.log(JSON.stringify(article))
	var values = utility.objectEscape(article)
	var sqlString = `insert into ${TABLE_ARTICLE}
	 (
		featureID, title, subtitle, author, link, license, introduction, coverLink,
		content, labels

	 )VALUES
	 (
	 	${values.featureID}, ${values.title}, ${values.subtitle} ,${values.author},
	 	${values.link}, ${values.license}, ${values.introduction}, 
	 	${values.coverLink}, ${values.content}, ${values.labels}
	 );`
	 db.query(sqlString, function(err, result) {
	 	console.log('文件增加 sql:' + sqlString)
	 	if (!err) {
	 		article.link = article.link.slice(1, -1)
	 		article.title = article.title.slice(1, -1)
	 		article.subtitle = article.subtitle.slice(1, -1)
	 		article.content = article.content.slice(1, -1)
	 		renderToHTML(article, (err) =>{
	 			callback(err|| !result.affectedRows, result)
	 			return false
	 		})
	 	} else {
	 		callback(err||!result.affectedRows, result)
	 		return (err || result.affectedRows)
	 	}
	 })

}

var edit = function edit (article, callback){
	var condition = `id = `+(article.id)
	db.update (TABLE_ARTICLE, article, condition, (err, result) =>{
		if(!err){
			renderToHTML(article, (err) =>{
				callback(err)
			})
		}else{
			callback (err|| !result.affectedRows, result)
		}
	})
}

var list = function list (fields, range, callback){
	db.list(TABLE_ARTICLE, fields, range, callback)
}

var search = function search (fields, condition, range, callback) {
	db.search(TABLE_ARTICLE, fields, condition, callback)
}


var del = function del (articleId, callback){
	var condition = `id = ` + articleId
	db.del(TABLE_ARTICLE, condition, callback)
}


/**
 * 这方方法稍微有点技术含量
 * @return {[type]} [description]
 */
var renderToHTML =  function renderMD (article, callback) {
	var rootPath = path.dirname(__dirname)
	var articleConf = conf.article
	var htmlpath = rootPath + articleConf.storePath+'/'+article.link + '.html'
	var mdhtml = markdown.toHTML(article.content)
	var titlehtml = '<!DOCTYPE html><hmtl><head><mata charset="utf-8"><title>'+article.title+article.subtitle
	var linkhtml = ' </title><link rel="stylesheet" type="text/css" href="stylesheets/'+articleConf.css+'"></head><body>'
	var pughtml = titlehtml+ linkhtml+mdhtml +'</body></html>'
	console.log('解析的md'+article.content)
	console.log('解析后的'+mdhtml)
	fs.writeFile(htmlpath , pughtml, (err) => {
		console.log('创建 HTML'+htmlpath+(!err))
		callback(err)
	})
}

exports.add = add
exports.del = del
exports.edit = edit
exports.list =list 
exports.search = search

