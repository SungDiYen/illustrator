var express = require('express');
var router  = express.Router();

/* GET users listing. */
router.get('/users', function(req, res) {
  res.render('users', { title: 'users' });
});

module.exports = router;