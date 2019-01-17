const { materias } = require('../model');
const mensagemTemplate = require('./../../views/template/mensagem.template');

class MateriaController{
    
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