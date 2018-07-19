//todo fonte de luz nas medidas? ver se é preciso formulas ou nao
/*FUNCTIONS*/
function buildTipoIluminacao() {
    //Cria opções no select
    for (var i = 0; i < tipoInstalacao.length; i++) {
        $("#tipo-iluminacao").append($('<option class="op"> </option>').val(i).html(tipoInstalacao[i].nome));
    }
}

//BUILD TABLE
function buildDadosTable() {
    espacoCount = 0;
    espacoCount++;
    if (tipoInstalacao[$("#tipo-iluminacao").val()].nome == EXTERIOR) {
        // TABELA EXTERIOR (DESIGNACAO)
        estado = EXTERIOR

        var dadosTable = '<table class="table table-bordered" id="dataTable"><tbody><tr style="font-weight:bold;" class="titulo_row"><th class="tituloTH">Espaço</th><th class="tituloTH">Designação</th><th class="tituloTH">&nbsp</th></tr>';

        // CLONE //
        dadosTable += '<tr class="textTR" name="espaco" id="clone1" hidden>';
        dadosTable += '<td class="in"></td>';
        dadosTable += '<td class="in"><input class="form-control xInput" type="text" placeholder="Designação" id="designacao" name="designacao"></input></td>';
        dadosTable += '<td class="in"><button class="but-dados" type="button" id="remove-espaco" name="remove-espaco" onclick="removeEspaco(this)">Remover</button></td>';
        //dadosTable += '<td class="in"><a href="">Remover</a></td>';
        dadosTable += '</tr>';
        // CLONE //


        dadosTable += '<tr class="textTR" name="espaco">';
        dadosTable += '<td class="in">' + espacoCount + '</td>';
        dadosTable += '<td class="in"><input class="form-control xInput" type="text" placeholder="Designação" id="designacao' + espacoCount + '" name="designacao"></input></td>';
        dadosTable += '<td class="in"><button class="but-dados" type="button" id="remove-espaco" name="remove-espaco" onclick="removeEspaco(this)">Remover</button></td>';
        //dadosTable += '<td class="in"><a href="">Remover</a></td>';
        dadosTable += '</tr>';

        dadosTable += '<tr class="textTR" name="espaco" id="adiciona-row"><td class="in"></td><td class="in"></td><td class="in"><button class="but-dados" type="button" id="adiciona-espaco" name="adiciona-espaco" onclick="adicionaEspaco()">Adicionar</button></td></tr>';

    } else if (tipoInstalacao[$("#tipo-iluminacao").val()].nome == INTERIOR) {
        // TABELA INTERIOR (TIPOLOGIA, DESIGNACAO, AREA)
        estado = INTERIOR;

        var dadosTable = '<table class="table table-bordered" id="dataTable"><tbody><tr style="font-weight:bold;" class="titulo_row"><th class="tituloTH">Espaço</th><th class="tituloTH">Tipologia do espaço</th><th class="tituloTH">Designação</th><th class="tituloTH">Área (m2)</th><th class="tituloTH">&nbsp</th></tr>';

        // PARA CLONE //
        dadosTable += '<tr class="textTR" name="espaco" id="clone1" hidden>';
        dadosTable += '<td class="in"></td>';
        dadosTable += '<td class="select-cell"><select name="tipologia" class="interior" id="tipologia">';
        dadosTable += '<option class="op">Seleccionar opção</option>';

        //CRIAS OPTIONS COM VALORES E NOME TIPOLOGIA 
        for (var j = 0; j < tipoTipologia.length; j++) {
            //$('#tipologia_test').append('<option></option>').val(j).html(tipoTipologia[j].nome);
            dadosTable += '<option class="op" value="' + j + '">' + tipoTipologia[j].nome + '</option>';
        }

        dadosTable += '</select></td>';
        dadosTable += '<td class="in"><input class="form-control xInput" type="text" placeholder="Designação" id="designacao" name="designacao"></input></td>';
        dadosTable += '<td class="in"><input class="form-control xInput" type="number" placeholder="Área" class="interior" id="area" name="area"></input></td>';
        dadosTable += '<td class="in"><button class="but-dados" type="button" id="remove-espaco" name="remove-espaco" onclick="removeEspaco(this)">Remover</button></td>';
        //dadosTable += '<td class="in"><a href="">Remover</a></td>';
        dadosTable += '</tr>';
        // PARA CLONE //


        dadosTable += '<tr class="textTR" name="espaco">';
        dadosTable += '<td class="in">' + espacoCount + '</td>';
        dadosTable += '<td class="select-cell"><select name="tipologia" class="interior" id="tipologia' + espacoCount + '">';
        dadosTable += '<option class="op">Seleccionar opção</option>';

        //CRIAS OPTIONS COM VALORES E NOME TIPOLOGIA 
        for (var j = 0; j < tipoTipologia.length; j++) {
            //$('#tipologia_test').append('<option></option>').val(j).html(tipoTipologia[j].nome);
            dadosTable += '<option class="op" value="' + j + '">' + tipoTipologia[j].nome + '</option>';
        }

        dadosTable += '</select></td>';
        dadosTable += '<td class="in"><input class="form-control xInput" type="text" placeholder="Designação" id="designacao' + espacoCount + '" name="designacao"></input></td>';
        dadosTable += '<td class="in"><input class="form-control xInput" type="number" placeholder="Área" class="interior" id="area' + espacoCount + '" name="area"></input></td>';
        dadosTable += '<td class="in"><button class="but-dados" type="button" id="remove-espaco" name="remove-espaco" onclick="removeEspaco(this)">Remover</button></td>';
        //dadosTable += '<td class="in"><a href="">Remover</a></td>';
        dadosTable += '</tr>';

        dadosTable += '<tr class="textTR" name="espaco" id="adiciona-row"><td class="in"></td><td class="in"></td><td class="in"></td><td class="in"></td><td class="in"><button class="but-dados" type="button" id="adiciona-espaco" name="adiciona-espaco" onclick="adicionaEspaco()">Adicionar</button></td></tr>';

        //total
        dadosTable += '<tr>';
        dadosTable += '<td colspan="3">TOTAL</td>';
        dadosTable += '<td id="total-area">0m2</td>';
        dadosTable += '<td>&nbsp</td>';
        dadosTable += '</tr>';

    }

    $('#espacos-iluminacao').html(dadosTable + '</tbody></table>');


    var elementos = document.getElementsByName("area");
    //Calcula total da area
    $(elementos).change(function (event) {
        var total = totalArea(elementos);
        $("#total-area").html(total + " m2");
    });

}

