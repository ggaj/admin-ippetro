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

        
        let user = {}, mensagem = {}
        let result, tipo, template;
        
        return membroController
            .getMembro(usuario.membroId)
            .then( async membro => {
            
                // console.log(usuario);
                // console.log(membro);

                // if (!membro.email) {
                //     mensagem.tipo  = 'alert alert-danger alert-dismissible fade show';
                //     mensagem.texto = `Usuário -> ${membro.nome} não possui e-mail cadastrado.`;
                //     return mensagem
                // }

                // let u = await usuarios.findByPk(usuario.id)
                // console.log(`${usuario.id_tipo_membro} - ${usuario.id}`);

                // if ( u ) {
                //     mensagem.tipo  = 'alert alert-danger alert-dismissible fade show';
                //     mensagem.texto = `Usuário já cadastrado -> ${membro.nome}`;
                //     return mensagem
                // }

                user.id_tipo_membro = usuario.id_tipo_membro;
                user.cpf            = membro.cpf;
                user.nome           = membro.nome;
                user.email          = membro.email;
                user.password       = usuario.password;
                user.membroId       = membro.id;
                
                if (usuario.id) {
                    user.id = usuario.id;
                    result = await usuarios.update(user, {where: { id :usuario.id }});
                } else {
                    result = await usuarios.create(user);
                }

                if (result){
                    tipo = 's';
                }else{
                    tipo = 'e';
                }
                template = mensagemTemplate.tTipo(tipo);
                return template;
                // if (result){
                //     mensagem.tipo  = 'alert alert-info alert-dismissible fade show';
                //     mensagem.texto = `Dados gravados com sucesso`;  
                // }else{
                //     mensagem.tipo  = 'alert alert-info alert-dismissible fade show';
                //     mensagem.texto = `Falha na atualização dos dados.`;  
                // }
                // console.log('3');
                // return mensagem
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