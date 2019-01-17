const { diadeaula } = require('./../model');
const mensagemTemplate = require('./../../views/template/mensagem.template');

class Diadeaula{

    getAllAlunosPresentes(sala, dia){
        
        let diadeaulaArray = []
        return diadeaula
            .findAll({ where: {saladeaulaId: sala, diadeaula: dia}})
            .then((aulas) => {
                aulas.forEach(aula => {
                    diadeaulaArray.push(aula.dataValues);
                })
                return diadeaulaArray;
            });
    }

    removeAlunosPresentes( sala, dia ){
        return diadeaula.destroy({
            where: {
              saladeaulaId: sala,
              diadeaula: dia
            }
        });
    }

    async gravarAlunosPresentes(alunosPresentes){

        let saladeaulaId = alunosPresentes.saladeaulaId;
        let dia           = alunosPresentes.diadeaula;

        this.removeAlunosPresentes(saladeaulaId, dia)
            .then(() => {
                for (const k in alunosPresentes) {
                    if (k != 'saladeaulaId' && k != 'diadeaula') {

                        let presentes = {}
                        presentes.saladeaulaId = saladeaulaId;
                        presentes.diadeaula     = dia; 
                        presentes.id_membro     = k;                       
                        diadeaula.create(presentes);
                    }
                }
            })
    }
}
module.exports = new Diadeaula();