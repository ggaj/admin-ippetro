$(function () {

    // $('#exampleModal').modal('toggle')

    $("#btnLogin").click(function () {
        let dados = $('#formLogin').serialize();
        console.log(dados);
        $.ajax({
            type: 'POST',
            url: '/login',
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
                        url: '/modulos/gravar',
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
                        url: '/materias/gravar',
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
                        url: '/licoes/gravar',
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
                        url: '/membros/gravar',
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
                        url: '/professores/gravar',
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
                        url: '/saladeaula/gravar',
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
                        url: '/matriculas/gravar',
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
                        url: '/visitantes',
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

    if ($('#gf_diadeaula').length) {

        let date = getDomingo();

        if (($('#gf_diadeaula').val() != date) && ($('#gf_diadeaula').val())) {
            date = $('#gf_diadeaula').val();
        } else {
            $('#gf_diadeaula').val(date);
        }
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

        let date = previusDomingo();

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

    $("#licaoId").change(function () {
        let date = $('#gf_diadeaula').val();
        let licaoId = $("#licaoId").val();
        getGFDiaDeAula(licaoId, date);
    });

    $("#btn_diadeaula_relatorio").click( () => {
        getDiaDePresenca($("#diadeaula_relatorio").val());
    });

    $("#diadeaula_relatorio").change( () => {
        getDiaDePresenca($("#diadeaula_relatorio").val());
    });

    $("#saladeaulaId").change(function () {
        let sala = $( "#saladeaulaId option:selected" ).val();
        $.ajax({
            type: 'GET',
            url: `/matriculas/${sala}`,
            success: function (result) {
                $('#matriculasTable').html(result);
            },
        });
    })

    $("#grupoensino").change(() => {
        getModulosByGrupoEnsino($('#grupoensino').val());
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

    $("#saladeaulaebd").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#presentesdodia tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    
    function getModulosByGrupoEnsino(tipo) {
        var dados = { tipo }
        $.ajax({
            type: 'POST',
            url: `/modulosgrupoensino`,
            data: dados,
            // dataType: "json",
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
            url: `/diadeaula/${saladeaulaId}/${date}`,
            success: function (result) {
                $('#presentesdodia').html(result);
            },
        });
    }

    function getGFDiaDeAula(licaoId,date){
        // let licaoId = $("#saladeaulaId").text();
        let dados = {
            licaoId,
            date
        }
        $.ajax({
            type: 'POST',
            url: '/geracao_futuro/diadeaula',
            data: dados,
            success: ((result) => {
                $('#gf_presentesdodia').html(result);
            }),
            error: ((e) => {
                console.log(`Error -> ${JSON.stringify(e)}`)
            })
        });
    }

    function getDiaDePresenca(date) {
        $.ajax({
            type: 'GET',
            url: `/ebd/relatorios/presenca/${date}`,
            dataType: "json",
            success: ((result) => {
                $('#relatorio_presenca').html(result);
            }),
            error: ((e) => {
                console.log(`Error -> ${JSON.stringify(e)}`)
            })
        });
    }

    function getDomingo() {
        let dt = new Date();
        let dayOfWeek = dt.getDay();
        let lastday = dayOfWeek == 0 ? dt.getDate() : dt.getDate() - (dt.getDay() - 1) + 6;
        return toDate(new Date(dt.setDate(lastday)));
    }

    function previusDomingo() {
        let now = new Date();
        let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let dayOfWeek = now.getDay();
        let lastday = dayOfWeek == 0 ? now.getDate() : today.getDate() - today.getDay();
        return toDate(new Date(now.setDate(lastday)));
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

function sortTable(n, tableId) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById(tableId);
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc"; 
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount ++; 
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }