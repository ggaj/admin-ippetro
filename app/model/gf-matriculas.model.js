'use strict';

module.exports = (sequelize, DataTypes) => {
  const gf_matriculas = sequelize.define('gf_matriculas', {
    id         : { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true, unique: true },
  })

  gf_matriculas.associate = (models) => {
    gf_matriculas.belongsTo(models.membros);
  };

  return gf_matriculas

};