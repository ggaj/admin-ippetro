'use strict';

module.exports = (sequelize, DataTypes) => {
  const membros = sequelize.define('membros', {
    id            : { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true, unique: true },
    cpf           : DataTypes.STRING,
    rg            : DataTypes.STRING,
    nome          : DataTypes.STRING,
    telefone      : DataTypes.STRING,
    datadenascto  : DataTypes.STRING,
    aniversario   : DataTypes.STRING,
    tipodemembro  : DataTypes.INTEGER,
    email         : DataTypes.STRING,
    nomePai       : DataTypes.STRING,
    nomeMae       : DataTypes.STRING,
    logradouro    : DataTypes.STRING,
    numero        : DataTypes.STRING,
    cidade        : DataTypes.STRING,
    estado        : DataTypes.STRING,
    cep           : DataTypes.STRING,
    complemento   : DataTypes.STRING,
  })

  membros.associate = (models) => {

    membros.belongsTo(models.igrejas);
  };

  return membros

};