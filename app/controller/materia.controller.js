const { materias } = require('../model');
const { modulos } = require('../model');
const mensagemTemplate = require('./../../views/template/mensagem.template');

class MateriaController{
    
    getMateria(id){
        return materias
            .findByPk(id, { include:[ modulos ]})
            .then((materia) => {
                console.log(materia);
                return materia;
            })
    }

    getMateriasModulos(){
        let materiasArray = [];
        return materias
            .findAll({ include:[ modulos ]})
            .then((materias) => {
                materias.forEach(materia => {
                    materia.dataValues.modulo = materia.dataValues.modulo.dataValues;
                    materiasArray.push(materia.dataValues)
                }); 
                return materiasArray;
            });
    }

    getMaterias(){

        let materiasArray = [];
        return materias
            .findAll()
            .then( result => {
                result.forEach(materia => {
                    materiasArray.push(materia.dataValues)
                }); 
                return materiasArray;
            });
    }

    async gravaMateria(materia){

        let tipo, result;
        let template = {}

        if (materia.ativo == 'on') {
            materia.ativo = 1;
        } else {
            materia.ativo = 0;
        }

        if (materia.id) {
            result = await materias.update(materia, {where: { id :materia.id }});
        } else {
            result = await materias.create(materia);
        }

        if (result){
            tipo = 's';
        }else{
            tipo = 'e';
        }
        template = mensagemTemplate.tTipo(tipo);
        return template;
    }
}

module.exports = new MateriaController();