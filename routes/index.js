const {
    moduloController,
    materiaController,
    licaoController,
    membroController,
    professorController,
    saladeaulaController,
    matriculaController,
    diadeaulaController,
    usuarioController,
    igrejaController,
    ebdrelatorios,
    gf_matriculasController,
    visitanteController,
    agendaController,
    pequenosGruposController,
    pequenosGruposMembrosController,
    pequenosGruposPresencaController,
} = require('./../app/controller');

module.exports = (router, passport) => {

    router.get('/admin', isLoggedIn, isAccessControl, function (req, res) {
        res.render('index', {access: req.user.id_tipo_membro})
    })

    router.get('/cadastros', isLoggedIn, isAccessControl, function (req, res) {
        res.render('cadastros');
    })

    // --------------------------Routes de Cadastros----------------------------- //

    router.get('/modulos-list', isLoggedIn, isAccessControl, function (req, res) {
        moduloController
            .getModulos()
            .then(( modulos ) => {
                res.render('modulos-list', {
                    modulos,
                    message: req.flash('modulos')
                });
            })
    });

    router.get('/modulos-edit/:id', isLoggedIn, isAccessControl, function (req, res) {
        moduloController
            .getModulo(req.params.id)
            .then(( modulo ) => {
                res.render('modulos-edit', {
                    modulo,
                    message: req.flash('modulos')
                });
            })
    });

    router.get('/modulos', isLoggedIn, isAccessControl, function (req, res) {

        res.render('modulos', {
            message: req.flash('modulos')
        });
    });

    router.post('/modulosgrupoensino', isLoggedIn, isAccessControl, function (req, res) {

        let modulos = []

        moduloController
            .getModulosByGrupoEnsino(req.body.tipo)
            .then((result) => { 
                if (result.length > 0) {
                    modulos.push(`<option value="">Escolha uma opção...</option>`);
                    result.forEach(modulo => {
                        modulos.push(`<option value="${modulo.id}">${modulo.modulo}</option>`);
                    })    
                }else{
                    modulos.push(`<option value="">Nenhum módulo cadastrado</option>`);
                }
                res.send(modulos);
            });
        
    });

    router.post('/modulos', isLoggedIn, isAccessControl, (req, res) => {

        moduloController
            .gravaModulo(req.body)
            .then((result) => {
                req.flash('modulos', [result.tipo, result.texto]);
                res.redirect('/modulos-list')
            });
    });

    router.get('/materias-list', isLoggedIn, isAccessControl, function (req, res) {
        materiaController
            .getMateriasModulos()
            .then((materias) => {
                console.log(materias);
                res.render('materias-list', {
                    materias,
                    message: req.flash('materias')
                })
            });
    })

    router.get('/materias-edit/:id', isLoggedIn, isAccessControl, function (req, res) {
        materiaController
            .getMateria(req.params.id)
            .then((materia) => {
                res.render('materias-edit', {
                    grupoensino: materia.modulo.grupoensino,
                    modulo: materia.modulo,
                    materia,
                    message: req.flash('materias')
                })
            });
    })

    router.get('/materias', isLoggedIn, isAccessControl, function (req, res) {
        moduloController
            .getModulosAtivos()
            .then(modulos => {
                res.render('materias', {
                    data: modulos,
                    message: req.flash('materias')
                })
            });
    })

    router.post('/materias', isLoggedIn, isAccessControl, (req, res) => {

        materiaController
            .gravaMateria(req.body)
            .then((result) => {
                req.flash('materias', [result.tipo, result.texto]);
                res.redirect('/materias-list');
            });
    })

    router.get('/licoes-list', isLoggedIn, isAccessControl, function (req, res) {

        licaoController
            .getLicoesMaterias()
            .then(licoes => {
                res.render('licoes-list', {
                    licoes,
                    message: req.flash('licoes')
                })
            })
    })

    router.get('/licoes-edit/:id', isLoggedIn, isAccessControl, function (req, res) {

        licaoController
            .getLicao(req.params.id)
            .then((licao) => {
                console.log(licao);
                materiaController
                    .getMateriasAtivas()
                    .then((materias) => {
                        console.log(materias);
                        res.render('licoes-edit', {
                            licao,
                            materias,
                            message: req.flash('materias')
                        })
                    })        
            });
    })


    router.get('/licoes', isLoggedIn, isAccessControl, function (req, res) {

        materiaController
            .getMaterias()
            .then(materias => {
                res.render('licoes', {
                    data: materias,
                    message: req.flash('licoes')
                })
            })
    })

    router.post('/licoes', isLoggedIn, isAccessControl, (req, res) => {

        licaoController
            .gravaLicao(req.body)
            .then((result) => {
                req.flash('licoes', [result.tipo, result.texto]);
                res.redirect('/licoes-list');
            });
    })

    router.get('/membros-edit/:id', isLoggedIn, isAccessControl, (req, res) => {
        
        let id = req.params.id;

        membroController
            .getMembro(id)
            .then((membro) => {

                let igrejas;

                igrejaController
                    .getAllIgrejas()
                    .then((resultIgrejas) => { igrejas = resultIgrejas; })
                    .then(() =>{
                        res.render('membros-edit',{
                            membro,
                            igrejas,
                            message: req.flash('membros-edit')
                        })
                    });
            })
    })

    router.get('/membros-list', isLoggedIn, isAccessControl, (req, res) => {

        membroController
            .getAllMembros()
            .then((membros) => {
                res.render('membros-list',{
                    data: membros,
                    message: req.flash('membros')
                })
            })
    })

    router.get('/membros', isLoggedIn, isAccessControl, (req, res) => {
    // router.get('/membros', (req, res) => {
        
        igrejaController
            .getAllIgrejas()
            .then(( igrejas ) => {
                res.render('membros', {
                    data: igrejas,
                    message: req.flash('membros')
                })
            })
    })

    router.post('/membros', isLoggedIn, isAccessControl, (req, res) => {
    // router.post('/membros', (req, res) => {
        membroController
            .gravaMembro(req.body)
            .then((result) => {
                req.flash('membros', [result.tipo, result.texto]);
                res.redirect('/membros-list');
            });
    })

    router.get('/professores', isLoggedIn, isAccessControl, (req, res) => {

        materiaController
            .getMaterias()
            .then(materias => {

                membroController
                    .getAllMembros()
                    .then(membros => {

                        let professores = {}
                        professores.materias = materias;
                        professores.membros = membros;
                        res.render('professores', {
                            data: professores,
                            message: req.flash('professores')
                        })
                    })
            })
    })

    router.post('/professores', isLoggedIn, isAccessControl, (req, res) => {

        professorController
            .gravaProfessor(req.body)
            .then((result) => {
                req.flash('professores', [result.tipo, result.texto]);
                res.redirect('/professores');
            });
    })

    router.get('/saladeaula', isLoggedIn, isAccessControl, (req, res) => {

        let saladeaula = {}
        let professoresArray = []
        let membrosArray = []

        materiaController
            .getMaterias()
            .then(materias => {

                professorController
                    .getProfessores()
                    .then(professores => {

                        membroController
                            .getAllMembros()
                            .then(membros => {

                                professores.forEach(professor => {
                                    membros.find(membro => {
                                        if (membro.id == professor.membroId) {
                                            membrosArray.push(membro);
                                        }
                                    })
                                });
                            })
                            .then(() => {
                                saladeaula.materias = materias;
                                saladeaula.professores = membrosArray;
                                res.render('saladeaula', {
                                    data: saladeaula,
                                    message: req.flash('saladeaula')
                                })
                            })
                    })
            })
    })

    router.post('/saladeaula', isLoggedIn, isAccessControl, (req, res) => {
        saladeaulaController
            .gravaSaladeaula(req.body)
            .then((result) => {
                req.flash('saladeaula', [result.tipo, result.texto]);
                res.redirect('/saladeaula');
            });
    })

    router.get('/matriculas', isLoggedIn, isAccessControl, (req, res) => {

        let matriculas = {};

        saladeaulaController
            .getAllSalasdeaula()
            .then(saladeaula => {

                matriculas.saladeaula = saladeaula;

                membroController
                    .getAllMembros()
                    .then(membros => {

                        matriculas.membros = membros;
                        res.render('matriculas', {
                            data: matriculas,
                            message: req.flash('matriculas')
                        })
                    })

            })
    })

    router.get('/matriculas/:sala', isLoggedIn, isAccessControl, (req, res) => {

        let matriculasArray = []
        let tpMembro = ''
        let content = []
        let sala = req.params.sala;

        if (sala > 0) {

            membroController
                .getAllMembros()
                .then(membros => {
                    
                    matriculaController
                    .getAllMatriculas()
                    .then(async matriculas => {
                        
                            await membros.forEach(membro => {

                                let matriculasRow = {};
                                if (membro.tipodemembro == '1') {
                                    tpMembro = 'Comungante';
                                } else if (membro.tipodemembro == '2') {
                                    tpMembro = 'Não Comungante';
                                } else {
                                    tpMembro = 'Congregado';
                                }
                                if (matriculas.length > 0) {

                                    if (matriculas.some(f => f.membroId == membro.id)) {
                                        matriculas.filter(matricula => {
                                            if (matricula.membroId == membro.id) {
                                                if (matricula.saladeaulaId == sala) {
                                                    matriculasRow.id = membro.id;
                                                    matriculasRow.nome = membro.nome;
                                                    matriculasRow.matriculado = "checked";
                                                    matriculasRow.value = 1;
                                                    matriculasRow.tipomembro = tpMembro;
                                                    matriculasArray.push(matriculasRow);
                                                }
                                            }
                                        })
                                    } else {
                                        matriculasRow.id = membro.id;
                                        matriculasRow.nome = membro.nome;
                                        matriculasRow.matriculado = "unchecked";
                                        matriculasRow.value = 0;
                                        matriculasRow.tipomembro = tpMembro;
                                        matriculasArray.push(matriculasRow);
                                    }
                                } else {
                                    matriculasRow.id = membro.id;
                                    matriculasRow.nome = membro.nome;
                                    matriculasRow.matriculado = "unchecked";
                                    matriculasRow.value = 0;
                                    matriculasRow.tipomembro = tpMembro;
                                    matriculasArray.push(matriculasRow);
                                }
                            })

                        })
                        .then(() => {
                            if (matriculasArray.length > 0) {
                                
                                matriculasArray.forEach(matriculas => {
                                    let template = `<tr>
                                        <td class="align-middle">
                                            ${matriculas.nome}
                                        </td>
                                        <td class="align-middle">
                                            ${matriculas.tipomembro}
                                        </td>
                                        <td class="align-middle">
                                            <label class="switch">
                                            <input type="checkbox" name="${matriculas.id}" ${matriculas.matriculado} value="${matriculas.value}">
                                            <span class="slider round"></span>
                                            </label>
                                        </td>
                                    </tr>`
                                    content.push(template);
                                });
                            }else{
                                let template = `<tr>
                                        <td colspan="3" class="align-middle text-center text-muted pb-0 mb-0">Não há matriculados na sala.</td>
                                    </tr>`
                                    content.push(template);
                            }
                            res.send(content);
                        });
                })
        } else {
            res.send("");
        }
    })

    router.post('/matriculas', isLoggedIn, isAccessControl, (req, res) => {
        if (req.body.saladeaulaId > 0) {

            matriculaController
                .gravaMatricula(req.body)
                .then((result) => {
                    req.flash('matriculas', [`alert alert-info alert-dismissible fade show`, `Dados gravados com sucesso!`]);
                    res.redirect('/matriculas');
                });
        } else {
            req.flash('matriculas', [`alert alert-danger alert-dismissible fade show`, `Selecione a sala de aula!s`]);
            res.redirect('/matriculas');
        }

    })

    router.get('/usuarios-list', isLoggedIn, isAccessControl, (req, res) => {
    // router.get('/usuarios-list', (req, res) => {
        usuarioController
            .getUsuarios()
            .then((usuarios) => {
                res.render('usuarios-list', {
                    usuarios,
                    message: req.flash('usuarios')
                });
            })
    })

    router.get('/usuarios', isLoggedIn, isAccessControl, (req, res) => {
    // router.get('/usuarios', (req, res) => {

        let membros = []

        membroController
            .getAllMembros()
            .then( async (membrosResult) => {

                let usuarios = await usuarioController.getUsuarios();

                membrosResult.forEach( membro => {
                    if (!usuarios.some((usuario) => (usuario.membroId == membro.id))){
                        membros.push(membro);
                    }  
                });
                res.render('usuarios', {
                    membros,
                    message: req.flash('usuarios')
                });
            })
    })

    router.get('/usuarios-edit/:id', isLoggedIn, isAccessControl, (req, res) => {

        usuarioController
            .getUsuario( req.params.id )
            .then( usuario => {
                res.render('usuarios-edit', {
                    usuario,
                    message: req.flash('usuarios')
                });
            })
    })

    router.post('/usuarios', isLoggedIn, isAccessControl, (req, res) => {
        usuarioController
            .gravarUsuario(req.body)
            .then((result) => {
                req.flash('usuarios', [result.tipo, result.texto]);
                res.redirect('/usuarios-list');
            });
    })

    router.get('/igrejas', isLoggedIn, isAccessControl, (req, res) => {
        res.render('igreja', {
            message: req.flash('igrejas')
        });
    })

    router.post('/igrejas', isLoggedIn, isAccessControl, (req, res) => {

        igrejaController
            .gravarIgreja(req.body)
            .then((result) => {
                req.flash('igrejas', [result.tipo, result.texto]);
                res.redirect('/igrejas');
            });
    })

    // ------------------------ Login Page ------------------------------//

    router.get('/login', (req, res) => {
        res.render('login', {
            message: req.flash('loginMessage')
        });
    })

    router.post('/login',
        passport.authenticate('local-login', {
            successRedirect: '/admin',
            failureRedirect: '/admin/login',
            failureFlash: true
        })
    );

    // ------------------- Escola Dominical Page ---------------------- -//

    router.get('/ebd', isLoggedIn, isAccessControl, function (req, res) {
        saladeaulaController
            .getAllSalasdeaula()
            .then(saladeaula => {
                res.render('ebd', {
                    data: saladeaula
                });
            });
    })

    router.get('/ebd/relatorios', (req, res) => {
        res.render(`ebd-relatorios`)
    })

    router.post('/visitantes', (req, res) => {
        visitanteController
            .gravaVisitante(req.body)
            .then((result) => {
                if (result) {
                    return res.status(200).json('ok');
                } else {
                    return res.status(403).json('ok');
                }
            })
    })

    router.get('/ebd/relatorios/presenca', (req, res) => {
        res.render(`ebd-presenca`, { dia: req.flash('dia')});
    })

    router.get('/ebd/relatorios/presenca/:diadeaula', (req, res) => {
        let dia = req.params.diadeaula;
        let content = [];
        ebdrelatorios
            .getPresencaSalasDia(dia)
            .then((relatorio_presenca) => {
                if (relatorio_presenca.length > 0) {
                    relatorio_presenca.forEach(rel_presenca => {
                        let template = `<tr>
                            <td>${rel_presenca.sala}</td>
                            <td class="text-center">${rel_presenca.pre}</td>
                            <td class="text-center">${rel_presenca.aus}</td>
                            <td class="text-center">${rel_presenca.vis}</td>
                            <td class="text-center">${rel_presenca.tot}</td>
                        </tr>`
                        content.push(template);
                    });
                }else{
                    let template = `<tr>
                        <td colspan="3" class="align-middle text-center text-muted pb-0 mb-0">Não há registro de presença.</td>
                    </tr>`
                    content.push(template);
                }
                res.send(content);  
            })
    })

    router.get('/ebd/relatorios/aniversariantes', (req, res) => {
        membroController
            .getAniversariantes()
            .then((aniversariantes) => {
                res.render(`ebd-aniversariantes`,{aniversariantes});
        })
    })

    router.get('/ebd/:sala', isLoggedIn, isAccessControl, function (req, res) {

        let sala = req.params.sala;
        let saladeaula = {}
        let matriculados = []

        matriculaController
            .getMatriculas(sala)
            .then(async matriculas => {

                membroController
                    .getAllMembros()
                    .then(async membros => {

                        await matriculas.forEach(matricula => {
                            membros.find(membro => {
                                if (membro.id == matricula.membroId) {
                                    matriculados.push(membro);
                                }
                            })
                        });

                        await saladeaulaController
                            .getSalasdeaula(sala)
                            .then(salaaula => {
                                saladeaula.saladeaulaId = salaaula.id;
                                saladeaula.sala = salaaula.saladeaula;
                                saladeaula.matriculados = matriculados;
                            });

                        await sleep(200);
                        res.render('aula', {
                            data: saladeaula,
                            message: req.flash('professores'),
                            dia: req.flash('dia')
                        })
                    })
            });
    })

    router.post('/diadeaula', isLoggedIn, isAccessControl, (req, res) => {
        diadeaulaController
            .gravarAlunosPresentes(req.body)
            .then(() => {
                req.flash('dia', req.body.diadeaula);
                res.redirect(`/ebd/${req.body.saladeaulaId}`)
            });
    })

    router.get('/diadeaula/:sala/:diadeaula', isLoggedIn, isAccessControl, (req, res) => {

        let sala = req.params.sala;
        let dia = req.params.diadeaula;
        let diadeaulaArray = []
        let alunosPresentes = []
        let tpMembro = ''
        let content = []

        matriculaController
            .getMatriculasAlunos(sala)
            .then( async matriculados => {
                if (matriculados.length > 0) {

                    alunosPresentes = await diadeaulaController
                        .getAllAlunosPresentes(sala, dia)
                        .then((alunos) => {return alunos;})

                    matriculados.forEach(aluno => {

                        let diadeaulaRow = {}

                        if (aluno.tipodemembro == '1') {
                            tpMembro = 'Comungante';
                        } else if (aluno.tipodemembro == '2') {
                            tpMembro = 'Não Comungante';
                        } else {
                            tpMembro = 'Congregado';
                        }
                        
                        diadeaulaRow.id           = aluno.id;
                        diadeaulaRow.nome         = aluno.nome;
                        diadeaulaRow.tipomembro   = tpMembro; 

                        if (alunosPresentes.some((presente) => { return presente.id_membro == aluno.id})){
                            diadeaulaRow.presente = 'checked';
                            diadeaulaRow.value    = '1';
                        } else {
                            diadeaulaRow.presente = 'unchecked';
                            diadeaulaRow.value    = '0';
                        }
                        
                        diadeaulaArray.push(diadeaulaRow);
                    });
                }
            })
            .then( async () => {

                if (diadeaulaArray.length > 0) {
                    let result = await diadeaulaArray.sortBy('nome');
                    result.forEach(diadeaula => {
                        let template = `<tr>
                            <td class="align-middle">
                                ${diadeaula.nome}
                            </td>
                            <td class="align-middle">
                                ${diadeaula.tipomembro}
                            </td>
                            <td class="align-middle">
                                <label class="switch">
                                    <input type="checkbox" name="${diadeaula.id}" ${diadeaula.presente} ${diadeaula.value}>
                                    <span class="slider round"></span>
                                </label>
                            </td>
                        </tr>`
                        content.push(template);
                    });    
                }else{
                    let template = `<tr>
                        <td colspan="3" class="align-middle text-center text-muted pb-0 mb-0">Não há alunos matriculados.</td>
                    </tr>`
                    content.push(template);
                }
                res.send(content);
            })
        })

    // ------------------------------------------------------------------//
    
    // ------------------- Geracao Futuro Page --------------------------//
    router.get('/geracao_futuro', isLoggedIn, isAccessControl, (req, res) => {
        licaoController
            .getLicoesByGrupoensino('GFU')
            .then(( licoes ) => {
                console.log(licoes);
                res.render(`geracao_futuro`, { licoes });
            });    
    })    

    router.post('/geracao_futuro/diadeaula', isLoggedIn, isAccessControl, (req, res) => {

        let content = [];
        gf_matriculasController
            .getGFMembrosMatriculados(req.body.licaoId, req.body.date)
            .then(( matriculados ) => {
                if (matriculados.length > 0) {
                    matriculados.forEach(membrosMatriculados => {

                    let template = `<tr>
                        <td class="align-middle">
                            ${membrosMatriculados.nome}
                        </td>
                        <td class="align-middle">
                            <label class="switch">
                                <input type="checkbox" name="${membrosMatriculados.id}" ${membrosMatriculados.presente}>
                                <span class="slider round"></span>
                            </label>
                        </td>
                    </tr>`
                        content.push(template);
                    });    
                }else{
                    let template = `<tr>
                        <td colspan="3" class="align-middle text-center text-muted pb-0 mb-0">Não há alunos matriculados.</td>
                    </tr>`
                    content.push(template);
                }
                res.send(content);    
            })
    })

    router.get('/gf_matriculas', isLoggedIn, isAccessControl, (req, res) => {

        let membros = []
        membroController
            .getAllMembros()
            .then( async (membrosResult) => {

                gf_matriculasController
                    .getGFMatriculas()
                    .then( async (gf_matriculados) => {

                        await membrosResult.forEach( membro => {

                            let membros_aux  = {}
                            membros_aux.id   = membro.id
                            membros_aux.nome = membro.nome

                            if (gf_matriculados.some(gf => gf.membroId == membro.id)) {
                                membros_aux.matriculado = "checked";
                            }else{
                                membros_aux.matriculado = "unchecked";
                            }
                            membros.push(membros_aux);
                        });
                    })
                    .then(() =>{
                        res.render('gf_matriculas', {
                            membros,
                            message: req.flash('matriculas_gf')
                        })
                    })
            })
    })

    router.post('/gf_matriculas', isLoggedIn, isAccessControl, (req, res) => {
        gf_matriculasController
            .gravaGFMatricula()
            .then(() => {
                res.redirect(`gf_matriculas`);
            })
    })    
    // ------------------------------------------------------------------//
    
    router.get('/agenda', isLoggedIn, isAccessControl, (req, res) => {
        agendaController
            .getAgendas()
            .then((agenda) => {
                res.render('agenda', {
                    agenda: agenda
                })
            })
    })

    router.post('/agenda', isLoggedIn, isAccessControl, (req, res) => {
        agendaController
            .gravaAgenda(req.body)
            .then(agenda => {
                res.render('agenda', {
                    agenda: ""
                })
            })
    })
    // ------------------------------------------------------------------//
    // ------------------- Pequenos Grupos ------------------------------//
    router.get('/pequenosgrupos-list', (req, res) => {
        pequenosGruposController
            .getAllPequenosGrupos()
            .then( pequenosgrupos => {
                res.render( 'pequenosgrupos-list' , { 
                    pequenosgrupos,
                    message: req.flash('modulos')
                });
            })
    })

    router.get('/pequenosgrupos', (req, res) => {
        res.render( 'pequenosgrupos' )
    })

    router.post('/pequenosgrupos',(req, res) => {
        pequenosGruposController
            .gravaPequenosGrupos(req.body)
            .then((result) => {
                req.flash('pequenosgrupos', [result.tipo, result.texto]);
                res.redirect('/pequenosgrupos-list')
            });
    })

    router.get('/pequenosgrupos_', (req, res) => {
        pequenosGruposController
            .getAllPequenosGrupos()
            .then( pequenosgrupos => {
                res.render( 'pequenosgrupos_btn' , { 
                    pequenosgrupos,
                    message: req.flash('pequenosgrupos-btn')
                });
            })
    })

    router.get('/pequenosgrupos-membros/:id', async (req, res) => {
        
        let content = [];
        let pequenosGruposMembos = await pequenosGruposMembrosController.getMembrosByPequenosGrupos(req.params.id)
        let pequenosGruposMembosAusentes = await pequenosGruposMembrosController.getMembrosOutPequenosGrupos()
        
        pequenosGruposMembos.forEach( PGMatriculados => {
            let template = `<tr>
                <td class="align-middle">
                    ${PGMatriculados.membro.nome}
                </td>
                <td class="align-middle" style="text-align:center;">
                    <label class="switch">
                        <input type="checkbox" name="${PGMatriculados.membro.id}" checked>
                        <span class="slider round"></span>
                    </label>
                </td>
            </tr>`
                content.push(template);
            })

            pequenosGruposMembosAusentes.forEach( PGMatriculadosAusente => {     
                let template = `<tr>
                    <td class="align-middle">
                        ${PGMatriculadosAusente.nome}
                    </td>
                    <td class="align-middle" style="text-align:center;">
                        <label class="switch">
                            <input type="checkbox" name="${PGMatriculadosAusente.id}" unchecked>
                            <span class="slider round"></span>
                        </label>
                    </td>
                </tr>`
                content.push(template);
            })
            res.send(content);
    })

    router.get('/pequenosgrupos/:id', (req, res) => {
        pequenosGruposController
            .getPequenoGrupo(req.params.id)
            .then( pequenoGrupo => {
                res.render( 'pequenosgrupos-aula', {
                    pequenoGrupo
                });
            })
    })

    router.get('/pequenosgrupos/:id/:data', (req, res) => {
        
        let content = [];

        pequenosGruposPresencaController
            .getMembrosPequenosGrupoPresenca(req.params.id, req.params.data)
            .then( async pequenosGruposPresenca => {

                let pequenosGruposMembros = await pequenosGruposMembrosController.getMembrosByPequenosGrupos(req.params.id);

                if ( pequenosGruposPresenca.length > 0 ) {

                    await pequenosGruposPresenca.forEach( PGMatriculados => {

                        let presente = ""
                        if (pequenosGruposMembros.some(pgm => pgm.membroId == PGMatriculados.membroId)) {
                            presente = "checked";
                        }else{
                            presente = "unchecked";
                        }
                        
                        let template = `<tr>
                            <td class="align-middle">
                                ${PGMatriculados.nome}
                            </td>
                            <td class="align-middle" style="text-align:center;">
                                <label class="switch">
                                    <input type="checkbox" name="${PGMatriculados.membroId}" checked>
                                    <span class="slider round"></span>
                                </label>
                            </td>
                        </tr>`
                            content.push(template);
                    });    
                }

            }).then( async () => {

                pequenosGruposPresencaController
                    .getMembrosPequenosGrupoPresenca(req.params.id, req.params.data)
                    .then( async pequenosGruposPresenca => {
                        if ( pequenosGruposPresenca.length > 0 ) {
        
                            await pequenosGruposPresenca.forEach( PGMatriculados => {
        
                            let template = `<tr>
                                <td class="align-middle">
                                    ${PGMatriculados.nome}
                                </td>
                                <td class="align-middle" style="text-align:center;">
                                    <label class="switch">
                                        <input type="checkbox" name="${PGMatriculados.membroId}" checked>
                                        <span class="slider round"></span>
                                    </label>
                                </td>
                            </tr>`
                                content.push(template);
                            });    
                        }
                    })
                
            }).then( async () => {
                res.send(content);
            })    

        // let content = [];
        // pequenosGruposMembrosController
        //     .getMembrosByPequenosGrupos(req.params.id)
        //     .then( async pequenosGruposMembos => {

        //         if (pequenosGruposMembos.length > 0) {
        //             await pequenosGruposMembos.forEach( PGMatriculados => {

        //             let template = `<tr>
        //                 <td class="align-middle">
        //                     ${PGMatriculados.membro.nome}
        //                 </td>
        //                 <td class="align-middle" style="text-align:center;">
        //                     <label class="switch">
        //                         <input type="checkbox" name="${PGMatriculados.membro.id}" checked>
        //                         <span class="slider round"></span>
        //                     </label>
        //                 </td>
        //             </tr>`
        //                 content.push(template);
        //             });    
        //         }
        //     })
        //     .then( async () => {
        //         res.send(content);
            // })    
    })


    router.get('/pequenosgrupos-membros', (req, res) => {

        pequenosGruposController
            .getAllPequenosGrupos()
            .then( pequenosgrupos => {

                // membroController
                //     .getAllMembros()
                //     .then( membros => {

                        res.render( 'pequenosgrupos_membros' , { 
                            pequenosgrupos,
                            // membros,
                            message: req.flash('pequenosgrupos-membros')
                        });

                    // })

            })
    })

    router.post('/pequenosgrupos-membros', (req, res) => {

        // console.log(req.body);
        pequenosGruposMembrosController
            .gravaPequenosGruposMembros(req.body)
            .then( pequenosgrupos => {

                console.log(pequenosgrupos);
        //         // membroController
        //         //     .getAllMembros()
        //         //     .then( membros => {

        //                 res.render( 'pequenosgrupos_membros' , { 
        //                     pequenosgrupos,
        //                     // membros,
        //                     message: req.flash('pequenosgrupos-membros')
        //                 });

        //             // })

            })
    })

    router.get('/dadosPequenosGruposMembros', (req, res) => {
        pequenosGruposController
            .getAllPequenosGrupos()
            .then( pequenosgrupos => {

                membroController
                    .getAllMembros()
                    .then( membros => {

                        res.render( 'pequenosgrupos_membros' , { 
                            pequenosgrupos,
                            membros,
                            message: req.flash('pequenosgrupos-membros')
                        });

                    })

            })
    })
    // ------------------------------------------------------------------//

    router.get('/401', isLoggedIn, (req, res) => {
        res.render('401')
    });
}

Array.prototype.sortBy = async function(p) {
    return this.slice(0).sort(function(a,b) {
        return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
    });
}

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}

function isAccessControl(req, res, next) {

    const path = req.route.path;
    const ac = require('./../config/accessControl.json')[req.user.id_tipo_membro]
    if (ac.includes(path))
        return next();

    res.redirect('/401')    
}