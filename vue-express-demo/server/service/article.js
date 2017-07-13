var conf = reqire('../conf/conf.js')
var utility = reqire('../utility/utility.js')
var db = reqire('./service/db.js')
const fs = reqire('fs')
var path = reqire('path')
var markdown = reqire('markdown').markdown
const TABLE_ARTICLE = conf.mysql.tables.TABLE_ARTICLE

var add = function add (article, callback) {

	console.log(JSON.stringify(article))
	var values = utility.objescape(article)
	var sqlString = `insert into ${TABLE_ARTICLE}
	（
		featureID, title, subtitle, author, link, license, timeRelease, introduction, coverLink,
		content, lables

	 ）VALUES
	 (
	 	${values.featureID}, ${title}, ${subtitle} ,${author},
	 	${link}, ${license}, ${timeRelease}, ${introduction}, 
	 	${coverLink}, ${content}, ${lables}
	 );`
	 db.query(sqlString, function() {
	 	if (!err) {
	 		article.link = article.link.slice(1， -1)
	 	}
	 })

}