const model = require('../model');
const dateformat     = require('dateformat');

class EBDRelatorios{

    async getPresencaSalasDia(data){

        let dt = dateformat('2019-01-28', 'yyyy-mm-dd');

        let presentes = await model.sequelize.query('SELECT saladeaulaId, saladeaula, COUNT(*) as qtd FROM diadeaula, saladeaula WHERE diadeaula = :diadeaula',
            { replacements: { diadeaula: dt }, type: model.sequelize.QueryTypes.SELECT }
        )

        let matriculados = await model.sequelize.query('SELECT saladeaulaId, saladeaula, COUNT(*) as qtd FROM matriculas, saladeaula',
            { replacements: { diadeaula: dt }, type: model.sequelize.QueryTypes.SELECT }
        )

        let visitantes = await model.sequelize.query('SELECT saladeaulaId, saladeaula, quantidade as qtd FROM visitantes, diadeaula, saladeaula WHERE diadeaula = :diadeaula GROUP BY saladeaulaId, saladeaula, quantidade',
            { replacements: { diadeaula: dt }, type: model.sequelize.QueryTypes.SELECT }
        )
        
        let presenca = {}

        presenca.sala   = matriculados[0].saladeaula;
        presenca.pre    = parseInt(presentes[0].qtd);
        presenca.aus    = parseInt(matriculados[0].qtd) - parseInt(presentes[0].qtd);
        presenca.vis    = parseInt(visitantes[0].qtd);
        presenca.tot    = parseInt(presentes[0].qtd) + parseInt(visitantes[0].qtd);

        let presencaArray = []

        presencaArray.push(presenca);
        // console.log(presenca);

        return presencaArray;
    }
}
module.exports = new EBDRelatorios();