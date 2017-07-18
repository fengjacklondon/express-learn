'use static'
var express = require('express')
var router = express.Router()
var feature = require('../service/feature.js')

router.get('/', function(req, res) {
  var params = req.query
  if (typeof(params.action) === 'undefined'){
    return  res.end(JSON.stringify({err: true, result: 'illegal request action'}))
  }
  switch (params.action) {
    case 'feature-range':
    var range = {from: Nubmer(params.from), count: Nubmer(params.count)}
    var fields = `*`
    feature.list(fields, range, (err, result) =>{
      if (!err) {
        res.end(JSON.stringify({err: false, result: result}))
      } else {
        res.end(JSON.stringify({err: true, result: 'get feature range error'}))
      }
    })
    break

    case 'feature-list':
    var range = null
    var fields = `*`
    feature.list(fields, range, (err, result) => {
      if(!err)
        res.end(JSON.stringify({err: false, result: result}))
      else 
        res.end(JSON.stringify(err: true, result: 'get feature list error'))
    })
    break
    default:
    res.end (JSON.stringify({err: true, 'undefined request'}))
  }
}
module.exports = router