const { modulos }           = require('./../model');
const mensagemTemplate = require('./../../views/template/mensagem.template');

moduloCombobox = async (row) => {
    return dates;
}
class ModuloController{

    getModulo(id){
        return modulos
            .findByPk(id)
            .then( modulo => {
                return modulo.dataValues;
            }); 
    }

    

    getModulos(){
        let modulosArray = [];
        return modulos
            .findAll()
            .then( result => {
                result.forEach(modulo => {
                    modulosArray.push(modulo.dataValues)
                }); 
                return modulosArray;
            });
    }

    getModulosByGrupoEnsino(tipo){
        let modulosArray = [];
        return modulos
            .findAll({ where : { tipo } })
            .then(() =>{
                
            })
    }

    getModulosAtivos(){
        let modulosArray = [];
        return modulos
            .findAll({ where : { ativo : true } })
            .then( result => {
                result.forEach(modulo => {
                    modulosArray.push(modulo.dataValues)
                }); 
                return modulosArray;
            });
    }

    async gravaModulo(modulo){

        let tipo, result;
        let template = {}

        if (modulo.ativo == 'on') {
            modulo.ativo = 1;
        } else {
            modulo.ativo = 0;
        }

        if (modulo.id) {
            result = await modulos.update(modulo, {where: { id :modulo.id }});
        } else {
            result = await modulos.create(modulo);
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

module.exports = new ModuloController();