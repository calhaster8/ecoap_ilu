function buildTipoIluminacao() {
    
    for (var i = 0; i < tipoInstalacao.length; i++) {
        $("#tipo-iluminacao").append($('<option class="op"> </option>').val(i).html(tipoInstalacao[i].nome));
    }

    $("#tipo-iluminacao").change(function () {
        if ($("#tipo-iluminacao").val() != "") {
            $("#custo-unit-iluminacao-titulo").show();
            $("#custo-unit-iluminacao").show();
            $("#custo-unit-iluminacao-titulo-label").show();
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
            $("#custo-unit-iluminacao-titulo").hide();
            $("#custo-unit-iluminacao-titulo-label").hide();
        }
    });
}

function buildDadosTable() {
    espacoCount = 0;
    espacoCount++;
    if (tipoInstalacao[$("#tipo-iluminacao").val()].nome == EXTERIOR) {

        estado = EXTERIOR

        var dadosTable = '<table class="table table-bordered" id="dataTable"><tbody><tr style="font-weight:bold;" class="titulo_row"><th class="tituloTH">Espaço</th><th class="tituloTH">Designação</th><th class="tituloTH">&nbsp</th></tr>';

        dadosTable += '<tr class="textTR" name="espaco" id="clone1" hidden>';
        dadosTable += '<td class="in"></td>';
        dadosTable += '<td class="in"><input class="form-control xInput" type="text" placeholder="Designação" id="designacao" name="designacao"></input></td>';
        dadosTable += '<td class="in"><button class="but-dados" type="button" id="remove-espaco" name="remove-espaco" onclick="removeEspaco(this)">Remover</button></td>';
        dadosTable += '</tr>';

        dadosTable += '<tr class="textTR" name="espaco">';
        dadosTable += '<td class="in">' + espacoCount + '</td>';
        dadosTable += '<td class="in"><input class="form-control xInput" type="text" placeholder="Designação" id="designacao' + espacoCount + '" name="designacao' + espacoCount + '"></input></td>';
        dadosTable += '<td class="in"><button class="but-dados" type="button" id="remove-espaco" name="remove-espaco" onclick="removeEspaco(this)">Remover</button></td>';
        dadosTable += '</tr>';
        dadosTable += '<tr class="textTR" name="espaco" id="adiciona-row"><td class="in"></td><td class="in"></td><td class="in"><button class="but-dados" type="button" id="adiciona-espaco" name="adiciona-espaco" onclick="adicionaEspaco()">Adicionar</button></td></tr>';

    } else if (tipoInstalacao[$("#tipo-iluminacao").val()].nome == INTERIOR) {

        estado = INTERIOR;

        var dadosTable = '<table class="table table-bordered" id="dataTable"><tbody><tr style="font-weight:bold;" class="titulo_row"><th class="tituloTH">Espaço</th><th class="tituloTH">Tipologia do espaço</th><th class="tituloTH">Designação</th><th class="tituloTH">Área (m2)</th><th class="tituloTH">&nbsp</th></tr>';

        dadosTable += '<tr class="textTR" name="espaco" id="clone1" hidden>';
        dadosTable += '<td class="in"></td>';
        dadosTable += '<td class="select-cell"><select name="tipologia" class="interior" id="tipologia">';
        dadosTable += '<option class="op" value="">Selecionar opção</option>';
      
        for (var j = 0; j < tipoTipologia.length; j++) {
            dadosTable += '<option class="op" value="' + j + '">' + tipoTipologia[j].nome + '</option>';
        }

        dadosTable += '</select></td>';
        dadosTable += '<td class="in"><input class="form-control xInput" type="text" placeholder="Designação" id="designacao" name="designacao"></input></td>';
        dadosTable += '<td class="in"><input class="form-control xInput" type="number" min="1" step="0.1" placeholder="0 m2" class="interior" id="area" name="area"></input></td>';
        dadosTable += '<td class="in"><button class="but-dados" type="button" id="remove-espaco" name="remove-espaco" onclick="removeEspaco(this)">Remover</button></td>';
        dadosTable += '</tr>';

        dadosTable += '<tr class="textTR" name="espaco">';
        dadosTable += '<td class="in">' + espacoCount + '</td>';
        dadosTable += '<td class="select-cell"><select name="tipologia' + espacoCount + '" class="interior" id="tipologia' + espacoCount + '">';
        dadosTable += '<option class="op" value="">Selecionar opção</option>';

        for (var j = 0; j < tipoTipologia.length; j++) {
            dadosTable += '<option class="op" value="' + j + '">' + tipoTipologia[j].nome + '</option>';
        }

        dadosTable += '</select></td>';
        dadosTable += '<td class="in"><input class="form-control xInput" type="text" placeholder="Designação" id="designacao' + espacoCount + '" name="designacao' + espacoCount + '"></input></td>';
        dadosTable += '<td class="in"><input class="form-control xInput" type="number" min="1" step="0.1" placeholder="0 m2" class="interior" id="area' + espacoCount + '" name="area' + espacoCount + '"></input></td>';
        dadosTable += '<td class="in"><button class="but-dados" type="button" id="remove-espaco" name="remove-espaco" onclick="removeEspaco(this)">Remover</button></td>';
        dadosTable += '</tr>';

        dadosTable += '<tr class="textTR" name="espaco" id="adiciona-row"><td class="in"></td><td class="in"></td><td class="in"></td><td class="in"></td><td class="in"><button class="but-dados" type="button" id="adiciona-espaco" name="adiciona-espaco" onclick="adicionaEspaco()">Adicionar</button></td></tr>';

        dadosTable += '<tr>';
        dadosTable += '<td colspan="3">TOTAL</td>';
        dadosTable += '<td id="total-area">0 m2</td>';
        dadosTable += '<td>&nbsp</td>';
        dadosTable += '</tr>';
    }

    $('#espacos-iluminacao').html(dadosTable + '</tbody></table>');

    $('#' + "tipologia" + espacoCount).rules("add", {
        required: true,
        messages: {
            required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
        }
    });
    $('#' + "designacao" + espacoCount).rules("add", {
        required: true,
        messages: {
            required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
        }
    });
    $('#' + "area" + espacoCount).rules("add", {
        required: true,
        min: 1,
        number: true,
        step: 0.1,
        messages: {
            required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>',
            min: '<label style="font-size: 14px; color: red;">A área tem que ser maior que 0</label>',
            step: '<label style="font-size: 14px; color: red;">O passo de incremento é de 0.1</label>',
            number: '<label style="font-size: 14px; color: red;">Introduza números com (.) em vez de (,)</label>'
        }
    });

    $("#area" + espacoCount).change(function () {
        totalArea();
    });
}

