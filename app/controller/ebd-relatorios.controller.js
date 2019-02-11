const model = require('../model');
const dateformat     = require('dateformat');

class EBDRelatorios{

    async getPresencaSalasDia(diadeaula){

        // let dt = dateformat('2019-02-04', 'yyyy-mm-dd');
        // console.log(dt);

        let presentes = await model.sequelize.query('SELECT saladeaula.id, saladeaula.saladeaula, count(diadeaula.id_membro) as qtd FROM saladeaula LEFT JOIN diadeaula ON id = saladeaulaid WHERE diadeaula = :diadeaula group by saladeaula.id, saladeaula.saladeaula',
            { replacements: { diadeaula }, type: model.sequelize.QueryTypes.SELECT }
        )

        let matriculados = await model.sequelize.query('SELECT saladeaula.id, saladeaula, COUNT(*) as qtd FROM saladeaula INNER JOIN matriculas ON saladeaula.id = matriculas.saladeaulaId GROUP BY id, saladeaula',
            { replacements: { diadeaula }, type: model.sequelize.QueryTypes.SELECT }
        )

        let visitantes = await model.sequelize.query('SELECT saladeaula.id, saladeaula, visitantes.quantidade as qtd FROM saladeaula left join visitantes on visitantes.diadeaulaSaladeaulaId = saladeaula.id WHERE data = :diadeaula group by saladeaula.id, saladeaula',
            { replacements: { diadeaula }, type: model.sequelize.QueryTypes.SELECT }
        )
        
        let presencaArray = []
        matriculados.forEach( mat => {
            let presenca = new Object;

            presenca.sala   = mat.saladeaula;
            presenca.pre    = 0;
            presenca.vis    = 0;

            presentes.filter((pres) => {
                if (pres.saladeaula == mat.saladeaula)
                    presenca.pre = pres.qtd;
            })            
            presenca.aus = mat.qtd - presenca.pre; 
            
            visitantes.filter((visi) => {
                if (visi.saladeaula == mat.saladeaula)
                    presenca.vis = visi.qtd;
            })            
            
            presenca.tot = presenca.pre + presenca.vis;
            presencaArray.push(presenca)
        });

        return presencaArray;
    }
}
module.exports = new EBDRelatorios();