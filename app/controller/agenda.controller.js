const { agenda } = require('../model');
const mensagemTemplate = require('../../views/template/mensagem.template');

class Agenda{

    getAgendas(){
        let agendaArray = []
        return agenda
            .findAll()
            .then( result => {
                result.forEach(agenda => {
                    agendaArray.push(agenda.dataValues)
                }); 
                return agendaArray;
            });
    }

    async gravaAgenda(value){

        let tipo, result;
        let template = {}

        if (value.id) {
            result = await agenda.update(value, {where: { id :value.id }});
        } else {
            result = await agenda.create(value);
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
module.exports = new Agenda();