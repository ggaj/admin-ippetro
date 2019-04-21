const { gf_matriculas } = require('../model');
const { membros } = require('../model');
const { diadeaula } = require('../model');
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

    getGFMembrosMatriculados(licaoId, data){

        let matriculasArray = [], membrosArray = [], diadeaulaArray = [], presente = '';
        return gf_matriculas
            .findAll()
            .then( result => {
                result.forEach(matricula => {
                    membrosArray.push(matricula.dataValues.membroId)
                });
            })
            .then(async() => {
                diadeaula
                    .findAll({ where: { diadeaula: data, licaoId, grupoensino: 'GFU' }}) 
                    .then(( aulas ) => {
                        aulas.forEach(aula => {
                            diadeaulaArray.push(aula.dataValues);
                        });
                    })
            })
            .then(() => {
                return membros
                    .findAll({ where: { id: { in: membrosArray }}})
                    .then((membros) => {
                        membros.forEach( membro => {
                            if (diadeaulaArray.some((dia) => (dia.id_membro == membro.id))){
                                presente = 'checked';
                            } else {
                                presente = 'unchecked';
                            }

                            let alunos = {
                                id: membro.id,
                                nome: membro.nome,
                                presente
                            }
                            matriculasArray.push( alunos );
                        });
                        // console.log(matriculasArray);
                        return matriculasArray;
                    })
            });
        }

    removeGFMatriculas(){
        return gf_matriculas.destroy({ truncate: true });
    }

    async gravaGFMatricula(matricula){

        let template = {}
        
        await this.removeGFMatriculas()
            .then( async () => {
                for (const k in matricula) {
                   
                    let matriculados        = {}
                    matriculados.membroId   = k;
                    await gf_matriculas.create(matriculados)
                }
            })
            .then(() => {
                template = mensagemTemplate.tTipo('s');
                return template;
            })
    }
}

module.exports = new MatriculasController();