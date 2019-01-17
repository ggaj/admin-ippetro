'use strict';

module.exports = (sequelize, DataTypes) => {
  const materias = sequelize.define('materias', {
    id        : { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true, unique: true },
    materia   : DataTypes.STRING
  })

  materias.associate = (models) => {

    materias.belongsTo(models.modulos);
  };
  
  return materias

};