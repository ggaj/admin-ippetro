const { usuarios } = require('../model');
const bcrypt_p 		= require('bcrypt-promise');
const membroController = require('./membro.controller')
const mensagemTemplate = require('./../../views/template/mensagem.template');

class Usuarios {

    getAllUsuarios(){
        return usuarios
            .findAll()
            .then( result => {
                return result.dataValues;
            })
    }

    gravarUsuario(usuario) {

        let user = usuario;
        let mensagem = {};
        let tipo = '';

        return membroController
            .getMembro(usuario.id)
            .then( async membro => {

                let u = await usuarios.findByPk(usuario.id)

                if ( u ) {
                    mensagem.tipo  = 'alert alert-danger alert-dismissible fade show';
                    mensagem.texto = `Usuário já cadastrado -> ${membro.nome}`;
                    return mensagem
                }
                user.cpf = membro.cpf;
                user.email = membro.email;
                await usuarios
                    .create(user);
                
                mensagem.tipo  = 'alert alert-info alert-dismissible fade show';
                mensagem.texto = `Dados gravados com sucesso`;
                return mensagem
            })
    }

    checkLogin(usuario) {

        let mensagem = {}

        return usuarios
            .findOne({ where: { cpf: usuario.cpf }})
            .then((user) => {
                if (user) {
                    return bcrypt_p
                        .compare(usuario.senha, user.senha)
                        .then((result) =>{
                            mensagem.status = result;
                            if (result) {
                                mensagem.token = user.getJWT();
                            }
                        })
                        .then(() =>{
                            return mensagem;
                        })
                } else {
                    mensagem.status = false;
                    return mensagem;
                }
            })
    }
}
module.exports = new Usuarios();