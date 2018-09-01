module.exports = {
  getConcatArrayByInterval: interval => {
    return [',IFNULL(GROUP_CONCAT(COL2.tkr),"") AS "1998"'];
  },

  getLeftJoinArrayByInterval: interval => {
    return [
      'LEFT JOIN takbeloppsuppfoljning as COL2 ON COL1.id = COL2.id AND COL2.ar=1998'
    ];
  },

  createListStringByInterval: interval => {
    return '(1998, 1999, 2000, 2001, 2002)';
  },

  getMonitoringReport: (hei, interval) => {
    return Promise.resolve([
      {
        '1998': '470 457',
        '1999': '483 863',
        '2000': '517 677',
        '2001': '565 144',
        '2002': '575 054',
        konto: 'Takbelopp'
      }
    ]);
  }
};
