'use strict';

module.exports = (sequelize, DataTypes) => {
  const agenda = sequelize.define('agenda', {
    id         : { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true, unique: true },
    data       : DataTypes.STRING(10),
    titulo     : DataTypes.STRING(80),
    mensagem   : DataTypes.STRING
  })

  return agenda

};