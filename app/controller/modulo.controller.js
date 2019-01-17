const { modulos }           = require('./../model');
const mensagemTemplate = require('./../../views/template/mensagem.template');

class ModuloController{

    getModulos(){

        let modulosArray = [];
        return modulos
            .findAll()
            .then( result => {
                result.forEach(modulo => {
                    modulosArray.push(modulo.dataValues)
                }); 
                return modulosArray;
            });
    }

    gravaModulo(modulo){

        let tipo;
        let template = {}

        return modulos
            .create(modulo)
            .then( result => {
                if (result){

                    tipo = 's';
                }else{
                    tipo = 'e';
                }
                template = mensagemTemplate.tTipo(tipo);
                return template;
            });
    }

}

module.exports = new ModuloController();