function buildFonteLuz() {

    for (i = 1; i <= espacoCount; i++) {
        $("#espaco-fonte-luz" + i).remove();
    }

    for (i = 1; i <= espacoCount; i++) {

        $("#tipo-fonte-luz")
                .find('option')
                .remove()
                .end()
                .append('<option name="tipo-fonte-luz-op" class="op" value="">Selecionar opção</option>')
                .val('');
    }

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
        newEspaco = original.clone();
        newEspaco.attr('id', "espaco-fonte-luz" + i);
        newEspaco.find("td").eq(0).html(i);
        newEspaco.find("td").eq(1).html(espaco[i].designacao);
        newEspaco.find("td").eq(2).find("input").attr("id", "quantidade-fonte-luz" + i);
        newEspaco.find("td").eq(2).find("input").attr("name", "quantidade-fonte-luz" + i);
        newEspaco.find("td").eq(3).find("select").attr("id", "tipo-fonte-luz" + i);
        newEspaco.find("td").eq(3).find("select").attr("name", "tipo-fonte-luz" + i);
        newEspaco.find("td").eq(4).find("select").attr("id", "potencia-fonte-luz" + i);
        newEspaco.find("td").eq(4).find("select").attr("name", "potencia-fonte-luz" + i);
        newEspaco.find("td").eq(5).find("input").attr("id", "potencia-fonte-luz-input" + i);
        newEspaco.find("td").eq(5).find("input").attr("name", "potencia-fonte-luz-input" + i);
        newEspaco.find("td").eq(6).find("input").attr("id", "horas-funcionamento-fonte-luz" + i);
        newEspaco.find("td").eq(6).find("input").attr("name", "horas-funcionamento-fonte-luz" + i);
		newEspaco.find("td").eq(7).find("input").attr("id", "rendimento-fonte-luz" + i);
        newEspaco.find("td").eq(7).find("input").attr("name", "rendimento-fonte-luz" + i);

        newEspaco.insertBefore('#total-fonte-luz-row');

        $("#tipo-fonte-luz" + i).change(function (event) {
            var potenciaId = $(event.target).parent("td").parent("tr").find("td").eq(4).find("select");
            var input = $(event.target).parent("td").parent("tr").find("td").eq(5);
            var inputRendimento = $(event.target).parent("td").parent("tr").find("td").eq(7).find('input');

            if ($(event.target).val() == OUTROS) {
                $(input).change(function () {
                    totalPotenciaFonteLuz();
                });
                $(event.target).parent("td").parent("tr").find(".outro-sel").hide();
                input.show();
                inputRendimento.val("");
                inputRendimento.removeAttr('disabled');

            } else if ($(event.target).val() != "" && $(event.target).val() != OUTROS) {
                var tipoIndex = $(event.target).val();
                if ($(potenciaId).length > 0) {
                    $(potenciaId).find('option').remove();
                    $(potenciaId).append($('<option value="">Selecionar opção</option>'));
                }
                for (var i = 0; i < tipoFonteLuz[tipoIndex].aplicacaoPotencia.length; i++) {
                    if (tipoFonteLuz[tipoIndex].aplicacaoPotencia[i].match(estado)) {
                        $(potenciaId).append($('<option class="op"> </option>').val(i).html(tipoFonteLuz[tipoIndex].potencia[i]));
                    }
                }
                inputRendimento.val(tipoFonteLuz[$(event.target).val()].rendimento);
                inputRendimento.attr('disabled', 'disabled');
                $(event.target).parent("td").parent("tr").find(".outro-sel").show();
                input.hide();
                
            } else {
                $(potenciaId).find('option').remove();
                $(potenciaId).append($('<option value="">Selecionar opção</option>'));
            }
        });

        $("#quantidade-fonte-luz" + i).change(function (event) {
            totalQtFonteLuz();
            totalPotenciaFonteLuz();

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

        $("#quantidade-fonte-luz" + i).rules("add", {
            required: true,
            min: 1,
            number: true,
            step: 1,
            digits: true,
            messages: {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>',
                min: '<label style="font-size: 14px; color: red;">O valor mínimo é 1</label>',
                step: '<label style="font-size: 14px; color: red;">Introduza números inteiros</label>',
                number: '<label style="font-size: 14px; color: red;">Introduza números inteiros</label>',
                digits: '<label style="font-size: 14px; color: red;">Introduza números inteiros</label>'
            }
        });

        $("#tipo-fonte-luz" + i).rules("add", {
            required: true,
            messages: {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            }
        });

        $("#potencia-fonte-luz" + i).change(function () {
            totalPotenciaFonteLuz();
        });

        $("#potencia-fonte-luz" + i).rules("add", {
            required: true,
            messages: {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            }
        });

        $("#potencia-fonte-luz-input" + i).change(function () {
            totalPotenciaFonteLuz();
        });

        $("#potencia-fonte-luz-input" + i).rules("add", {
            required: true,
            min: 1,
            number: true,
            step: 1,
            messages: {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>',
                min: '<label style="font-size: 14px; color: red;">O valor mínimo é 1</label>',
                step: '<label style="font-size: 14px; color: red;">Introduza números inteiros</label>',
                number: '<label style="font-size: 14px; color: red;">Introduza números inteiros</label>'
            }
        });

        $("#horas-funcionamento-fonte-luz" + i).rules("add", {
            required: true,
            min: 1,
            number: true,
            step: 1,
            max: 8760,
            messages: {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>',
                min: '<label style="font-size: 14px; color: red;">O valor mínimo é 1</label>',
                max: '<label style="font-size: 14px; color: red;">O valor máximo de horas de funcionamento anual é de 8760</label>',
                step: '<label style="font-size: 14px; color: red;">Introduza números inteiros</label>',
                number: '<label style="font-size: 14px; color: red;">Introduza números inteiros</label>'
            }
        });

		$("#rendimento-fonte-luz" + i).rules("add", {
            required: true,
            min: 1,
            number: true,
            step: 1,
			max: 120,
            messages: {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>',
                min: '<label style="font-size: 14px; color: red;">O valor mínimo é 1</label>',
				max: '<label style="font-size: 14px; color: red;">O rendimento máximo é de 120 lm/W</label>',
                step: '<label style="font-size: 14px; color: red;">Introduza números inteiros</label>',
                number: '<label style="font-size: 14px; color: red;">Introduza números inteiros</label>'
            }
        });
		
        newEspaco.show();
    }
}

function buildMedidas() {
    $("#reguladores-fluxo-medidas").find("option:gt(0)").remove();
    $("#sensores-medidas").find("option:gt(0)").remove();
    $("#sistemas-gestao-medidas").find("option:gt(0)").remove();
    $("#fonte-luz-medidas").find("option:gt(0)").remove();
    for (i = 1; i <= espacoCount; i++) {
        $("#espaco-medidas" + i).remove();
    }

    var original = $("#espaco-medidas");
    var newEspaco;
    for (var i = 1; i <= espacoCount; i++) {
        newEspaco = original.clone();
        newEspaco.attr('id', "espaco-medidas" + i);
        newEspaco.find("td").eq(0).html(i);
        newEspaco.find("td").eq(1).html(espaco[i].designacao);
        newEspaco.find("td").eq(2).find("select").attr("id", "fonte-luz-medidas" + i);
        newEspaco.find("td").eq(2).find("select").attr("name", "fonte-luz-medidas" + i);

        var medidasFonteLuz = [];
        medidasFonteLuz = tipoFonteLuz[fonteLuz[i].tipo].medidas.split(",");
        for (k = 0; k < medidas.length; k++) {
            var medidasLuz = false;
            for (h = 0; h < medidasFonteLuz.length; h++) {
                if (medidasFonteLuz[h] != "" && medidasFonteLuz[h] != undefined && medidasFonteLuz[h] == k) {
                    medidasLuz = true;
                    break;
                }
            }
            if (medidasLuz && fonteLuz[i].potenciaUnitFinal != medidas[k].nome) {
                if (medidas[k].nome.search("(AP)") > 0 || medidas[k].nome.search("(BP)") > 0) {
                    var replace = medidas[k].nome.search("(AP)") > 0 ? medidas[k].nome.search("(AP)") : medidas[k].nome.search("(BP)");
                    newEspaco.find("td").eq(2).find("#fonte-luz-medidas" + i).append($('<option class="op"> </option>').val(k).html(medidas[k].nome.substring(0, replace - 1) + " (" + medidas[k].poupanca + " lm/W)"));
                } else {
                    newEspaco.find("td").eq(2).find("#fonte-luz-medidas" + i).append($('<option class="op"> </option>').val(k).html(medidas[k].nome + " (" + medidas[k].poupanca + " lm/W)"));
                }
            }
        }

        newEspaco.find("td").eq(3).find("select").attr("id", "reguladores-fluxo-medidas" + i);
        newEspaco.find("td").eq(3).find("select").attr("name", "reguladores-fluxo-medidas" + i);
        newEspaco.find("td").eq(4).find("select").attr("id", "sensores-medidas" + i);
        newEspaco.find("td").eq(4).find("select").attr("name", "sensores-medidas" + i);
        newEspaco.find("td").eq(5).find("select").attr("id", "sistemas-gestao-medidas" + i);
        newEspaco.find("td").eq(5).find("select").attr("name", "sistemas-gestao-medidas" + i);

        for (var j = 0; j < tipoMedidas.length; j++) {
            newEspaco.find("td").eq(3).find("#reguladores-fluxo-medidas" + i).append($('<option class="op"> </option>').val(j).html(tipoMedidas[j]));
            newEspaco.find("td").eq(4).find("#sensores-medidas" + i).append($('<option class="op"> </option>').val(j).html(tipoMedidas[j]));
            newEspaco.find("td").eq(5).find("#sistemas-gestao-medidas" + i).append($('<option class="op"> </option>').val(j).html(tipoMedidas[j]));
        }

        newEspaco.find("td").eq(3).find("#reguladores-fluxo-medidas" + i).val(1);
        newEspaco.find("td").eq(4).find("#sensores-medidas" + i).val(1);
        newEspaco.find("td").eq(5).find("#sistemas-gestao-medidas" + i).val(1);

        newEspaco.insertBefore('#total-medidas-row');
        newEspaco.show();

        $("#reguladores-fluxo-medidas" + i).rules("add", {
            required: true,
            messages: {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            }
        });

        $("#sensores-medidas" + i).rules("add", {
            required: true,
            messages: {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            }
        });

        $("#sistemas-gestao-medidas" + i).rules("add", {
            required: true,
            messages: {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            }
        });
    }
}

function showExterior() {
    $('.interior').hide();
    $('.col-medida').removeAttr('colspan="4"').attr('colspan="3"');
}
function showInterior() {
    $('.interior').show();

}

function removeEspaco(id) {
    $(id).closest('tr').remove();
    espacoCount--;
    totalArea();
}

function adicionaEspaco() {
    espacoCount++;
    var original = $("#clone1");
    var newEspaco = original.clone();

    if (tipoInstalacao[$("#tipo-iluminacao").val()].nome == INTERIOR) {
        newEspaco.attr('id', "clone" + espacoCount);
        newEspaco.find("td").eq(0).html(espacoCount);
        newEspaco.find("td").eq(1).find("select").attr("id", "tipologia" + espacoCount);
        newEspaco.find("td").eq(1).find("select").attr("name", "tipologia" + espacoCount);
        newEspaco.find("td").eq(2).find("input").attr("id", "designacao" + espacoCount);
        newEspaco.find("td").eq(2).find("input").attr("name", "designacao" + espacoCount);
        newEspaco.find("td").eq(3).find("input").attr("id", "area" + espacoCount);
        newEspaco.find("td").eq(3).find("input").attr("name", "area" + espacoCount);
        newEspaco.find("td").eq(4).find("button").attr("id", "remove-espaco" + espacoCount);

        newEspaco.insertBefore('#adiciona-row');
        
        $("#tipologia" + espacoCount).rules("add", {
            required: true,
            messages: {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            }
        });
        $("#designacao" + espacoCount).rules("add", {
            required: true,
            messages: {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            }
        });
        $("#area" + espacoCount).rules("add", {
            required: true,
            min: 1,
            number: true,
            step: 0.1,
            messages: {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>',
                min: '<label style="font-size: 14px; color: red;">A área tem que ser maior que 0</label>',
                step: '<label style="font-size: 14px; color: red;">Introduza um número válido. Ex: 10.0</label>',
                number: '<label style="font-size: 14px; color: red;">Introduza números com (.) em vez de (,)</label>'
            }
        });
        
        newEspaco.show();        

        $("#area" + espacoCount).change(function () {
            totalArea();
        });
        
    } else if (tipoInstalacao[$("#tipo-iluminacao").val()].nome == EXTERIOR) {
        
        newEspaco.attr('id', "clone" + espacoCount);
        newEspaco.find("td").eq(0).html(espacoCount);
        newEspaco.find("td").eq(1).find("input").attr("id", "designacao" + espacoCount);
        newEspaco.find("td").eq(1).find("input").attr("name", "designacao" + espacoCount);
        newEspaco.find("td").eq(2).find("button").attr("id", "remove-espaco" + espacoCount);

        newEspaco.insertBefore('#adiciona-row');
                
        $("#designacao" + espacoCount).rules("add", {
            required: true,
            messages: {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            }
        });
        
        newEspaco.show();        
    }
}

function recolheDados() {

    while (espaco.length > 1) {
        espaco.pop();
    }
    for (var i = 1; i <= espacoCount; i++) {
        if (estado == INTERIOR) {
            var tipologia = $("#tipologia" + i).val();
            var designacao = $("#designacao" + i).val();
            var area = $("#area" + i).val();
            espaco.push({id: i, tipologia: tipologia, designacao: designacao, area: area});
        } else if (estado == EXTERIOR) {
            var designacao = $("#designacao" + i).val();
            espaco.push({id: i, designacao: designacao});
        }
    }
    tipoInstalacao[estadoNum].custo_unit = $("#custo-unit-iluminacao").val();
}

function recolheFonteLuz() {
    while (fonteLuz.length > 1) {
        fonteLuz.pop();
    }
    for (var i = 1; i <= espacoCount; i++) {
        var designacao = $("#espaco-fonte-luz" + i).find("td").eq(1).text();
        var quantidade = $("#espaco-fonte-luz" + i).find("td").eq(2).find("input").val();
        var rendimento = $("#espaco-fonte-luz" + i).find("td").eq(7).find("input").val();
        var tipo = $("#espaco-fonte-luz" + i).find("td").eq(3).find("select").val();
        var potencia = 0;
        if (tipo !== undefined && tipo !== "" && tipo == OUTROS) {
            potencia = $("#espaco-fonte-luz" + i).find("td").eq(5).find("input").val();
        } else if (tipo != undefined && tipo !== "" && tipo >= 0) {
            potencia = tipoFonteLuz[tipo].potencia[$("#espaco-fonte-luz" + i).find("td").eq(4).find("select").val()];
        } else {
            alert("Faltam preencher campos");
            break;
        }

        var potenciaUnitFinal = calculaAP_BP(potencia, tipoFonteLuz[tipo].rendimento, tipoFonteLuz[LED].rendimento);
        if (potenciaUnitFinal >= 25)
            estadoPotenciaUnitFinal = BP;
        else if (potenciaUnitFinal < 25)
            estadoPotenciaUnitFinal = AP;

        var horasFunc = $("#espaco-fonte-luz" + i).find("td").eq(6).find("input").val();
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
}

function recolheMedidas() {
    var elementos = document.getElementsByName("espaco-medidas");
    while (medidasDados.length > 1) {
        medidasDados.pop();
    }
    for (var i = 1; i <= espacoCount; i++) {
        var designacao = $("#espaco-medidas" + i).find("td").eq(1).text();
        var fonteLuz = $("#espaco-medidas" + i).find("td").eq(2).find("select").val();
        var reguladoresFluxo = $("#espaco-medidas" + i).find("td").eq(3).find("select").val();
        var sensores = $("#espaco-medidas" + i).find("td").eq(4).find("select").val();
        var sistemaGestao = $("#espaco-medidas" + i).find("td").eq(5).find("select").val();

        medidasDados.push({
            espacoNum: i,
            designacao: designacao,
            fonteLuz: fonteLuz,
            reguladoresFluxo: reguladoresFluxo,
            sensores: sensores,
            sistemaGestao: sistemaGestao
        });
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
    resumoGeral.reducaoCustos2 = !isNaN(resumoCenarios[0].custosEnergeticos) ? (resumoGeral.reducaoCustos1 / resumoCenarios[0].custosEnergeticos * 100).toFixed(0) : ' - ';
    resumoGeral.investimento = investimento[TOTAL].investimento.toFixed(0);
    resumoGeral.payback = !isNaN(investimento[TOTAL].pri) ? investimento[TOTAL].pri.toFixed(1) : ' - ';
    
    $("#potencia-1-resumo").html(resumoCenarios[INICIAL].potencia + ' W');
    $("#consumo-anual-1-resumo").html(resumoCenarios[INICIAL].consumoAnual + ' kWh');
    $("#custos-energeticos-1-resumo").html(resumoCenarios[INICIAL].custosEnergeticos + ' €');

    $("#potencia-2-resumo").html(resumoCenarios[FINAL].potencia + ' W');
    $("#consumo-anual-2-resumo").html(resumoCenarios[FINAL].consumoAnual + ' kWh');
    $("#custos-energeticos-2-resumo").html(resumoCenarios[FINAL].custosEnergeticos + ' €');

    $("#reducao-consumos-1-resumo").html((resumoCenarios[INICIAL].consumoAnual - resumoCenarios[FINAL].consumoAnual) + ' kWh');
    $("#reducao-consumos-2-resumo").html(((1 - resumoCenarios[FINAL].consumoAnual / resumoCenarios[INICIAL].consumoAnual) * 100).toFixed(0) + '%');

    $("#reducao-custos-1-resumo").html(resumoGeral.reducaoCustos1 + ' €');
    $("#reducao-custos-2-resumo").html(resumoGeral.reducaoCustos2 + '%');
    $("#investimento-resumo").html(resumoGeral.investimento + ' €');

    if (resumoGeral.payback < 0) {
        $("#payback-resumo").html(' -');
    } else {
        $("#payback-resumo").html(resumoGeral.payback + ' anos');
    }

    if ($('#tipo-iluminacao').val() == 0) {
        iluIntChart();
    } else if ($('#tipo-iluminacao').val() == 1) {
        iluExtChart();
    }


}

function maxChart(array) {
    var max = 0;
    if (array.length > 0) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] > max || max == 0) {
                max = new Number(array[i]);
            }
        }
    }
    max += (max * 0.10);

    return max;

}

