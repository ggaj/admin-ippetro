'use strict';

module.exports = (sequelize, DataTypes) => {
  const professores = sequelize.define('professores', {
    id          : { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true, unique: true },
  })

  professores.associate = (models) => {

    professores.belongsTo(models.materias);
    professores.belongsTo(models.membros);
  };

  return professores;

};