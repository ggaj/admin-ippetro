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
} = require('./../app/controller');

module.exports = (router, passport) => {

    router.get('/', isLoggedIn, function (req, res) {
        res.render('index')
    })

    router.get('/cadastros', isLoggedIn, function (req, res) {
        res.render('cadastros');
    })

    // --------------------------Routes de Cadastros----------------------------- //

    router.get('/modulos-list', isLoggedIn, function (req, res) {
        moduloController
            .getModulos()
            .then(( modulos ) => {
                res.render('modulos-list', {
                    modulos,
                    message: req.flash('modulos')
                });
            })
    });

    router.get('/modulos-edit/:id', isLoggedIn, function (req, res) {
        moduloController
            .getModulo(req.params.id)
            .then(( modulo ) => {
                res.render('modulos-edit', {
                    modulo,
                    message: req.flash('modulos')
                });
            })
    });

    router.get('/modulos', isLoggedIn, function (req, res) {

        res.render('modulos', {
            message: req.flash('modulos')
        });
    });

    router.post('/modulos', isLoggedIn, (req, res) => {

        moduloController
            .gravaModulo(req.body)
            .then((result) => {
                req.flash('modulos', [result.tipo, result.texto]);
                res.redirect('/modulos-list')
            });
    });

    router.get('/materias-list', isLoggedIn, function (req, res) {
        materiaController
            .getMateriasModulos()
            .then((materias) => {
                res.render('materias-list', {
                    materias,
                    message: req.flash('materias')
                })
            });
    })

    router.get('/materias-edit/:id', isLoggedIn, function (req, res) {
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

    router.get('/materias', isLoggedIn, function (req, res) {
        moduloController
            .getModulosAtivos()
            .then(modulos => {
                res.render('materias', {
                    data: modulos,
                    message: req.flash('materias')
                })
            });
    })

    router.post('/materias', isLoggedIn, (req, res) => {

        materiaController
            .gravaMateria(req.body)
            .then((result) => {
                req.flash('materias', [result.tipo, result.texto]);
                res.redirect('/materias');
            });
    })

    router.get('/licoes', isLoggedIn, function (req, res) {

        materiaController
            .getMaterias()
            .then(materias => {
                res.render('licoes', {
                    data: materias,
                    message: req.flash('licoes')
                })
            })
    })

    router.post('/licoes', isLoggedIn, (req, res) => {

        licaoController
            .gravaLicao(req.body)
            .then((result) => {
                req.flash('licoes', [result.tipo, result.texto]);
                res.redirect('/licoes');
            });
    })

    router.get('/membros-edit/:id', isLoggedIn, (req, res) => {
        
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

    router.get('/membros-list', isLoggedIn, (req, res) => {

        membroController
            .getAllMembros()
            .then((membros) => {
                res.render('membros-list',{
                    data: membros,
                    message: req.flash('membros')
                })
            })
    })

    router.get('/membros', isLoggedIn, (req, res) => {
        
        igrejaController
            .getAllIgrejas()
            .then(( igrejas ) => {
                res.render('membros', {
                    data: igrejas,
                    message: req.flash('membros')
                })
            })
    })

    router.post('/membros', isLoggedIn, (req, res) => {
        membroController
            .gravaMembro(req.body)
            .then((result) => {
                req.flash('membros', [result.tipo, result.texto]);
                res.redirect('/membros-list');
            });
    })

    router.get('/professores', isLoggedIn, (req, res) => {

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

    router.post('/professores', isLoggedIn, (req, res) => {

        professorController
            .gravaProfessor(req.body)
            .then((result) => {
                req.flash('professores', [result.tipo, result.texto]);
                res.redirect('/professores');
            });
    })

    router.get('/saladeaula', isLoggedIn, (req, res) => {

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

    router.post('/saladeaula', isLoggedIn, (req, res) => {
        saladeaulaController
            .gravaSaladeaula(req.body)
            .then((result) => {
                req.flash('saladeaula', [result.tipo, result.texto]);
                res.redirect('/saladeaula');
            });
    })

    router.get('/matriculas', isLoggedIn, (req, res) => {

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

    router.get('/matriculas/:sala', isLoggedIn, (req, res) => {

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

    router.post('/matriculas', isLoggedIn, (req, res) => {
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

    router.get('/usuarios', isLoggedIn, (req, res) => {

        membroController
            .getAllMembros()
            .then(membros => {
                res.render('usuarios', {
                    data: membros,
                    message: req.flash('usuarios')
                });
            })
    })

    router.post('/usuarios', isLoggedIn, (req, res) => {

        usuarioController
            .gravarUsuario(req.body)
            .then((result) => {
                req.flash('usuarios', [result.tipo, result.texto]);
                res.redirect('/usuarios');
            });
    })

    router.get('/igrejas', isLoggedIn, (req, res) => {
        res.render('igreja', {
            message: req.flash('igrejas')
        });
    })

    router.post('/igrejas', isLoggedIn, (req, res) => {

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
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        })
    );

    // ------------------- Escola Dominical Page ---------------------- -//

    router.get('/ebd', isLoggedIn, function (req, res) {
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

    router.get('/ebd/relatorios/presenca', (req, res) => {
        let data = new Date();
        ebdrelatorios
            .getPresencaSalasDia(data)
            .then((presenca) => {
                console.log(presenca);
            })
        res.render(`ebd-presenca`);
    })

    router.get('/ebd/relatorios/aniversariantes', (req, res) => {
        membroController
            .getAniversariantes()
            .then((aniversariantes) => {
                res.render(`ebd-aniversariantes`,{aniversariantes});
        })
    })

    router.get('/ebd/:sala', isLoggedIn, function (req, res) {

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

    router.post('/diadeaula', isLoggedIn, (req, res) => {
        diadeaulaController
            .gravarAlunosPresentes(req.body)
            .then(() => {
                req.flash('dia', req.body.diadeaula);
                res.redirect(`/ebd/${req.body.saladeaulaId}`)
            });
    })

    router.get('/diadeaula/:sala/:diadeaula', isLoggedIn, (req, res) => {

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
            .then(() => {

                if (diadeaulaArray.length > 0) {
                    diadeaulaArray.forEach(diadeaula => {
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




































    // router.post('/signup', function(req, res, next) {
    //     , (err, user, info) => {
    //         if (err) { return next(err); }
    //         if (!user) { return res.redirect('/login'); }
    //         return res.redirect('/');
    //     })(req, res, next);
    // });



    router.get('/usuarios', isLoggedIn, (req, res) => {

        membroController
            .getAllMembros()
            .then(membros => {
                res.render('usuarios', {
                    data: membros
                });
            })
    })

    // router.get('/signup', (req, res) => {
    //     // res.render('signup', { message: req.flash('signupMessage') });
    // })

    // router.post('/signup', function (req, res, next) {
    //     passport.authenticate('local-signup', (err, user, info) => {
    //         if (err) {
    //             return next(err);
    //         }
    //         if (!user) {
    //             return res.redirect('/login');
    //         }
    //         return res.redirect('/');
    //     })(req, res, next);
    // });
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