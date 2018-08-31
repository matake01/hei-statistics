const groupBy = require('json-groupby')
const logger = require('./tools/logger');

const { Sequelize, Takbeloppsuppfoljning, } = require('./models')

const createSet = (obj, collect) => {
  let values = []

  Object.keys(obj).forEach(key => {
    collect.forEach((subkey, index) => {
      values = [...values, ...obj[key][subkey]]
    })
  })

  return Array.from(new Set(values))
}

const createResults = (obj, collect) => {
  let results = []

  Object.keys(obj).forEach(key => {
    const item = [ key ]

    collect.forEach((subkey, index) => {
      const values = obj[key][subkey];

      values.forEach((value, index) => item.push(value))
      results.push(item);
    })
  })

  return results;
}

module.exports = {
  get: (hei, fromYear, toYear) => {
    return Takbeloppsuppfoljning.findAll({
      attributes: [ 'konto', 'ar', 'tkr' ],
      where: {
        larosate: hei,
        ar: {
          [Sequelize.Op.between]: [fromYear, toYear]
        }
      }
    })
    .then(response => {
      const groupedResponse = groupBy(response, ['konto'], ['ar', 'tkr'])

      return {
        'titles': [...[hei], ...createSet(groupedResponse, ['ar'])],
        'results': createResults(groupedResponse, ['tkr'])
      }
    })
  }

};
