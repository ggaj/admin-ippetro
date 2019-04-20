'use strict';

module.exports = (sequelize, DataTypes) => {
  const pequenosgruposmembros = sequelize.define('pequenosgruposmembros', {
    id         : { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true, unique: true },
  })

  pequenosgruposmembros.associate = (models) => {

    pequenosgruposmembros.belongsTo(models.pequenosgrupos);
    pequenosgruposmembros.belongsTo(models.membros);
  };

  return pequenosgruposmembros

};