function iluIntChart() {

    //CENARIO INICIAL
    var cenarioInicialDesign = [];
    var cenarioInicialConsumo = [];

    for (i = 1; i <= espacoCount; i++) {
        cenarioInicialDesign[i] = cenarioInicial[i].designacao;
        cenarioInicialConsumo[i] = cenarioInicial[i].consumo;
    }

    cenarioInicialDesign.shift();
    cenarioInicialConsumo.shift();

    //CENARIO FINAL
    var cenarioFinalConsumo = [];

    for (i = 1; i <= espacoCount; i++) {
        cenarioFinalConsumo[i] = cenarioFinal[i].consumoFinal;
    }
    cenarioFinalConsumo.shift();

    var maxChartValue = maxChart(cenarioInicialConsumo) > maxChart(cenarioFinalConsumo) ? maxChart(cenarioInicialConsumo) : maxChart(cenarioFinalConsumo);

    var ctx = document.getElementById("iluIntChart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: cenarioInicialDesign,
            datasets: [{
                label: 'Cenário Inicial',
                data: cenarioInicialConsumo,
                backgroundColor: 'rgba(53, 91, 183, 1)',
                borderColor: 'rgba(53, 91, 183, 1)',
                borderWidth: 1
            }, {
                label: 'Cenário Final',
                data: cenarioFinalConsumo,
                backgroundColor: 'rgba(95, 160, 55, 1)',
                borderColor: 'rgba(95, 160, 55, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: maxChartValue,
                        callback: function (value, index, values) {
                            return value.toFixed(0) + ' kWh';
                        }
                    }
                }],
                xAxes: [{
                    ticks: {
                        autoSkip: false,
                        maxRotation: 90,
                        minRotation: 90
                    }
                }]
            },
            title: {
                display: true,
                text: 'Consumo anual de energia (kWh)',
                fontSize: 16,
                fontColor: '#0099cc'
            }
        }
    });
}

