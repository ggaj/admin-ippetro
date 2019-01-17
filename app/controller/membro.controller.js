const { membros } = require('../model');
const mensagemTemplate = require('./../../views/template/mensagem.template');

class MembrosController{

    getMembro(id){
        return membros
        .findByPk(id)
        .then( membro => { 
            return membro.dataValues 
        })
    }

    getAllMembros(){

        let membrosArray = [];
        return membros
            .findAll({order: [
                ['nome', 'ASC'],
            ]})
            .then( result => {
                result.forEach(membro => {
                    membrosArray.push(membro.dataValues)
                }); 
                return membrosArray;
            });
    }

    gravaMembro(membro){
        let tipo;
        let template = {}

        return membros
            .create(membro)
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

    getAniversariantes(dataF){
        
        var data = new Date();



        console.log(data.toLocaleString());
        var dataF = new Date() 
        dataF.setDate(data.getDate() - 14);

        console.log(dataF.toLocaleString());

        return membros
            .findAll({ where: { datadenascto :  { $like : '%02-25'}}})
            .then( result => {
                return result;
            });
    }
}

module.exports = new MembrosController();