function buildEspaco() {
    //Cria opções no select
    for (var i = 0; i < tipoTipologia.length; i++) {
        $("#tipologia").append($('<option class="op"> </option>').val(i).html(tipoTipologia[i].nome));
    }
    adicionaEspaco();
}

function buildFonteLuz() {
    /*Remove os elementos que já lá estavam criados, para o caso do utilizador ter voltado atras*/
    var elementos = document.getElementsByName("espaco-fonte-luz");
    for (i = elementos.length - 1; i > 0; i--) {
        $(elementos[i]).remove();
    }
    var elementosOp = document.getElementsByName("tipo-fonte-luz-op");
    for (i = elementosOp.length - 1; i >= 0; i--) {
        $(elementosOp[i]).remove();
    }
    /*Constroi select do tipo de fonte de luz*/
    for (var i = 0; i < tipoFonteLuz.length; i++) {
        for (var j = 0; j < tipoFonteLuz[i].aplicacaoPotencia.length; j++) {
            if (tipoFonteLuz[i].aplicacaoPotencia[j].match(estado)) {
                $("#tipo-fonte-luz").append($('<option name="tipo-fonte-luz-op" class="op"></option>').val(i).html(tipoFonteLuz[i].tipo));
                break;
            }
        }
    }


    /**/
    var original = $("#espaco-fonte-luz");
    var newEspaco;
    for (var i = 1; i <= espacoCount; i++) {
        espaco[i].id = i;
        /*Incrementa os id's*/
        newEspaco = original.clone();
        //newEspaco.attr('id', "espaco-fonte-luz" + i);
        newEspaco.find("td").eq(0).html(i);
        newEspaco.find("td").eq(1).html(espaco[i].designacao);
        newEspaco.find("td").eq(2).find("input").attr("id", "quantidade-fonte-luz" + i);
        newEspaco.find("td").eq(3).find("select").attr("id", "tipo-fonte-luz" + i);
        newEspaco.find("td").eq(4).find("select").attr("id", "potencia-fonte-luz" + i);
        newEspaco.find("td").eq(5).find("input").attr("id", "potencia-fonte-luz-input" + i);
        newEspaco.find("td").eq(6).find("input").attr("id", "horas-funcionamento-fonte-luz" + i);
        /*Altera os valores dos campos*/
        /*newEspaco.find("label").eq(0).text("Espaço " + i);
         newEspaco.find("label").eq(1).text(espaco[i].designacao);*/

        newEspaco.insertBefore('#total-fonte-luz-row');
        newEspaco.show();


        //qualquer coisa falem comigo : Filipe :P
        //preserve array elements to keep state for calculate totals
        var elementosQt = document.getElementsByName("quantidade-fonte-luz");
        var elementosPotencia = document.getElementsByName("potencia-fonte-luz");

        //added variables elementoQt and elementoPotencia to set to each element the onchange event 
        var elementoQt = newEspaco.find("td").eq(2).find("input");
        var elementoPotencia = newEspaco.find("td").eq(4).find("select");

        //Calcula total da quantidade de fonte de luz
        $(elementoQt).change(function (event) {
            var total = totalQtFonteLuz(elementosQt);
            $("#total-fonte-luz-row").find("td").eq(1).html(total);
            total = totalPotenciaFonteLuz(elementosPotencia);
            $("#total-fonte-luz-row").find("td").eq(2).html(total + "W");
        });

        //Calcula total da potencia de fonte de luz
        $(elementoPotencia).change(function (event) {
            var total = totalPotenciaFonteLuz(elementosPotencia);
            $("#total-fonte-luz-row").find("td").eq(2).html(total + "W");
        });

        var elementosTipoFonteLuz = document.getElementsByName('tipo-fonte-luz');
        var elementoTipoFonteLuz = newEspaco.find("td").eq(3).find("select");


        $(elementoTipoFonteLuz).change(function (event) {

            var input = $(event.target).parent("td").parent("tr").find("td").eq(5);
            var inputRendimento = $(event.target).parent("td").parent("tr").find("td").eq(7).find('input');
            var select = $(event.target).parent("td").parent("tr").find("td").eq(4);
            if ($(event.target).val() == OUTROS) {
                //added to in inline sleect outra add onchange event to input
                $(input).change(function () {
                    var total = totalPotenciaFonteLuz(elementosPotencia);
                    $("#total-fonte-luz-row").find("td").eq(2).html(total + "W");
                });
                select.hide();
                input.show();
                inputRendimento.val("");
                inputRendimento.removeAttr('disabled');

            } else {
                inputRendimento.val(tipoFonteLuz[$(event.target).val()].rendimento);
                select.show();
                input.hide();
            }

        });
    }
    checkFonteLuz();
}

