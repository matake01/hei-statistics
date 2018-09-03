module.exports = (sequelize, type) => {
    return sequelize.define('hst_hpr', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        ar: type.STRING,
        larosate: type.STRING,
        utbildningsomrade: type.STRING,
        sortering: type.STRING,
        antal_helarsstudenter: type.STRING,
        antal_helarsprestationer: type.STRING,
        rubrik: type.INTEGER
    })
}