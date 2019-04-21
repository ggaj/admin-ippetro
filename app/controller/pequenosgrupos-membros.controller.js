const model = require('../model');
const { pequenosgruposmembros, membros } = require('../model');
const mensagemTemplate = require('../../views/template/mensagem.template');

class PequenosGruposMembros{

    getMembrosByPequenosGrupos( id ){
        let pequenosGruposArray = []
        return pequenosgruposmembros
            .findAll( {where:{ pequenosgrupoId: id }, include: [membros]} )
            .then( result => {
                // console.log(result);
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
       
        console.log(pg);

        this.removePequenosGruposMembros(pg.pequenosGruposMembros)
            .then( async () => {
                for (const k in pg) {
                    if ( parseInt(k) ) {
                        let pequenoGrupo = {}
                        pequenoGrupo.pequenosgrupoId = pg.pequenosGruposMembros 
                        pequenoGrupo.membroId        = k
                        await pequenosgruposmembros.create( pequenoGrupo )
                    }
                }
                return mensagemTemplate.tTipo('s');
            })
    }
}
module.exports = new PequenosGruposMembros();