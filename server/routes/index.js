var path = require('path')
var express = require('express')

var db = require('../db.js')
var Article = require('../controller/article')

var router = express.Router()

router.get('/get-articles', Article.getArticles)

router.get('/get-article-detail/:id', Article.getArticleDetail)

router.get('/get-timeline', Article.getTimeline)

router.get('/get-note', function (req, res, next) {
  let { current = 1, count = 15 } = req.query
  let field = 'id, title, detail, tag, created_at'
  let sql = `select ${field} from gather where status = 1 order by created_at desc
             limit ${(+current - 1) * +count}, ${+count}`

  db.query(sql, function (err, rows) {
    if (err) {
      res.json({
        "status": 0,
        "message": ''
      })
    } else {
      db.query(`select count(*) as total from gather where status = 1`, function (err, t) {
        res.json({
          status: 1,
          notes: rows,
          total: t[0]['total']
        })
      })
    }
  })
})

router.get('/get-gossip', function (req, res, next) {
  let {current = 1, count = 30} = req.query
  let field = 'id, detail, created_at, updated_at, save_name, file_name'
  let sql = `select ${field} from gossip order by created_at desc limit ${(+current-1) * +count}, ${+count}`

  db.query(sql, function (err, rows) {
    if (err) {
      res.json({
        "status": 0,
        "message": ''
      })
    } else {
      db.query('select count(*) as total from gossip', function (err, t) {
        if (err) {
          res.json({
            "status": 0,
            "message": ''
          })
        } else {
          res.json({
            status: 1,
            gossips: rows,
            total: t[0]['total']
          })
        }
      })
    }
  })
})

router.get('/get-navside-info', function (req, res, next) {
  let sqls = [
    `select name, value from config where (name = 'intro' or name = 'view_count') and status = 1`,
    `select id, title from article where status = 1 order by created_at desc limit 10`,
    `select id, theme from category where status = 1`,
    `select id, text, url from link where status = 1`,
    `select distinct tag, created_at from article where status = 1 order by created_at desc limit 15`,
    `select count(*) as count from article where status = 1`
  ]

  let ps = []
  for (let sql of sqls) {
    ps.push(new Promise(function(resolve, reject) {
      db.query(sql, function (err, rows) {
        if (err) {
          reject(err)
        }
        resolve(rows)
      })
    }))
  }

  let p = Promise.all(ps)
  p.then(function (out) {
    let tags = []

    for (let item of out[4]) {
      tags.push(...(item['tag'].trim().replace(/\s/, ' ').split(" ")))
    }

    tags = [...new Set(tags)]

    res.json({
      status: 1,
      portrait: {
        'intro': out[0][1]['value'],
        'viewCount': out[0][0]['value'],
        'articleCount': out[5][0]['count']
      },
      articles: out[1],
      categories: out[2],
      links: out[3],
      tags: tags
    })
  }).catch(function (err) {
    res.json({
      "status": 0,
      "message": 'error'
    })
  })
})

router.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../../public/index.html'))  // send static files
})

module.exports = router

