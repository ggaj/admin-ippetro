'use strict';

module.exports = (sequelize, DataTypes) => {
  const matriculas = sequelize.define('matriculas', {
    id         : { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true, unique: true },
    // id_sala    : DataTypes.INTEGER,
    // id_membro  : DataTypes.INTEGER
  })

  matriculas.associate = (models) => {

    matriculas.belongsTo(models.saladeaula);
    matriculas.belongsTo(models.membros);
  };

  return matriculas

};