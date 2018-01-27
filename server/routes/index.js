var path = require('path')
var express = require('express')

var db = require('../db.js')
var Article = require('../controller/article')

var router = express.Router()

router.get('/get-articles', Article.getArticles)

router.get('/get-article-detail', Article.getArticleDetail)

router.get('/get-timeline', Article.getTimeline)

router.get('/get-note', function (req, res, next) {
//  TBA
})

router.get('/get-gossip', function (req, res, next) {
//  TBA
})

router.get('/get-navside-info', function (req, res, next) {
//  TBA
})

router.get('*', function (req, res, next) {
  res.sendfile(path.join(__dirname, '../../public/index.html'))  // send static files
})

module.exports = router

