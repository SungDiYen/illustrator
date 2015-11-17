var express = require('express');
var router  = express.Router();

/* GET home page. */
router.get('/show', function(req, res) {
  res.render('show', { title: 'show data' });
});





module.exports = router;