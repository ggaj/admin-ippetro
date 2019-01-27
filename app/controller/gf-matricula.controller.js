const { gf_matriculas } = require('../model');
const mensagemTemplate = require('../../views/template/mensagem.template');

class MatriculasController{

    getGFMatriculas(){

        let matriculasArray = [];
        return gf_matriculas
            .findAll()
            .then( result => {
                result.forEach(matricula => {
                    matriculasArray.push(matricula.dataValues)
                }); 
                return matriculasArray;
            });
    }

    removeGFMatriculas(){
        return gf_matriculas.destroy({ truncate: true });
    }

    async gravaGFMatricula(matricula){

        let template = {}
        
        this.removeGFMatriculas()
            .then( async () => {
                for (const k in matricula) {
                   
                    let matriculados        = {}
                    matriculados.membroId   = k;
                    await gf_matriculas.create(matriculados)
                }

                template = await mensagemTemplate.tTipo('s');
                return template;
            })
    }
}

module.exports = new MatriculasController();