'use static'
var express = require('express')
var router = express.Router()
var utility = require('../utility/utility.js')
var article = require('../service/article.js')
var path = require('path')

router.get('/', function (req, res) {
  var params = req.query
  switch(params.action){
    case 'article-range':
      var fields = `id, featureID, title, subtitle, link, timeCreated, author, introduction, content, coverLink, countDiscuss`
      var range = {from: Number(params.from), count: Number(params.count)}
      article.list(fields, range, (err, result) => {
        if (!err)
          res.end(JSON.stringify({err: false, result: result}))
        else
          res.end(JSON.stringify({err: true, result: 'get article range error'}))
      })
      break
      default:
        res.end(JSON.stringify({err: true, result: 'undefined err'}))

  }
})
module.exports = router
