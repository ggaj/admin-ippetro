'use strict';

module.exports = (sequelize, DataTypes) => {
  const pequenosgrupos = sequelize.define('pequenosgrupos', {
    id         : { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true, unique: true },
    nome       : DataTypes.STRING,
    lider      : DataTypes.STRING,
    co_lider   : DataTypes.STRING,
    anfitriao  : DataTypes.STRING
  })

  return pequenosgrupos

};