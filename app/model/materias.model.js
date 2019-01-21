'use strict';

module.exports = (sequelize, DataTypes) => {
  const materias = sequelize.define('materias', {
    id        : { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true, unique: true },
    materia   : DataTypes.STRING,
    ativo     : DataTypes.CHAR(1),
  })

  materias.associate = (models) => {

    materias.belongsTo(models.modulos);
  };
  
  return materias

};