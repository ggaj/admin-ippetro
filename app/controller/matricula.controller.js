const { matriculas } = require('../model');
const { membros } = require('../model');
const mensagemTemplate = require('./../../views/template/mensagem.template');

class MatriculasController{

    getMatriculas(sala){

        let matriculasArray = [];
        return matriculas
            .findAll({ where: { saladeaulaId: sala }})
            .then( result => {
                result.forEach(matricula => {
                    matriculasArray.push(matricula.dataValues)
                }); 
                return matriculasArray;
            });
    }

    getMatriculasAlunos(sala){

        let matriculasArray = [];
        return matriculas
            .findAll({ where: { saladeaulaId: sala }, include:[ membros ]})
            .then((result) => {
                result.forEach(alunosMatriculado => {
                    matriculasArray.push(alunosMatriculado.dataValues.membro.dataValues)
                }); 
                return matriculasArray;
            });
    }


    getAllMatriculas(){

        let matriculasArray = [];
        return matriculas
            .findAll()
            .then( result => {
                result.forEach(matricula => {
                    matriculasArray.push(matricula.dataValues)
                }); 
                return matriculasArray;
            });
    }

    removeMatriculas(sala){
        return matriculas.destroy({
            where: {
                saladeaulaId: sala
            }
        });
    }

    async gravaMatricula(matricula){

        let template = {}
        
        this.removeMatriculas(matricula.saladeaulaId)
            .then( async () => {
                for (const k in matricula) {
                    
                    if (k != 'saladeaulaId') {
                        
                        let matriculados = {}
                        matriculados.membroId       = k;
                        matriculados.saladeaulaId   = matricula.saladeaulaId;                        
                        await matriculas
                            .create(matriculados);
                    }
                }

                template = await mensagemTemplate.tTipo('s');
                return template;
            })
    }
}

module.exports = new MatriculasController();