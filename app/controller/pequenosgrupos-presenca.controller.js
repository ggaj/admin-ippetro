const { pequenosgrupospresenca, membros } = require('../model');

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
                    pequenosGruposPresencaArray.push( pgpresenca)
                }); 
                return pequenosGruposPresencaArray;
            });
    }
}
module.exports = new PequenosGruposPresenca();