function iluExtChart() {
    var maxChartValue = 0;  
    //CENARIO INICIAL
    var cenarioInicialDesign = [];
    var cenarioInicialConsumo = [];

    for (i = 1; i <= espacoCount; i++) {
        cenarioInicialDesign[i] = cenarioInicial[i].designacao;
        cenarioInicialConsumo[i] = cenarioInicial[i].consumo.toFixed(0);
    }

    cenarioInicialDesign.shift();
    cenarioInicialConsumo.shift();

    //CENARIO FINAL
    var cenarioFinalConsumo = [];

    for (i = 1; i <= espacoCount; i++) {
        cenarioFinalConsumo[i] = cenarioFinal[i].consumoFinal.toFixed(0);
    }
    cenarioFinalConsumo.shift();

    maxChartValue = maxChart(cenarioInicialConsumo) > maxChart(cenarioFinalConsumo) ? maxChart(cenarioInicialConsumo) : maxChart(cenarioFinalConsumo);

    var ctx = document.getElementById("iluIntChart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: cenarioInicialDesign,
            datasets: [{
                label: 'Cenário Inicial',
                data: cenarioInicialConsumo,
                backgroundColor: 'rgba(53, 91, 183, 1)',
                borderColor: 'rgba(53, 91, 183, 1)',
                borderWidth: 1
            }, {
                label: 'Cenário Final',
                data: cenarioFinalConsumo,
                backgroundColor: 'rgba(95, 160, 55, 1)',
                borderColor: 'rgba(95, 160, 55, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: maxChartValue,
                        callback: function (value, index, values) {
                            return value.toFixed(0) + ' kWh';
                        }
                    }
                }],
                xAxes: [{
                    ticks: {
                        autoSkip: false,
                        maxRotation: 90,
                        minRotation: 90
                    }
                }]
            },
            title: {
                display: true,
                text: 'Consumo anual de energia (kWh)',
                fontSize: 16,
                fontColor: '#0099cc'
            }
        }
    });
}