function buildMedidas() {
    $("#reguladores-fluxo-medidas").find("option:gt(0)").remove();
    $("#sensores-medidas").find("option:gt(0)").remove();
    $("#sistemas-gestao-medidas").find("option:gt(0)").remove();
    $("#fonte-luz-medidas").find("option:gt(0)").remove();
    /*Remove os elementos que já lá estavam criados, para o caso do utilizador ter voltado atras*/
    var elementos = document.getElementsByName("espaco-medidas");
    for (i = elementos.length - 1; i > 0; i--) {
        $(elementos[i]).remove();
    }

    var original = $("#espaco-medidas");
    var newEspaco;
    for (var i = 1; i <= espacoCount; i++) {
        /*Incrementa os id's*/
        newEspaco = original.clone();
        //newEspaco.attr('id', "espaco-medidas" + i);
        newEspaco.find("td").eq(0).html(i);
        newEspaco.find("td").eq(1).html(espaco[i].designacao);
        newEspaco.find("td").eq(2).find("select").attr("id", "fonte-luz-medidas" + i);

        var medidasFonteLuz = tipoFonteLuz[fonteLuz[i].tipo].medidas.split(",");
        for (k = 0; k < medidas.length; k++) {
            if (medidasFonteLuz.includes("" + k) && fonteLuz[i].potenciaUnitFinal != medidas[k].nome) {
                if(medidas[k].nome.search("(AP)")>0 || medidas[k].nome.search("(BP)")>0){
                    var replace = medidas[k].nome.search("(AP)")>0? medidas[k].nome.search("(AP)") : medidas[k].nome.search("(BP)");                    
                    newEspaco.find("td").eq(2).find("#fonte-luz-medidas" + i).append($('<option class="op"> </option>').val(k).html(medidas[k].nome.substring(0, replace-1)));
                }else{
                    newEspaco.find("td").eq(2).find("#fonte-luz-medidas" + i).append($('<option class="op"> </option>').val(k).html(medidas[k].nome));
                }
            }
        }

        newEspaco.find("td").eq(3).find("select").attr("id", "reguladores-fluxo-medidas" + i);
        newEspaco.find("td").eq(4).find("select").attr("id", "sensores-medidas" + i);
        newEspaco.find("td").eq(5).find("select").attr("id", "sistemas-gestao-medidas" + i);

        /*Constroi selects de sim/nao*/
        for (var j = 0; j < tipoMedidas.length; j++) {
            newEspaco.find("td").eq(3).find("#reguladores-fluxo-medidas" + i).append($('<option class="op"> </option>').val(j).html(tipoMedidas[j]));
            newEspaco.find("td").eq(4).find("#sensores-medidas" + i).append($('<option class="op"> </option>').val(j).html(tipoMedidas[j]));
            newEspaco.find("td").eq(5).find("#sistemas-gestao-medidas" + i).append($('<option class="op"> </option>').val(j).html(tipoMedidas[j]));
        }

        //default a não
        newEspaco.find("td").eq(3).find("#reguladores-fluxo-medidas" + i).val(1);
        newEspaco.find("td").eq(4).find("#sensores-medidas" + i).val(1);
        newEspaco.find("td").eq(5).find("#sistemas-gestao-medidas" + i).val(1);

        newEspaco.insertBefore('#total-medidas-row');
        newEspaco.show();
    }

}

