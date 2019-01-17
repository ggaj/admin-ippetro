'use strict';

module.exports = (sequelize, DataTypes) => {
  const diadeaula = sequelize.define('diadeaula', {
    saladeaulaId  : { primaryKey: true, type: DataTypes.INTEGER },
    diadeaula     : { primaryKey: true, type: DataTypes.STRING },
    id_membro     : { primaryKey: true, type: DataTypes.INTEGER },
  })

  return diadeaula

};