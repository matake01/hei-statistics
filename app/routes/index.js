const express = require('express')
const router = express.Router()
const statistics = require('./../statistics.js')

/* GET home page. */
router.get('/', function (req, res) {
  res.json([])
})

/* GET statistics monitoring page. */
router.get('/statistics/monitoring', function (req, res) {
  const hei = (req.query.hei != null ? req.query.hei : '')
  const interval = (req.query.interval != null ? req.query.interval.split(/,/) : [])

  statistics.getMonitoringReport(hei, interval)
  .then(response => {

    // create results
    let results = []
    response.forEach(obj =>
      Object.keys(obj).forEach((k, i) => {
        if (i == 0)
          results[results.length] = []

        // the account should be positioned first
        if (k == 'konto')
          results[results.length-1][0] = obj[k]
        else
          results[results.length-1][i+1] = obj[k]
      })
    )

    res.render('statistics', {
      'titles': [...[hei], ...interval.sort()],
      'results':  results
    })
  })
})

module.exports = router;