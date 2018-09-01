const { Sequelize, sequelize } = require('./models');

const getConcatArrayByInterval = interval => {
  let arr = [];
  interval.forEach((v, i) => {
    arr = [
      ...arr,
      [' ,IFNULL(GROUP_CONCAT(COL' + Number(i + 2) + ".tkr),'') AS '" + v + "'"]
    ];
  });
  return arr;
};

const getLeftJoinArrayByInterval = interval => {
  let arr = [];
  interval.forEach((v, i) => {
    const colIndex = Number(i + 2);
    arr = [
      ...arr,
      [
        ' LEFT JOIN takbeloppsuppfoljning as COL' +
          colIndex +
          ' ON COL1.id = COL' +
          colIndex +
          '.id AND COL' +
          colIndex +
          ".ar='" +
          v +
          "'"
      ]
    ];
  });
  return arr;
};

const createListStringByInterval = interval => {
  let string = interval.length > 0 ? '' : "''";
  interval.forEach(
    (v, i) => (string += "'" + v + "'" + (i + 1 < interval.length ? ',' : ''))
  );
  return '(' + string + ')';
};

module.exports = {
  getMonitoringReport: (hei, interval) => {
    return sequelize
      .query(
        [
          'SELECT',
          " COL1.konto AS 'konto'",
          ...getConcatArrayByInterval(interval),
          ' FROM takbeloppsuppfoljning as COL1',
          ...getLeftJoinArrayByInterval(interval),
          ' WHERE 1',
          ' AND COL1.larosate = :hei',
          ' AND COL1.ar IN ' + createListStringByInterval(interval),
          ' GROUP BY 1',
          ' ORDER BY 1 ASC'
        ].join(''),
        {
          replacements: {
            hei: hei
          },
          type: Sequelize.QueryTypes.SELECT
        }
      )
      .then(function(response) {
        return response;
      });
  }
};