function calculaHorasFuncionamento() {
    var elementos = document.getElementsByName("quantidade-fonte-luz");
    $(elementos).change(function (event) {
        var quantidade = $(event.target);
        var horas = quantidade.parent("td").parent("tr").find("td").eq(6).find("input");
        if (estado == EXTERIOR) {
            if (quantidade.val() > 0) {
                horas.val(horasAnuaisFunc);
            } else {
                horas.val(0);
            }
        } else {
            horas.val(0);
        }
    });
}

function geraPotencia() {
    var elementos = document.getElementsByName("tipo-fonte-luz");
    var potenciaId = "";
    var tipoIndex = "";
    $(elementos).change(function (event) {
        potenciaId = $(event.target).parent("td").parent("tr").find("td").eq(4).find("select");
        if ($(event.target).val() != "") {
            tipoIndex = $(event.target).val();
            /*Limpa as opcoes da potencia*/
            if ($(potenciaId).length > 0) {
                $(potenciaId).find('option').remove();
                $(potenciaId).append($('<option value="">Seleccionar opção</option>'));
            }
            /*Acrescenta os valores da potencia de acordo com o tipo (exterior ou interior)*/
            for (var i = 0; i < tipoFonteLuz[tipoIndex].aplicacaoPotencia.length; i++) {
                if (tipoFonteLuz[tipoIndex].aplicacaoPotencia[i].match(estado)) {
                    $(potenciaId).append($('<option class="op"> </option>').val(i).html(tipoFonteLuz[tipoIndex].potencia[i]));
                }
            }
            /*Limpa as opcoes da potencia*/
        } else {
            $(potenciaId).find('option').remove();
            $(potenciaId).append($('<option value="">Seleccionar opção</option>'));
        }
    });
}

function checkFonteLuz() {
    geraPotencia();
    calculaHorasFuncionamento();
}

function checkTipoIluminacao() {
    //Altera valores consoante a opcao seleccionada
    $("#tipo-iluminacao").change(function () {
        if ($("#tipo-iluminacao").val() != "") {
            $("#custo-unit-iluminacao-titulo").show();
            $("#custo-unit-iluminacao").show();
            $("#custo-unit-iluminacao").val(tipoInstalacao[$("#tipo-iluminacao").val()].custo_unit);
            $("#iluminacao").show();


            if (tipoInstalacao[$("#tipo-iluminacao").val()].nome == INTERIOR) {
                estado = INTERIOR;
                estadoNum = INT;
                showInterior();
            } else if (tipoInstalacao[$("#tipo-iluminacao").val()].nome == EXTERIOR) {
                estado = EXTERIOR;
                estadoNum = EXT;
                showExterior();
            }
            buildDadosTable();
        } else {
            $("#iluminacao").hide();
            $("#custo-unit-iluminacao").hide();
        }
    });
}

