module.exports = (sequelize, type) => {
    return sequelize.define('resultatrakning', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        ar: type.STRING,
        larosate: type.STRING,
        post: type.STRING,
        sortering: type.STRING,
        totalt: type.STRING,
        utbildning: type.STRING,
        uppdragsverksamhet: type.STRING,
        forskning: type.STRING,
        uppdragsforskning: type.STRING,
        annan: type.STRING,
        rubrik: type.INTEGER
    })
}