const { saladeaula } = require('../model');
const dateformat     = require('dateformat');

class EBDRelatorios{

    getPresencaSalasDia(data){

        let dt = dateformat(data, 'yyyy-mm-dd');
        let saladeaulaArray = []
        return saladeaula
            .findAll({ where: { [saladeaula.gte]: { datafinal: dt } } })
            .then((aulas) => {
                aulas.forEach(aula => {
                    saladeaulaArray.push(aula.dataValues);
                })
                return saladeaulaArray;
            });
    }
}
module.exports = new EBDRelatorios();