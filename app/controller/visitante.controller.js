const { visitantes }   = require('../model');
const mensagemTemplate = require('../../views/template/mensagem.template');

class VisitanteController{

    getVisitante(id){
        return visitantes
            .findByPk(id)
            .then( visitante => {
                return visitante.dataValues;
            }); 
    }

    getVisitantes(){
        let visitantesArray = [];
        return visitantes
            .findAll()
            .then( result => {
                result.forEach(visitante => {
                    visitantesArray.push(visitante.dataValues)
                }); 
                return visitantesArray;
            });
    }

    async gravaVisitante(visitante){

        let tipo, result;
        let template = {}

        // if (visitante.ativo == 'on') {
        //     visitante.ativo = 1;
        // } else {
        //     visitante.ativo = 0;
        // }

        visitantes
            .findOne({ where: { data: visitante.data }})
            .then( async (result) => {
                // console.log(result.dataValues);
                if (result) {
                    console.log('update');
                    result = await visitantes.update(visitante, {where: { id :result.id }});
                } else {
                    console.log('create');
                    result = await visitantes.create(visitante);
                }
            })

        // if (visitante.id) {
        //     result = await visitantes.update(visitante, {where: { id :visitante.id }});
        // } else {
        //     result = await visitantes.create(visitante);
        // }

        if (result){
            tipo = 's';
        }else{
            tipo = 'e';
        }
        template = mensagemTemplate.tTipo(tipo);
        return template;
    }
}

module.exports = new VisitanteController();