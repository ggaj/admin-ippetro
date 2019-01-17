class MensagemTemplate{

    // tMensagem(tipo){
    //     return `
    //     <div class="col-md-12 mt-3">
    //         <div class="alert alert-danger alert-dismissible fade show" role="alert">
    //             <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    //                 <span aria-hidden="true">&times;</span>
    //             </button>
    //             <strong>Falha!</strong> CPF e/ou senha incorretos.
    //         </div>
    //     </div>`;
    // }

    tMensagem(tipo){

        let mensagem = this.tTipo(tipo);

        return `    
            <div class="col-md-12 mt-3">
                ${mensagem.tipo}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    ${mensagem.texto}
                </div>
            </div>
        `;
    }

    tTipo(tipo){
        
        let mensagem = {}

        switch (tipo) {
            case `e`:
                mensagem.tipo   = `alert alert-danger alert-dismissible fade show`;
                mensagem.texto  = `Falha ao gravar os dados!`;
                return mensagem;
            case `s`:
                mensagem.tipo   = `alert alert-info alert-dismissible fade show`;
                mensagem.texto  = `Dados gravados com sucesso!`;
                return mensagem;
        }
    }

}

module.exports = new MensagemTemplate();