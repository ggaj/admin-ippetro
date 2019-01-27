const { licoes } = require('../model');
const { materias } = require('../model');
const mensagemTemplate = require('./../../views/template/mensagem.template');

class LicoesController{

    getLicao(id){

        return licoes
            .findByPk(id)
            .then( licao => { 
                return licao.dataValues;
            });
    }

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

    getLicoesMaterias(){

        let licoesArray = [];
        return licoes
            .findAll({ include: materias })
            .then( licoes => {
                licoes.forEach(licao => {
                    licao.dataValues.materia = licao.dataValues.materia.dataValues;
                    licoesArray.push(licao.dataValues)
                }); 
                return licoesArray;
            });
    }

    async gravaLicao(licao){

        let tipo, result;
        let template = {}

        if (licao.ativo == 'on') {
            licao.ativo = 1;
        } else {
            licao.ativo = 0;
        }

        if (licao.id) {
            result = await licoes.update(licao, {where: { id :licao.id }});
        } else {
            result = await licoes.create(licao);
        }

        if (result){

            tipo = 's';
        }else{
            tipo = 'e';
        }
        template = mensagemTemplate.tTipo(tipo);
        return template;
    }
}

module.exports = new LicoesController();