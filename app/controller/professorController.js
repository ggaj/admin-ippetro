const { professores, membros } = require('./../model');
const mensagemTemplate = require('./../../views/template/mensagem.template');

class ProfessorController{
    
    getProfessores(){
        
        let professoresArrayAux = []
        let professoresArray = []
        // return new Promise((resolve, reject) => {

        return professores
            .findAll({
                distinct: 'id_membro'
            })
            .then( result => {
                console.log('0');
                result.forEach( professor => {
                    
                    // membros
                    //     .findByPk(professor.dataValues.id)
                    //     .then( membro => {
                    //         console.log(membro.dataValues);
                    //         professoresArray.push(membro);
                    //     })

                    //                 .then(
                    professoresArray.push(professor.dataValues)
                });
                return professoresArray;
                // console.log("1")
                // return professoresArrayAux;
            })
            // .then(() =>{
            //      console.log("2");
            //     console.log(professoresArray);
            //     return professoresArray;
            // })
            // .then(() => {

            //     professoresArrayAux
            //         .forEach( professor => {
            //             membros
            //                 .findByPk(professor.id)
            //                 .then( membro => {
            //                     // console.log(membro.dataValues);
            //                     professoresArray.push(membro.dataValues);
            //                 });
            //                 // .then(() => { 
            //                 //     // console.log(professoresArray);
            //                 //     return professoresArray;
            //                 // });
            //         });
            // })
            // .then(() => {
            // // //     // console.log(professoresArray); 
            //     return professoresArray;
            // })
            ;
        // })
    }

    gravaProfessor(professor){

        let tipo;
        let template = {}

        return professores
            .create(professor)
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

module.exports = new ProfessorController();