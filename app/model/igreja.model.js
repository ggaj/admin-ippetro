'use strict';

module.exports = (sequelize, DataTypes) => {
  const igrejas = sequelize.define('igrejas', {
    id            : { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true, unique: true },
    nome          : DataTypes.STRING,
    logradouro    : DataTypes.STRING,
    numero        : DataTypes.STRING,
    cidade        : DataTypes.STRING,
    estado        : DataTypes.STRING,
    cep           : DataTypes.STRING,
    complemento   : DataTypes.STRING,
  })

  return igrejas

};