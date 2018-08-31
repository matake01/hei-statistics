module.exports = (sequelize, type) => {
    return sequelize.define('takbeloppsuppfoljning', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        ar: type.STRING,
        larosate: type.STRING,
        konto: type.STRING,
        sortering: type.STRING,
        tkr: type.STRING,
        rubrik: type.INTEGER
    })
}