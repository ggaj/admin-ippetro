const { pequenosgrupospresenca, membros } = require('../model')
const mensagemTemplate                    = require('./../../views/template/mensagem.template')
const pequenosGruposMembrosController     = require('./pequenosgrupos-membros.controller');

class PequenosGruposPresenca{

    getMembrosPequenosGrupoPresenca( id, data ){
        let pequenosGruposPresencaArray = []
        return pequenosgrupospresenca
            .findAll( { where:{ pequenosgrupoId: id , data}, include: [membros]} )
            .then( result => {

                result.forEach( pequenogrupo => {
                    let pgpresenca = {}
                    pgpresenca.pequenosgrupoId  = pequenogrupo.dataValues.pequenosgrupoId
                    pgpresenca.nome             = pequenogrupo.dataValues.membro.nome
                    pgpresenca.membroId         = pequenogrupo.membroId
                    pgpresenca.registro         = pequenogrupo.registro == 'P' ? 'checked' : 'uncheked'
                    pequenosGruposPresencaArray.push( pgpresenca)
                }); 
                return pequenosGruposPresencaArray;
            });
    }

    removePequenosGrupoPresenca(id, data){
        return pequenosgrupospresenca.destroy({
            where: {
                pequenosGrupoId: id,
                data 
            }
        });
    }

    async gravaPequenosGrupoPresenca(pg){

        let registro = '', template = {}
        let membrosPG = await pequenosGruposMembrosController.getMembrosByPequenosGrupos(pg.pequenosgrupoId)
        
        this.removePequenosGrupoPresenca(pg.pequenosgrupoId, pg.data)
            .then( async () => {

                membrosPG.forEach( membro => {
                    registro = 'A'

                    let chamada = {}
                    
                    for (const k in pg) {
                        if (k == membro.membroId) {
                            registro = 'P'
                        }
                    }
                    chamada.data            = pg.data 
                    chamada.registro        = registro
                    chamada.pequenosgrupoId = pg.pequenosgrupoId
                    chamada.membroId        = membro.membroId
            
                    pequenosgrupospresenca.create(chamada)
                })
            })
            .then( () => {
                return mensagemTemplate.tTipo('s');
            });
    }
}

module.exports = new PequenosGruposPresenca();