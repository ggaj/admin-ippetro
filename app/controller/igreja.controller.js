const { igrejas }           = require('../model');
const mensagemTemplate = require('../../views/template/mensagem.template');

class IgrejaController{

    getAllIgrejas(){

        let igrejasArray = [];
        return igrejas
            .findAll()
            .then( result => {
                result.forEach(modulo => {
                    igrejasArray.push(modulo.dataValues)
                }); 
                return igrejasArray;
            });
    }

    gravarIgreja(igreja){

        let tipo;
        let template = {}

        return igrejas
            .create(igreja)
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

module.exports = new IgrejaController();