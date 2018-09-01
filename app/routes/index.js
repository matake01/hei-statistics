const express = require('express')
const router = express.Router()
const statistics = require('./../statistics')

const formatMonitoringResponse = (response) => {
  let report = []
  response.forEach(obj =>
    Object.keys(obj).forEach((k, i) => {
      if (i == 0)
        report[report.length] = []

      // ensure positioning
      if (k == 'konto')
        report[report.length-1][0] = obj[k]
      else
        report[report.length-1][i+1] = obj[k]
    })
  )
  return report
}

/* GET home page. */
router.get('/', function (req, res) {
  res.json([])
})

/* GET home page. */
router.get('/statistics/monitoring', function (req, res) {
  const hei = (req.query.hei != undefined ? req.query.hei : '')
  const interval = (req.query.interval != undefined ? req.query.interval.split(/,/) : [])

  statistics.getMonitoringReport(hei, interval)
  .then(response => {
    res.render('statistics', {
      'titles': [...[hei], ...interval.sort()],
      'results':  formatMonitoringResponse(response)
    })
  })
})

module.exports = router;