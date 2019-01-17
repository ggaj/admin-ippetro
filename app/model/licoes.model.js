'use strict';

module.exports = (sequelize, DataTypes) => {
  const licoes = sequelize.define('licoes', {
    id         : { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true, unique: true },
    licao   : DataTypes.STRING
  })

  licoes.associate = (models) => {

    licoes.belongsTo(models.materias);
  };

  return licoes

};