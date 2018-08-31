const logger = require('./../tools/logger');

const { Sequelize } = require('sequelize')
const BalansrakningModel = require('./balansrakning')
const ResultatrakningModel = require('./resultatrakning')
const TakbeloppsuppfoljningModel = require('./takbeloppsuppfoljning')
const HstHprModel = require('./hst_hpr')

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
        freezeTableName: true, //prevent sequelize from pluralizing table names
        timestamps: false,
        logging: true
    }
  }
)

const Balansrakning = BalansrakningModel(db, Sequelize)
const Resultatrakning = ResultatrakningModel(db, Sequelize)
const Takbeloppsuppfoljning = TakbeloppsuppfoljningModel(db, Sequelize)
const HstHpr = HstHprModel(db, Sequelize)

db.sync({ force: false })
  .then(() => {
    logger.info(`Database synchronized.`);
  })

module.exports = {
  Balansrakning,
  Resultatrakning,
  Takbeloppsuppfoljning,
  HstHpr,
  Sequelize
};