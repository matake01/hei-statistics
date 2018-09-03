const logger = require('./../tools/logger');
const db = require('./../db/reports')

const createResults = (arr) => {
  let results = []
  arr.forEach(obj =>
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

  return results;
}

module.exports = {

  getMonitoringReport: (req, res) => {
    const hei = (req.query.hei != null ? req.query.hei : '')
    const interval = (req.query.interval != null ? req.query.interval.split(/,/) : [])

    db.getMonitoringReport(hei, interval)
    .then(response => {
      logger.debug("GetMonitoringResponse: " + JSON.stringify(response));

      res.render('statistics', {
        'titles': [...[hei], ...interval.sort()],
        'results':  createResults(response)
      })
    })
  }

};