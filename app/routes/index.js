const express = require('express')
const router = express.Router()
const statistics = require('./statistics')

router.get('/statistics/monitoring', statistics.getMonitoringReport);

/* GET home page. */
router.get('/', function (req, res) {
  res.json([])
})

module.exports = router;