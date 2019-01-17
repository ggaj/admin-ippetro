const { saladeaula } = require('./../model');
const mensagemTemplate = require('./../../views/template/mensagem.template');

class SalaDeAulaController{

    getAllSalasdeaula(){

        let saladeaulaArray = [];
        return saladeaula
            .findAll()
            .then( result => {
                result.forEach( sala => {
                    saladeaulaArray.push(sala.dataValues)
                }); 
                return saladeaulaArray;
            });
    }

    getSalasdeaula(sala){

        return saladeaula
            .findByPk(sala)
            .then( sala => {
                return sala.dataValues;
            });
    }

    gravaSaladeaula(sala){

        let tipo;
        let template = {}

        return saladeaula
            .create(sala)
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
module.exports = new SalaDeAulaController();