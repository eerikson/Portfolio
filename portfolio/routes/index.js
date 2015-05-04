var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Erik Erikson' });
});

/* GET home page. */
router.get('/photos', function(req, res, next) {
  res.render('photos', { title: 'Erik Erikson | Photographs' });
});


/* GET home page. */
router.get('/frontend', function(req, res, next) {
  res.render('frontend', { title: 'Erik Erikson | Frontend' });
});

module.exports = router;