function showExterior() {
    $('.interior').hide();
    $('.col-medida').removeAttr('colspan="4"').attr('colspan="3"');
}
function showInterior() {
    $('.interior').show();

}

/*Remove espaco (Recebe o id do elemento a remover)*/
function removeEspaco(id) {
    $(id).closest('tr').remove();
    espacoCount--;

    var elementos = document.getElementsByName("area");
    //Calcula total da area
    var total = totalArea(elementos);
    $("#total-area").html(total + " m2");
}

/*Adiciona novo espaco*/
function adicionaEspaco() {
    espacoCount++;
    var original = $("#clone1");
    var newEspaco = original.clone();

    /*Incrementa os id's*/
    //newEspaco.attr('id', "espaco" + espacoCount);
    newEspaco.find("td").eq(0).html(espacoCount);
    newEspaco.find("td").eq(1).find("select").attr("id", "tipologia" + espacoCount);
    newEspaco.find("td").eq(2).find("input").attr("id", "designacao" + espacoCount);
    newEspaco.find("td").eq(3).find("input").attr("id", "area" + espacoCount);
    newEspaco.find("td").eq(4).find("button").attr("id", "remove-espaco" + espacoCount);

    newEspaco.insertBefore('#adiciona-row');
    newEspaco.show();

    var elementos = document.getElementsByName("area");
    //Calcula total da area
    $(elementos).change(function (event) {
        var total = totalArea(elementos);
        $("#total-area").html(total + " m2");
    });
}

function recolheDados() {
    var elementos = document.getElementsByName("espaco");
    // limpa o array para o caso de voltar atras
    while (espaco.length > 1) {
        espaco.pop();
    }
    for (var i = 1; i <= espacoCount; i++) {
        if (estado == INTERIOR) {
            var tipologia = $(elementos[i]).find("td").eq(1).find("select").val();
            var designacao = $(elementos[i]).find("td").eq(2).find("input").val();
            var area = $(elementos[i]).find("td").eq(3).find("input").val();
            espaco.push({id: i, tipologia: tipologia, designacao: designacao, area: area});
        } else if (estado == EXTERIOR) {
            var designacao = $(elementos[i]).find("td").eq(1).find("input").val();
            espaco.push({id: i, designacao: designacao});
        }
    }
    tipoInstalacao[estadoNum].custo_unit = $("#custo-unit-iluminacao").val();
    checkCamposDados();
}

function checkCamposDados() {
    var faltaPreencher = false;
    if (espaco.length > 1) {
        for (var i = 1; i < espaco.length; i++) {
            if (estado == INTERIOR) {
                if ((espaco[i].area !== "" && espaco[i].area > 0) && espaco[i].designacao !== "" && espaco[i].tipologia !== "" && tipoInstalacao[estadoNum].custo_unit > 0) {
                    continue;
                } else {
                    alert("Faltam preencher campos");
                    faltaPreencher = true;
                    break;
                }
            } else if (estado == EXTERIOR) {
                if ((espaco[i].designacao !== "") && (tipoInstalacao[estadoNum].custo_unit > 0)) {
                    continue;
                } else {
                    alert("Faltam preencher campos");
                    faltaPreencher = true;
                    break;
                }
            }
        }
    } else {
        alert("É necessário pelo menos 1 espaço para continuar");
    }
    if (!faltaPreencher) {
        //$("#fonte-luz").show();
        nextStep();
        buildFonteLuz();
    }

}

