const model = require('../model');
const { pequenosgruposmembros, membros } = require('../model');
const mensagemTemplate = require('../../views/template/mensagem.template');

class PequenosGrupos{

    getMembrosByPequenosGrupos( id ){
        let pequenosGruposArray = []
        return pequenosgruposmembros
            .findAll( {where:{ pequenosgrupoId: id }, include: [membros]} )
            .then( result => {
                console.log(result);
                result.forEach( pG => {
                    pequenosGruposArray.push( pG.dataValues)
                }); 
                return pequenosGruposArray;
            });
    }

    async getMembrosOutPequenosGrupos(){

        let pequenosGruposArray = []
        let pequenosGruposMembros = await model.sequelize.query( 'select * from membros where membros.id not in ( select membroId from pequenosgruposmembros )',
            { type: model.sequelize.QueryTypes.SELECT } 
        )
        for (let i = 0; i < pequenosGruposMembros.length; i++) {
            pequenosGruposArray.push(pequenosGruposMembros[i]);   
        }
        return pequenosGruposArray;
    }

    removePequenosGruposMembros(pequenoGrupo){
        return pequenosgruposmembros.destroy({
            where: {
                pequenosgrupoId: pequenoGrupo
            }
        });
    }

    async gravaPequenosGruposMembros(pg){

        let tipo, result;
        let template = {}

        // console.log(pg);
        this.removePequenosGruposMembros(pg.pequenosGruposMembros)
            .then( async () => {
                for (const k in pg) {
                    if (k != 'pequenosGruposMembros' && k != 'pesquisaMatriculas') {
                        let pequenoGrupo = {}
                        pequenoGrupo.pequenosgrupoId = pg.pequenosGruposMembros 
                        pequenoGrupo.membroId        = k
                        await pequenosgruposmembros.create( pequenoGrupo )
                    }
                }

                template = await mensagemTemplate.tTipo('s');
                return template;
            })

    //     // if (modulo.ativo == 'on') {
    //     //     modulo.ativo = 1;
    //     // } else {
    //     //     modulo.ativo = 0;
    //     // }

        // if (pg.id) {
        //     result = await pequenosgruposmembros.update(pg, {where: { id :pg.id }});
        // } else {
        //     result = await pequenosgruposmembros.create(pg);
        // }

    //     if (result){
    //         tipo = 's';
    //     }else{
    //         tipo = 'e';
    //     }
    //     template = mensagemTemplate.tTipo(tipo);
        // return template;
    }
}
module.exports = new PequenosGrupos();