'use strict';

module.exports = (sequelize, DataTypes) => {
  const modulos = sequelize.define('modulos', {
    id          : { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true, unique: true },
    modulo      : DataTypes.STRING,
    grupoensino : DataTypes.CHAR(3),
    ativo       : DataTypes.CHAR(1)
  })

  modulos.Map = row => ({
    
  })
  return modulos

};