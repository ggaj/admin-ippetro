const { pequenosgrupos } = require('../model');
const mensagemTemplate = require('./../../views/template/mensagem.template');

class PequenosGrupos{

    getPequenoGrupo( id ){
        return pequenosgrupos
            .findByPk(id)
            .then( pequenogrupo => {
                return pequenogrupo.dataValues;
            }); 
    }

    getAllPequenosGrupos(){
        let pequenosGruposArray = []
        return pequenosgrupos
            .findAll()
            .then( result => {
                result.forEach( pG => {
                    pequenosGruposArray.push( pG.dataValues)
                }); 
                return pequenosGruposArray;
            });
    }

    async gravaPequenosGrupos(pg){

        let tipo, result;
        let template = {}

        // if (modulo.ativo == 'on') {
        //     modulo.ativo = 1;
        // } else {
        //     modulo.ativo = 0;
        // }

        if (pg.id) {
            result = await pequenosgrupos.update(pg, {where: { id :pg.id }});
        } else {
            result = await pequenosgrupos.create(pg);
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
module.exports = new PequenosGrupos();