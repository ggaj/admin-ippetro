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
    visitanteController
} = require('./../app/controller');

module.exports = (router, passport) => {

    // router.get('/', isLoggedIn, isAccessControl, function (req, res) {
    router.get('/', function (req, res) {
        res.render('index', {access: req.user.id_tipo_membro})
    })

    router.get('/admin/cadastros', isLoggedIn, isAccessControl, function (req, res) {
        res.render('cadastros');
    })

    // --------------------------Routes de Cadastros----------------------------- //

    router.get('/admin/modulos-list', isLoggedIn, isAccessControl, function (req, res) {
        moduloController
            .getModulos()
            .then(( modulos ) => {
                res.render('modulos-list', {
                    modulos,
                    message: req.flash('modulos')
                });
            })
    });

    router.get('/admin/modulos-edit/:id', isLoggedIn, isAccessControl, function (req, res) {
        moduloController
            .getModulo(req.params.id)
            .then(( modulo ) => {
                res.render('modulos-edit', {
                    modulo,
                    message: req.flash('modulos')
                });
            })
    });

    router.get('/admin/modulos', isLoggedIn, isAccessControl, function (req, res) {

        res.render('modulos', {
            message: req.flash('modulos')
        });
    });

    router.get('/admin/modulosgrupoensino', isLoggedIn, isAccessControl, function (req, res) {

        // moduloController
        //     .
    });

    router.post('/admin/modulos', isLoggedIn, isAccessControl, (req, res) => {

        moduloController
            .gravaModulo(req.body)
            .then((result) => {
                req.flash('modulos', [result.tipo, result.texto]);
                res.redirect('/admin/modulos-list')
            });
    });

    router.get('/admin/materias-list', isLoggedIn, isAccessControl, function (req, res) {
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

    router.get('/admin/materias-edit/:id', isLoggedIn, isAccessControl, function (req, res) {
        materiaController
            .getMateria(req.params.id)
            .then((materia) => {

                moduloController
                    .getModulosAtivos()
                    .then((modulos) => {
                        res.render('materias-edit', {
                            modulos,
                            materia,
                            message: req.flash('materias')
                        })
                    })

            });
    })

    router.get('/admin/materias', isLoggedIn, isAccessControl, function (req, res) {
        moduloController
            .getModulosAtivos()
            .then(modulos => {
                res.render('materias', {
                    data: modulos,
                    message: req.flash('materias')
                })
            });
    })

    router.post('/admin/materias', isLoggedIn, isAccessControl, (req, res) => {

        materiaController
            .gravaMateria(req.body)
            .then((result) => {
                req.flash('materias', [result.tipo, result.texto]);
                res.redirect('/admin/materias-list');
            });
    })

    router.get('/admin/licoes-list', isLoggedIn, isAccessControl, function (req, res) {

        licaoController
            .getLicoesMaterias()
            .then(licoes => {
                res.render('licoes-list', {
                    licoes,
                    message: req.flash('licoes')
                })
            })
    })

    router.get('/admin/licoes-edit/:id', isLoggedIn, isAccessControl, function (req, res) {

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


    router.get('/admin/licoes', isLoggedIn, isAccessControl, function (req, res) {

        materiaController
            .getMaterias()
            .then(materias => {
                res.render('licoes', {
                    data: materias,
                    message: req.flash('licoes')
                })
            })
    })

    router.post('/admin/licoes', isLoggedIn, isAccessControl, (req, res) => {

        licaoController
            .gravaLicao(req.body)
            .then((result) => {
                req.flash('licoes', [result.tipo, result.texto]);
                res.redirect('/admin/licoes-list');
            });
    })

    router.get('/admin/membros-edit/:id', isLoggedIn, isAccessControl, (req, res) => {
        
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

    router.get('/admin/membros-list', isLoggedIn, isAccessControl, (req, res) => {

        membroController
            .getAllMembros()
            .then((membros) => {
                res.render('membros-list',{
                    data: membros,
                    message: req.flash('membros')
                })
            })
    })

    router.get('/admin/membros', isLoggedIn, isAccessControl, (req, res) => {
    // router.get('/admin/membros', (req, res) => {
        
        igrejaController
            .getAllIgrejas()
            .then(( igrejas ) => {
                res.render('membros', {
                    data: igrejas,
                    message: req.flash('membros')
                })
            })
    })

    router.post('/admin/membros', isLoggedIn, isAccessControl, (req, res) => {
    // router.post('/admin/membros', (req, res) => {
        membroController
            .gravaMembro(req.body)
            .then((result) => {
                req.flash('membros', [result.tipo, result.texto]);
                res.redirect('/admin/membros-list');
            });
    })

    router.get('/admin/professores', isLoggedIn, isAccessControl, (req, res) => {

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

    router.post('/admin/professores', isLoggedIn, isAccessControl, (req, res) => {

        professorController
            .gravaProfessor(req.body)
            .then((result) => {
                req.flash('professores', [result.tipo, result.texto]);
                res.redirect('/admin/professores');
            });
    })

    router.get('/admin/saladeaula', isLoggedIn, isAccessControl, (req, res) => {

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

    router.post('/admin/saladeaula', isLoggedIn, isAccessControl, (req, res) => {
        saladeaulaController
            .gravaSaladeaula(req.body)
            .then((result) => {
                req.flash('saladeaula', [result.tipo, result.texto]);
                res.redirect('/admin/saladeaula');
            });
    })

    router.get('/admin/matriculas', isLoggedIn, isAccessControl, (req, res) => {

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

    router.get('/admin/matriculas/:sala', isLoggedIn, isAccessControl, (req, res) => {

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
                                            <input type="checkbox" name="${matriculas.id}" data-user="${matriculas.id}" id="${matriculas.id}" ${matriculas.matriculado}>
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

    router.post('/admin/matriculas', isLoggedIn, isAccessControl, (req, res) => {
        if (req.body.saladeaulaId > 0) {

            matriculaController
                .gravaMatricula(req.body)
                .then((result) => {
                    req.flash('matriculas', [`alert alert-info alert-dismissible fade show`, `Dados gravados com sucesso!`]);
                    res.redirect('/admin/matriculas');
                });
        } else {
            req.flash('matriculas', [`alert alert-danger alert-dismissible fade show`, `Selecione a sala de aula!s`]);
            res.redirect('/admin/matriculas');
        }

    })

    router.get('/admin/usuarios-list', isLoggedIn, isAccessControl, (req, res) => {
    // router.get('/admin/usuarios-list', (req, res) => {
        usuarioController
            .getUsuarios()
            .then((usuarios) => {
                res.render('usuarios-list', {
                    usuarios,
                    message: req.flash('usuarios')
                });
            })
    })

    router.get('/admin/usuarios', isLoggedIn, isAccessControl, (req, res) => {
    // router.get('/admin/usuarios', (req, res) => {

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

    router.get('/admin/usuarios-edit/:id', isLoggedIn, isAccessControl, (req, res) => {

        usuarioController
            .getUsuario( req.params.id )
            .then( usuario => {
                res.render('usuarios-edit', {
                    usuario,
                    message: req.flash('usuarios')
                });
            })
    })

    router.post('/admin/usuarios', isLoggedIn, isAccessControl, (req, res) => {
        usuarioController
            .gravarUsuario(req.body)
            .then((result) => {
                req.flash('usuarios', [result.tipo, result.texto]);
                res.redirect('/admin/usuarios-list');
            });
    })

    router.get('/admin/igrejas', isLoggedIn, isAccessControl, (req, res) => {
        res.render('igreja', {
            message: req.flash('igrejas')
        });
    })

    router.post('/admin/igrejas', isLoggedIn, isAccessControl, (req, res) => {

        igrejaController
            .gravarIgreja(req.body)
            .then((result) => {
                req.flash('igrejas', [result.tipo, result.texto]);
                res.redirect('/admin/igrejas');
            });
    })

    // ------------------------ Login Page ------------------------------//

    router.get('/admin/login', (req, res) => {
        res.render('login', {
            message: req.flash('loginMessage')
        });
    })

    router.post('/admin/login',
        passport.authenticate('local-login', {
            successRedirect: '/admin',
            failureRedirect: '/admin/login',
            failureFlash: true
        })
    );

    // ------------------- Escola Dominical Page ---------------------- -//

    router.get('/admin/ebd', isLoggedIn, isAccessControl, function (req, res) {
        saladeaulaController
            .getAllSalasdeaula()
            .then(saladeaula => {
                res.render('ebd', {
                    data: saladeaula
                });
            });
    })

    router.get('/admin/ebd/relatorios', (req, res) => {
        res.render(`ebd-relatorios`)
    })

    router.post('/admin/visitantes', (req, res) => {
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

    router.get('/admin/ebd/relatorios/presenca', (req, res) => {
        let data = new Date();
        ebdrelatorios
            .getPresencaSalasDia(data)
            .then((relatorio_presenca) => {
                res.render(`ebd-presenca`, { relatorio_presenca, dia: req.flash('dia') });
            })
    })

    router.get('/admin/ebd/relatorios/aniversariantes', (req, res) => {
        membroController
            .getAniversariantes()
            .then((aniversariantes) => {
                res.render(`ebd-aniversariantes`,{aniversariantes});
        })
    })

    router.get('/admin/ebd/:sala', isLoggedIn, isAccessControl, function (req, res) {

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

    router.post('/admin/diadeaula', isLoggedIn, isAccessControl, (req, res) => {
        diadeaulaController
            .gravarAlunosPresentes(req.body)
            .then(() => {
                req.flash('dia', req.body.diadeaula);
                res.redirect(`/admin/ebd/${req.body.saladeaulaId}`)
            });
    })

    router.get('/admin/diadeaula/:sala/:diadeaula', isLoggedIn, isAccessControl, (req, res) => {

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
                        } else {
                            diadeaulaRow.presente = 'unchecked';
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
                                    <input type="checkbox" name="${diadeaula.id}" id="${diadeaula.id}" ${diadeaula.presente}>
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
    router.get('/admin/geracao_futuro', isLoggedIn, isAccessControl, (req, res) => {
        res.render(`geracao_futuro`);
    })    

    router.get('/admin/gf_matriculas', isLoggedIn, isAccessControl, (req, res) => {

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

    router.post('/admin/gf_matriculas', isLoggedIn, isAccessControl, (req, res) => {
        gf_matriculasController
            .gravaGFMatricula(req.body)
            .then(() => {
                res.redirect(`gf_matriculas`);
            })
    })    
    // ------------------------------------------------------------------//

    router.get('/admin/401', isLoggedIn, (req, res) => {
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

    res.redirect('/admin/login');
}

function isAccessControl(req, res, next) {

    const path = req.route.path;
    const ac = require('./../config/accessControl.json')[req.user.id_tipo_membro]
    if (ac.includes(path))
        return next();

    res.redirect('/admin/401')    
}