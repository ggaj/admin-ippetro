'use strict';

const bcrypt      = require('bcrypt');
const bcrypt_p 		= require('bcrypt-promise');
const jwt         = require('jsonwebtoken');
const env         = process.env.NODE_ENV || 'development';
const config      = require('./../../config/config.json')[env];

module.exports = (sequelize, DataTypes) => {
  const usuarios = sequelize.define('usuarios', {
    id              : { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true, unique: true },
    id_tipo_membro  : DataTypes.INTEGER,
    cpf             : DataTypes.CHAR(14),
    nome            : DataTypes.STRING,
    email           : DataTypes.STRING,
    password        : DataTypes.STRING,
  })

  usuarios.associate = (models) => {
    usuarios.belongsTo( models.membros );
  };

  usuarios.beforeSave(async (usuario, options) => {
    
    // if (usuario.changed('password')) {

      let salt, hash

      salt = await bcrypt.genSalt(10);
      hash = await bcrypt.hash(usuario.password, salt);

      usuario.password = hash;
    // }
  });

  usuarios.beforeBulkUpdate(async (options) => {
      console.log(options.attributes.password);
    // if (usuario.changed('password')) {

      let salt, hash

      salt = await bcrypt.genSalt(10);
      hash = await bcrypt.hash(options.attributes.password, salt);

      options.attributes.password = hash;
    // }
  });

  usuarios.prototype.comparePassword = function (pw) {
    
    return bcrypt_p
      .compare(pw, this.password)
      .then((result) => {
        return result;
      });
  }
    
  usuarios.prototype.getJWT = function () {
    let expiration_time = parseInt(config.jwt_expiration);
    return "Bearer "+jwt.sign({user_id:this.id}, config.jwt_encryption, {expiresIn: expiration_time});
  };

  return usuarios

}