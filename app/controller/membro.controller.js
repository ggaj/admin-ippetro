const { membros } = require('../model');
const mensagemTemplate = require('./../../views/template/mensagem.template');

lastWeek = async () => {
    let dates = {}
    var today = new Date();
    var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);
    dates.today = today;
    dates.lastWeek = lastWeek;
    return dates;
}

nextWeek = async () => {
    let dates = {}
    var today = new Date();
    var nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 6);
    dates.today = today;
    dates.nextWeek = nextWeek;
    return dates;
}
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

        membro.aniversario = membro.datadenascto.substring(5,10);
        
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

    async getAniversariantes(){

        // let dataI, dataF, 
        let mesI, mesF, dates;
        let aniverArray = [];

        dates = await nextWeek();
        mesI = ("00" + (dates.today.getMonth() + 1).toString()).slice(-2) + "-" + ("00" + dates.today.getDate()).slice(-2);
        mesF = ("00" + (dates.nextWeek.getMonth() + 1).toString()).slice(-2) + "-" + ("00" + dates.nextWeek.getDate()).slice(-2);

        return membros
            .findAll({ where: 
                { aniversario :
                    {
                        $between: [mesI, mesF]
                    }
                }
                ,order: [
                ['aniversario', 'ASC'],
            ]})
            .then( result => {
                result.forEach(aniver => {
                    aniver.dataValues.aniversario_pt = `${aniver.aniversario.toString().substring(3,5)}-${aniver.aniversario.toString().substring(0,2)}`
                    aniverArray.push(aniver.dataValues)
                }); 
                return aniverArray;
            });
    }
}

module.exports = new MembrosController();