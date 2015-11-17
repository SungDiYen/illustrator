var express = require('express');
var router  = express.Router();

/* GET home page. */
router.get('/upload', function(req, res) {
  res.render('upload', { title: 'upload project' });
});





module.exports = router;