function recolheFonteLuz() {
    var elementos = document.getElementsByName("espaco-fonte-luz");
    while (fonteLuz.length > 1) {
        fonteLuz.pop();
    }
    for (var i = 1; i <= espacoCount; i++) {
        var designacao = $(elementos[i]).find("td").eq(1).text();
        var quantidade = $(elementos[i]).find("td").eq(2).find("input").val();
        var rendimento = $(elementos[i]).find("td").eq(7).find("input").val();
        var tipo = $(elementos[i]).find("td").eq(3).find("select").val();
        if (tipo == OUTROS)
            var potencia = $(elementos[i]).find("td").eq(5).find("input").val();
        else
            var potencia = tipoFonteLuz[tipo].potencia[$(elementos[i]).find("td").eq(4).find("select").val()];

        var potenciaUnitFinal = calculaAP_BP(potencia, tipoFonteLuz[tipo].rendimento, tipoFonteLuz[LED].rendimento);
        //Está invertido para saber qual é o que não é para mostrar
        if (potenciaUnitFinal >= 25)
            estadoPotenciaUnitFinal = BP;
        else if (potenciaUnitFinal < 25)
            estadoPotenciaUnitFinal = AP;

        var horasFunc = $(elementos[i]).find("td").eq(6).find("input").val();
        fonteLuz.push({
            espacoNum: i,
            designacao: designacao,
            quantidade: quantidade,
            tipo: tipo,
            potencia: potencia,
            horasFuncionamento: horasFunc,
            potenciaUnitFinal: estadoPotenciaUnitFinal,
            rendimento: rendimento,
            medidasUpgrade: tipoFonteLuz[tipo].medidas
        });
    }
    
    checkCamposFonteLuz();
}

function checkCamposFonteLuz() {
    var faltaPreencher = false;
    for (var i = 1; i < fonteLuz.length; i++) {
        if ((fonteLuz[i].quantidade >= 0) && (fonteLuz[i].tipo !== "") && (fonteLuz[i].potencia !== "") && (fonteLuz[i].horasFuncionamento > 0)) {
            continue;
        } else {
            alert("Faltam preencher campos");
            faltaPreencher = true;
            break;
        }
    }
    if (!faltaPreencher) {
        //$("#medidas").show();
        nextStep();
        firstTimeMedidas = false;
        buildMedidas();
        calculaCenarioInicial();
    }
}

function recolheMedidas() {
    var elementos = document.getElementsByName("espaco-medidas");
    while (medidasDados.length > 1) {
        medidasDados.pop();
    }
    for (var i = 1; i <= espacoCount; i++) {
        var designacao = $(elementos[i]).find("td").eq(1).text();
        var fonteLuz = $(elementos[i]).find("td").eq(2).find("select").val();
        var reguladoresFluxo = $(elementos[i]).find("td").eq(3).find("select").val();
        var sensores = $(elementos[i]).find("td").eq(4).find("select").val();
        var sistemaGestao = $(elementos[i]).find("td").eq(5).find("select").val();

        medidasDados.push({
            espacoNum: i,
            designacao: designacao,
            fonteLuz: fonteLuz,
            reguladoresFluxo: reguladoresFluxo,
            sensores: sensores,
            sistemaGestao: sistemaGestao
        });
    }
    checkCamposMedidas();
}

function checkCamposMedidas() {
    var faltaPreencher = false;
    for (var i = 1; i < medidasDados.length; i++) {
        if (estado == EXTERIOR) {
            if ((medidasDados[i].fonteLuz !== "") && (medidasDados[i].reguladoresFluxo !== "") && (medidasDados[i].sistemaGestao !== "")) {
                continue;
            } else {
                alert("Faltam preencher campos");
                faltaPreencher = true;
                break;
            }
        } else if (estado == INTERIOR) {
            if ((medidasDados[i].fonteLuz !== "") && (medidasDados[i].reguladoresFluxo !== "") && (medidasDados[i].sensores !== "") && (medidasDados[i].sistemaGestao !== "")) {
                continue;
            } else {
                alert("Faltam preencher campos");
                faltaPreencher = true;
                break;
            }
        }
    }
    if (!faltaPreencher) {
        nextStep();
        calculaCenarioFinal();
        calculaInvestimento();
        buildResumo();
    }
}