function nextStep() {
    var id = $('.step:visible').data('id');
    var nextId = $('.step:visible').data('id') + 1;
    $('[data-id="' + id + '"]').hide();
    $('[data-id="' + nextId + '"]').show();

    if ($('.anterior:hidden').length > 1) {
        $('.anterior').show();
        $('.custo-iluminacao-box').hide();
        $('#tipo-iluminacao').attr('disabled', 'disabled').addClass('sel-disable');
        $('#disclaimer').hide();
    }

    if (nextId == 2) {
        $(".dados-titulo").hide();
        $('.but-2').hide();
        $('.recolhe-medidas-but').show();
        $('.end-step').hide();
        $('#disclaimer').hide();
    }

    if (nextId == 3) {
        $('.but-2').hide();
        $('.recolhe-medidas-but').hide();
        $('.end-step').show();
        $('.print_pdf').hide();
        $('#disclaimer').hide();
    }

    if (nextId == 4) {
        $('.but-2').hide();
        $('.recolhe-medidas-but').hide();
        $('.end-step').show();
        $('#reload-but').show();
        $('.print_pdf').show()
        $('.resumo-but').hide();
        $('#disclaimer').show();
    }
    
    location.hash = "html";
}

function prevStep() {
    var id = $('.step:visible').data('id');
    var prevId = $('.step:visible').data('id') - 1;
    $('[data-id="' + id + '"]').hide();
    $('[data-id="' + prevId + '"]').show();

    if (prevId == 1) {
        $(".dados-titulo").show();
        $('.but-2').show();
        $('.recolhe-medidas-but').hide();
        $('.end-step').hide();
        $('.anterior').hide();
        $('.custo-iluminacao-box').show();
        $('#tipo-iluminacao').removeAttr('disabled', 'disabled').removeClass('sel-disable');
        $('#disclaimer').hide();
    }

    if (prevId == 2) {
        $('.but-2').hide();
        $('.recolhe-medidas-but').show();
        $('.end-step').hide();
        $('#disclaimer').hide();
    }

    if (prevId == 3) {
        $('.final-graph #iluIntChart').remove();
        $('.final-graph').append('<canvas id="iluIntChart" width="400" height="400"></canvas>');

        $('.but-2').hide();
        $('.recolhe-medidas-but').hide();
        $('.end-step').show();
        $('#reload-but').hide();
        $('.print_pdf').hide()
        $('.resumo-but').show();
        $('#disclaimer').hide();
    }
    
    location.hash = "html";
}

