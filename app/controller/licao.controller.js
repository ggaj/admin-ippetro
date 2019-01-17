const { licoes } = require('../model');
const mensagemTemplate = require('./../../views/template/mensagem.template');

class LicoesController{

    getLicoes(){

        let licoesArray = [];
        return licoes
            .findAll()
            .then( result => {
                result.forEach(licao => {
                    licoesArray.push(licao.dataValues)
                }); 
                return licoesArray;
            });
    }

    gravaLicao(licao){

        let tipo;
        let template = {}

        return licoes
            .create(licao)
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

module.exports = new LicoesController();