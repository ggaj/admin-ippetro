const { usuarios } = require('../model');
const bcrypt_p 		= require('bcrypt-promise');
const membroController = require('./membro.controller')
const mensagemTemplate = require('./../../views/template/mensagem.template');

class Usuarios {

    getUsuarios(){
        let usuariosArray = [];

        return usuarios
            .findAll()
            .then( result => {
                result.forEach( usuario => {
                    usuariosArray.push(usuario).dataValues;
                });
                return usuariosArray;
            })
    }

    getUsuario(id){

        return usuarios
            .findByPk(id)
            .then( usuario => {
                return usuario.dataValues;
            })
    }

    gravarUsuario(usuario) {

        let user = usuario;
        let mensagem = {};

        return membroController
            .getMembro(usuario.id)
            .then( async membro => {

                if (!membro.email) {
                    mensagem.tipo  = 'alert alert-danger alert-dismissible fade show';
                    mensagem.texto = `Usuário -> ${membro.nome} não possui e-mail cadastrado.`;
                    return mensagem
                }

                let u = await usuarios.findByPk(usuario.id)

                if ( u ) {
                    mensagem.tipo  = 'alert alert-danger alert-dismissible fade show';
                    mensagem.texto = `Usuário já cadastrado -> ${membro.nome}`;
                    return mensagem
                }
                user.cpf = membro.cpf;
                user.email = membro.email;
                user.nome = membro.nome;

                if (usuario.id) {
                    result = await usuarios.update(user, {where: { id :usuario.id }});
                } else {
                    result = await usuarios.create(user);
                }

                if (result){
                    mensagem.tipo  = 'alert alert-info alert-dismissible fade show';
                    mensagem.texto = `Dados gravados com sucesso`;  
                }else{
                    mensagem.tipo  = 'alert alert-info alert-dismissible fade show';
                    mensagem.texto = `Falha na atualização dos dados.`;  
                }
                
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