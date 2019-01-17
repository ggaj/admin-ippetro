'use strict';

module.exports = (sequelize, DataTypes) => {
  const saladeaula = sequelize.define('saladeaula', {
    id            : { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true, unique: true },
    saladeaula    : DataTypes.STRING,
    datainicial   : DataTypes.STRING,
    datafinal     : DataTypes.STRING,
  })

  saladeaula.associate = (models) => {

    saladeaula.belongsTo(models.materias);
  }

  return saladeaula

};