$(document).ready(function () {
    buildTipoIluminacao();

    $('#reload-but').click(function () {
        location.reload();
    });

    $('#tipo-iluminacao').change(function () {
        if ($('#tipo-iluminacao').val() == 0 && $('#tipo-iluminacao').val() != "") {
            $("#exterior-ilu").hide();
            $("#interior-ilu").show();
        } else if ($('#tipo-iluminacao').val() == 1 && $('#tipo-iluminacao').val() != "") {
            $("#exterior-ilu").show();
            $("#interior-ilu").hide();
        }
    });

    $('#ilu-form').validate({
        rules: {
            'tipo-iluminacao': {
                required: true
            },
            'custo-unit-iluminacao': {
                required: true,
                min: 0.01,
                max: 1,
                step: 0.0001
            }
        },
        messages: {
            'tipo-iluminacao': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            },
            'custo-unit-iluminacao': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>',
                min: '<label style="font-size: 14px; color: red;">O custo unitário mínimo é de 0.01€/kWh</label>',
                max: '<label style="font-size: 14px; color: red;">O custo unitário máximo é de 1,00€/kWh</label>',
                step: '<label style="font-size: 14px; color: red;">O passo de incremento é de 0.0001</label>',
                number: '<label style="font-size: 14px; color: red;">Introduza números com (.) em vez de (,)</label>'
            }
        }
    });

    $(".fonte-luz-but").click(function () {
        
        if($("#tipo-iluminacao").val()=="" || $("#tipo-iluminacao").val() == undefined){
            alert("Não é possível avançar sem selecionar o tipo de iluminação.");
        }else if(espacoCount<=0){
            alert("Não é possível avançar sem espaços definidos.");
        }else{        
            if ($("#ilu-form").valid() && espacoCount>0) {
                recolheDados();
                nextStep();
                buildFonteLuz();
            }
        }   
    });

    $(".medidas-but").click(function () {
        if ($("#ilu-form").valid()) {
            recolheFonteLuz();
            nextStep();
            firstTimeMedidas = false;
            buildMedidas();
            calculaCenarioInicial();
        }
    });
    $(".resumo-but").click(function () {
        if ($("#ilu-form").valid()) {
            recolheMedidas();
            nextStep();
            calculaCenarioFinal();
            calculaInvestimento();
            buildResumo();
        }
    });
});

