module.exports = (sequelize, type) => {
    return sequelize.define('balansrakning', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        ar: type.STRING,
        larosate: type.STRING,
        konto: type.STRING,
        sortering: type.STRING,
        totalt: type.STRING,
        utbildning: type.STRING,
        forskning: type.STRING,
        fortlopande: type.STRING,
        rubrik: type.INTEGER
    })
}