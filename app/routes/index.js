const express = require('express')
const router = express.Router()

const monitoring = require('./../monitoring')

/* GET home page. */
router.get('/', function (req, res) {
  res.json([])
});

/* GET home page. */
router.get('/monitoring', function (req, res) {
  const params = req.query;

  monitoring.get(params.hei, params.fromYear, params.toYear)
  .then(response => {
      res.render('monitoring', response)
  })
});

module.exports = router;