function printCanvas() {
    html2canvas(document.body).then(function(canvas) {
        document.body.appendChild(canvas);
    });

    /*const error = document.getElementById('errorILU').outerHTML;
    const resumo_table = document.getElementById('resumo-table-graphic').outerHTML;
    const dataUrl = document.getElementById('iluIntChart').toDataURL();

    let windowContent = '<!DOCTYPE html>';
    windowContent += '<html>';
    windowContent += '<head><title>ECO.AP - Calculadora - Iluminação</title></head>';
    windowContent += '<body>';
    windowContent += '<main class="main container">';
    windowContent += '<form id="ilu-form">';
    windowContent += '<div class="row">';
    windowContent += '<div class="col-md-12">';
    windowContent += '<div class="main-content">';
    windowContent += '<div class="dados">';
    windowContent += '<div class="dados-child">';
    windowContent += '<div id="resumo" class="step">';
    windowContent += '<h2 class="resumo-title">Resumo - Resultados</h2>';
    windowContent += error;

    windowContent += '<div class="col-md-5">';
    windowContent += resumo_table;
    windowContent += '</div>';

    windowContent += '<div class="col-md-7 final-graph">';
    windowContent += '<img src="' + dataUrl + '">';
    windowContent += '</div>';
   
    windowContent += '</div>';
    windowContent += '</div>';
    windowContent += '</div>';
    windowContent += '</div>';
    windowContent += '</div>';
    windowContent += '</div>';
    windowContent += '</form>';
    windowContent += '</main>';
    windowContent += '</body>';
    windowContent += '</html>';*/
    
    /*const printWin = window.open('', '', 'width=' + screen.availWidth + ',height=' + screen.availHeight);
    printWin.document.open();
    printWin.document.write(windowContent);

    printWin.document.addEventListener('load', function () {
        printWin.focus();
        printWin.print();
        printWin.document.close();
        printWin.close();
    }, true);*/
}