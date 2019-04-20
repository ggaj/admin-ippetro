'use strict';

module.exports = (sequelize, DataTypes) => {
  const pequenosgrupospresenca = sequelize.define('pequenosgrupospresenca', {
    id         : { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true, unique: true },
    data       : { type: DataTypes.STRING(10) }
  })

  pequenosgrupospresenca.associate = (models) => {
    pequenosgrupospresenca.belongsTo(models.pequenosgrupos);
    pequenosgrupospresenca.belongsTo(models.membros);
  };

  return pequenosgrupospresenca

};