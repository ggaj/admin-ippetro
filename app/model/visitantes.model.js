'use strict';

module.exports = (sequelize, DataTypes) => {
  const visitantes = sequelize.define('visitantes', {
    id          : { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true, unique: true },
    data        : DataTypes.STRING,
    quantidade  : DataTypes.INTEGER
  })

  visitantes.associate = (models) => {
    visitantes.belongsTo(models.diadeaula);
  };

  visitantes.Map = row => ({
    
  })
  return visitantes

};