const { Sequelize } = require('sequelize')
const BalansrakningModel = require('./models/balansrakning')
const ResultatrakningModel = require('./models/resultatrakning')
const TakbeloppsuppfoljningModel = require('./models/takbeloppsuppfoljning')
const HstHprModel = require('./models/hst_hpr')

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
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

const Balansrakning = BalansrakningModel(sequelize, Sequelize)
const Resultatrakning = ResultatrakningModel(sequelize, Sequelize)
const Takbeloppsuppfoljning = TakbeloppsuppfoljningModel(sequelize, Sequelize)
const HstHpr = HstHprModel(sequelize, Sequelize)

sequelize.sync({ force: false })

module.exports = {
  Balansrakning,
  Resultatrakning,
  Takbeloppsuppfoljning,
  HstHpr,
  Sequelize,
  sequelize
};