function buildResumo() {
    resumoCenarios = [
        {
            nome: "Cenário Inicial",
            potencia: 0,
            consumoAnual: 0,
            custosEnergeticos: 0
        },
        {
            nome: "Cenário Final",
            potencia: 0,
            consumoAnual: 0,
            custosEnergeticos: 0
        }
    ];

    resumoGeral = {
        reducaoCustos1: "",
        reducaoCustos2: "",
        investimento: "",
        payback: ""
    };

    resumoCenarios[0].potencia = cenarioInicial[TOTAL].potencia.toFixed(0);
    resumoCenarios[0].consumoAnual = cenarioInicial[TOTAL].consumo.toFixed(0);
    resumoCenarios[0].custosEnergeticos = cenarioInicial[TOTAL].custoEnergia.toFixed(0);
    resumoCenarios[1].potencia = cenarioFinal[TOTAL].potencia.toFixed(0);
    resumoCenarios[1].consumoAnual = cenarioFinal[TOTAL].consumoFinal.toFixed(0);
    resumoCenarios[1].custosEnergeticos = cenarioFinal[TOTAL].custoEnergia.toFixed(0);
    resumoGeral.reducaoCustos1 = investimento[TOTAL].reducaoCustos1.toFixed(0);
    resumoGeral.reducaoCustos2 = (resumoGeral.reducaoCustos1/resumoCenarios[0].custosEnergeticos * 100).toFixed(0);
    resumoGeral.investimento = investimento[TOTAL].investimento.toFixed(0);
    resumoGeral.payback = investimento[TOTAL].pri.toFixed(1);
    //cenario inicial
    $("#potencia-1-resumo").html(resumoCenarios[INICIAL].potencia + ' W');
    $("#consumo-anual-1-resumo").html(resumoCenarios[INICIAL].consumoAnual + ' kWh');
    $("#custos-energeticos-1-resumo").html(resumoCenarios[INICIAL].custosEnergeticos + ' €');
    //cenario final
    $("#potencia-2-resumo").html(resumoCenarios[FINAL].potencia + ' W');
    $("#consumo-anual-2-resumo").html(resumoCenarios[FINAL].consumoAnual + ' kWh');
    $("#custos-energeticos-2-resumo").html(resumoCenarios[FINAL].custosEnergeticos + ' €');


    $("#reducao-custos-1-resumo").html(resumoGeral.reducaoCustos1 + ' €');
    $("#reducao-custos-2-resumo").html(resumoGeral.reducaoCustos2 + '%');
    $("#investimento-resumo").html(resumoGeral.investimento + ' €');
    $("#payback-resumo").html(resumoGeral.payback + ' anos');
}


// BUTTONS STEPS
function nextStep() {
    var id = $('.step:visible').data('id');
    var nextId = $('.step:visible').data('id') + 1;
    $('[data-id="' + id + '"]').hide();
    $('[data-id="' + nextId + '"]').show();

    if ($('.anterior:hidden').length > 1) {
        $('.anterior').show();
        $('.custo-iluminacao-box').hide();
    }

    if (nextId == 2) {
        $('.but-2').hide();
        $('.recolhe-medidas-but').show();
        $('.end-step').hide();
    }

    if (nextId == 3) {
        $('.but-2').hide();
        $('.recolhe-medidas-but').hide();
        $('.end-step').show();
    }

    if (nextId == 4) {
        $('.but-2').hide();
        $('.recolhe-medidas-but').hide();
        $('.end-step').show();

        $('.resumo-but').hide();
    }
}

function prevStep() {
    var id = $('.step:visible').data('id');
    var prevId = $('.step:visible').data('id') - 1;
    $('[data-id="' + id + '"]').hide();
    $('[data-id="' + prevId + '"]').show();

    if (prevId == 1) {
        $('.but-2').show();
        $('.recolhe-medidas-but').hide();
        $('.end-step').hide();
        $('.anterior').hide();
        $('.custo-iluminacao-box').show();
    }

    if (prevId == 2) {
        $('.but-2').hide();
        $('.recolhe-medidas-but').show();
        $('.end-step').hide();
    }

    if (prevId == 3) {
        $('.but-2').hide();
        $('.recolhe-medidas-but').hide();
        $('.end-step').show();

        $('.resumo-but').show();
    }
}
//
//function reguladoresChange() {
//  if ($('#tipo-iluminacao').val() == 0) {
//    $('.reg-exterior').hide();
//  } else if ($('#tipo-iluminacao').val() == 1) {
//    $('.reg-exterior').show();
//  }
//}


/*MAIN*/
$(document).ready(function () {
    buildTipoIluminacao();
    checkTipoIluminacao();
    //buildDadosTable();
    buildEspaco();

    // $('#tipo-iluminacao').change(reguladoresChange);

    $('#fonte-luz-but').on("click", function () {
        recolheDados();
    });

    $('#medidas-but').on('click', function () {
        recolheFonteLuz();
    });

    $('#resumo-but').on('click', function () {
        recolheMedidas();
    });

});
