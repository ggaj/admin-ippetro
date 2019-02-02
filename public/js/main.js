$(function () {
    $("#btnLogin").click(function () {
        let dados = $('#formLogin').serialize();
        console.log(dados);
        $.ajax({
            type: 'POST',
            url: '/admin/login',
            data: dados,
            dataType: "json",
            success: ((result) => {
                console.log(result);
                if (result.status) {
                    window.location.href = window.location.origin;
                } else {
                    $("#msg").fadeIn("slow");
                }
            }),
            error: ((e) => {
                console.log(`Error -> ${JSON.stringify(e)}`)
            })
        });
    });

    $('#btnModulo').click((e) => {

        validatedForm(e)
            .then((result) => {

                if (result) {
                    let dados = $('#formModulo').serialize();
                    $.ajax({
                        type: 'POST',
                        url: '/admin/modulos/gravar',
                        data: dados,
                        dataType: "json",
                        success: ((result) => {

                            limpaDados();
                            mensagemRetorno("#msg", result.mensagem);

                        }),
                        error: ((e) => {
                            console.log(`Error -> ${e}`)
                        })
                    });
                }
            })
    })

    $('#btnMateria').click((e) => {

        validatedForm(e)
            .then((result) => {

                if (result) {
                    let dados = $('#formMateria').serialize();
                    // console.log(dados);
                    $.ajax({
                        type: 'POST',
                        url: '/admin/materias/gravar',
                        data: dados,
                        dataType: "json",
                        success: ((result) => {

                            limpaDados();
                            mensagemRetorno("#msg", result.mensagem);

                        }),
                        error: ((e) => {
                            console.log(`Error -> ${JSON.stringify(e)}`)
                        })
                    });
                }
            })
    })

    $('#btnLicao').click((e) => {

        validatedForm(e)
            .then((result) => {

                if (result) {
                    let dados = $('#formLicao').serialize();
                    // console.log(dados);
                    $.ajax({
                        type: 'POST',
                        url: '/admin/licoes/gravar',
                        data: dados,
                        dataType: "json",
                        success: ((result) => {

                            limpaDados();
                            mensagemRetorno("#msg", result.mensagem);

                        }),
                        error: ((e) => {
                            console.log(`Error -> ${JSON.stringify(e)}`)
                        })
                    });
                }
            })
    })

    $('#btnMembro').click((e) => {

        validatedForm(e)
            .then((result) => {

                if (result) {
                    let dados = $('#formMembro').serialize();
                    // console.log(dados);
                    $.ajax({
                        type: 'POST',
                        url: '/admin/membros/gravar',
                        data: dados,
                        dataType: "json",
                        success: ((result) => {

                            limpaDados();
                            mensagemRetorno("#msg", result.mensagem);

                        }),
                        error: ((e) => {
                            console.log(`Error -> ${JSON.stringify(e)}`)
                        })
                    });
                }
            })
    })

    $('#btnProfessor').click((e) => {

        validatedForm(e)
            .then((result) => {

                if (result) {
                    let dados = $('#formProfessor').serialize();
                    // console.log(dados);
                    $.ajax({
                        type: 'POST',
                        url: '/admin/professores/gravar',
                        data: dados,
                        dataType: "json",
                        success: ((result) => {

                            limpaDados();
                            mensagemRetorno("#msg", result.mensagem);

                        }),
                        error: ((e) => {
                            console.log(`Error -> ${JSON.stringify(e)}`)
                        })
                    });
                }
            })
    })

    $('#btnSaladeAula').click((e) => {

        validatedForm(e)
            .then((result) => {

                if (result) {
                    let dados = $('#formSaladeAula').serialize();
                    // console.log(dados);
                    $.ajax({
                        type: 'POST',
                        url: '/admin/saladeaula/gravar',
                        data: dados,
                        dataType: "json",
                        success: ((result) => {

                            limpaDados();
                            mensagemRetorno("#msg", result.mensagem);

                        }),
                        error: ((e) => {
                            console.log(`Error -> ${JSON.stringify(e)}`)
                        })
                    });
                }
            })
    })

    $('#btnMatricula').click((e) => {

        validatedForm(e)
            .then((result) => {

                if (result) {
                    let dados = $('#formMatricula').serialize();
                    // console.log(dados);
                    $.ajax({
                        type: 'POST',
                        url: '/admin/matriculas/gravar',
                        data: dados,
                        dataType: "json",
                        success: ((result) => {

                            limpaDados();
                            mensagemRetorno("#msg", result.mensagem);

                        }),
                        error: ((e) => {
                            console.log(`Error -> ${JSON.stringify(e)}`)
                        })
                    });
                }
            })
    })

    $('#btnVisitante').click((e) => {

        validatedForm(e)
            .then((result) => {

                if (result) {
                    let dados = {
                        "diadeaulaSaladeaulaId": $('#saladeaulaId').text().trim(),
                        "data": $('#diadeaula').val(),
                        "quantidade": $('#quantidade').val()
                    }
                    $.ajax({
                        type: 'POST',
                        url: '/admin/visitantes',
                        data: dados,
                        dataType: "json",
                        success: ((result) => {
                            $('.close').click();
                        }),
                        error: ((e) => {
                            console.log(`Error -> ${JSON.stringify(e)}`)
                        })
                    });
                }
            })
    })

    $(':reset').click((e) => {

        let inputs = document.querySelectorAll("input, select, textarea");
        let forms = $('.needs-validation');
        forms.removeClass('was-validated');
        inputs.forEach(input => {
            $(input).val('');
        });
    })

    setTimeout(() => {
        $('.alert').fadeOut("slow");
    }, 2000);

    if ($("#telefone").length) {

        $("#telefone").mask('00000-0000', {
            reverse: true
        });
    }

    if ($("#cpf").length) {

        $("#cpf").mask('000.000.000-00', {
            reverse: true
        });
    }

    if ($("#cep").length) {

        $("#cep").mask('00000-000', {
            reverse: true
        });
    }

    if ($('#diadeaula').length) {

        let date = getDomingo();

        if (($('#diadeaula').val() != date) && ($('#diadeaula').val())) {
            date = $('#diadeaula').val();
        } else {
            $('#diadeaula').val(date);
        }
        getDiaDeAula(date);
    }

    if ($('#diadeaula_relatorio').length) {

        let date = getDomingo();

        if (($('#diadeaula_relatorio').val() != date) && ($('#diadeaula_relatorio').val())) {
            date = $('#diadeaula_relatorio').val();
        } else {
            $('#diadeaula_relatorio').val(date);
        }
        getDiaDePresenca(date);
    }

    $("#btnDataAula").click(function () {
        getDiaDeAula($("#diadeaula").val());
    });

    $("#diadeaula").change(function () {
        getDiaDeAula($("#diadeaula").val());
    });

    $("#saladeaulaId").change(function () {
        let sala = $( "#saladeaulaId option:selected" ).val();
        $.ajax({
            type: 'GET',
            url: `/admin/matriculas/${sala}`,
            success: function (result) {
                $('#matriculasTable').html(result);
            },
        });
    })

    $("#grupoensino").change(() => {
        getModulosByGrupoEnsino('Teste');
    });

    $("#pesquisaMembro").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#membros-list tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $("#pesquisaMatriculas").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#matriculasTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $("#gf_pesquisaMatriculas").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#gf_matriculasTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    function getModulosByGrupoEnsino(tipo) {
        // let sala = $( "#saladeaulaId option:selected" ).val();
        $.ajax({
            type: 'GET',
            url: `/admin/modulosgrupoensino`,
            data: dados,
            dataType: "json",
            success: ((result) => {
            // let result = `<option value="">Escolha uma opção...</option>`
                $('#moduloId').html(result);
            }),
            error: ((e) => {
                console.log(`Error -> ${JSON.stringify(e)}`)
            })
            
        });
    }

    function getDiaDeAula(date) {
        let saladeaulaId = $("#saladeaulaId").text();
        $.ajax({
            type: 'GET',
            url: `/admin/diadeaula/${saladeaulaId}/${date}`,
            success: function (result) {
                $('#presentesdodia').html(result);
            },
        });
    }

    function getDiaDePresenca(date) {
        // let saladeaulaId = $("#saladeaulaId").text();
        // $.ajax({
        //     type: 'GET',
        //     url: `/diadeaula/${saladeaulaId}/${date}`,
        //     success: function (result) {
        //         $('#presentesdodia').html(result);
        //     },
        // });
    }

    function getDomingo() {
        let dt = new Date();
        let dayOfWeek = dt.getDay();
        let lastday = dayOfWeek == 0 ? dt.getDate() : dt.getDate() - (dt.getDay() - 1) + 6;
        return toDate(new Date(dt.setDate(lastday)));
    }

    function toDate(date) {
        let month = String(date.getMonth() + 1);
        let day = String(date.getDate());
        const year = String(date.getFullYear());

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return `${year}-${month}-${day}`;
    }

    function validatedForm(e) {

        let validatedForm = true;

        return new Promise((resolve, reject) => {

            let inputs = document.querySelectorAll("input, select, textarea");
            let forms = $('.needs-validation');

            Array.prototype.filter.call(inputs, (form) => {
                if (form.checkValidity() == false) {
                    validatedForm = false;
                    e.preventDefault();
                    e.stopPropagation();
                }
                forms.addClass('was-validated');
            }, false)

            return resolve(validatedForm)

        })
    }

    function limpaDados() {

        let inputs = document.querySelectorAll("input, select, textarea");
        let forms = $('.needs-validation');

        forms.removeClass('was-validated');
        inputs.forEach(input => {
            $(input).val('');
        });
    }

    function mensagemRetorno(element, mensagem) {

        $($(element)).html(mensagem).fadeIn("slow");
        setTimeout(() => {
            $($(element)).fadeOut("slow");
        }, 1500);
    }


    // function handleRequest(){
    //     console.log(request.responseText);
    // }
});