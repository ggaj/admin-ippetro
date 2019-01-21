const { materias } = require('../model');
const { modulos } = require('../model');
const mensagemTemplate = require('./../../views/template/mensagem.template');

class MateriaController{
    
    getMateriasModulos(){
        let materiasArray = [];
        return materias
            .findAll({ include:[ modulos ]})
            .then((materias) => {
                materias.forEach(materia => {
                    materia.dataValues.modulo = materia.dataValues.modulo.dataValues;
                    // console.log(materia.dataValues);
                    // console.log(materia.dataValues.modulo.dataValues);
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

    gravaMateria(materia){

        let tipo;
        let template = {}

        return materias
            .create(materia)
            .then( result => {
                if (result){

                    tipo = 's';
                }else{
                    tipo = 'e';
                }
                template = mensagemTemplate.tTipo(tipo);
                return template;
            });
    }
}

module.exports = new MateriaController();