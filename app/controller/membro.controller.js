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

    async gravaMembro(membro){
        let tipo, result;
        let template = {}

        membro.aniversario = membro.datadenascto.substring(5,10);;
        
        if (membro.id) {
            result = await membros.update(membro, {where: { id :membro.id }});
        } else {
            result = await membros.create(membro);
        }
        
        if (result){
            tipo = 's';
        }else{
            tipo = 'e';
        }
        template = mensagemTemplate.tTipo(tipo);
        return template;
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