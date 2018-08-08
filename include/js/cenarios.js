function calculaCenarioInicial() {
    cenarioInicial = [
        {
            espacoNum: 0,
            designacao: "",
            potencia: "",
            consumo: "",
            custoEnergia: "",
            fluxoLuminoso: "",
            iluminancia: "",
            iluminanciaAdequada: "",
            dpi: "",
            dpiMax: ""
        }
    ];
    var potenciaFL = 0;
    var acessorios = 0;
    var rendimento = 0;
    var custoUnitario = 0;
    var potenciaInicial = 0;
    var consumoInicial = 0;
    var custoEnergiaInicial = 0;
    var fluxoLuminosoInicial = 0;
    var iluminanciaInicial = 0;
    var iluminanciaRecomendada = 0;
    var dpiMaximo = 0;
    var dpiInicial = 0;
    var totalPotenciaInicial = 0;
    var totalConsumoInicial = 0;
    var totalCustoEnergiaInicial = 0;
    var totalFluxoLuminosoInicial = 0;

    for (var i = 1; i <= espacoCount; i++) {
//    if(fonteLuz[i].tipo == OUTROS){
        potenciaFL = fonteLuz[i].potencia;
//    }else{
//      potenciaFL = tipoFonteLuz[fonteLuz[i].tipo].potencia[fonteLuz[i].potencia];
//    }
        acessorios = tipoFonteLuz[fonteLuz[i].tipo].acessorios;
        custoUnitario = tipoInstalacao[estadoNum].custo_unit;
        potenciaInicial = calculaPotenciaInicial(fonteLuz[i].quantidade, potenciaFL, acessorios);
        consumoInicial = calculaConsumoInicial(potenciaInicial, fonteLuz[i].horasFuncionamento);
        custoEnergiaInicial = calculaCustoEnergiaInicial(consumoInicial, custoUnitario);
        rendimento = fonteLuz[i].rendimento;

        //rendimento = tipoFonteLuz[fonteLuz[i].tipo].rendimento;
        fluxoLuminosoInicial = calculaFluxoLuminosoInicial(fonteLuz[i].quantidade, potenciaFL, rendimento);
        if (estado == INTERIOR) {
            iluminanciaInicial = calculaIluminanciaInicial(fluxoLuminosoInicial, espaco[i].area);
            iluminanciaRecomendada = tipoTipologia[espaco[i].tipologia].iluminanciaRecomendada;
            dpiMaximo = tipoTipologia[espaco[i].tipologia].dpiMax;
            dpiInicial = calclulaDpiInicial(potenciaInicial, espaco[i].area, iluminanciaInicial);
        }
        //calcula o total dos campos
        totalPotenciaInicial += potenciaInicial;
        totalConsumoInicial += consumoInicial;
        totalCustoEnergiaInicial += custoEnergiaInicial;
        totalFluxoLuminosoInicial += fluxoLuminosoInicial;

        cenarioInicial.push({
            espacoNum: fonteLuz[i].espacoNum,
            designacao: fonteLuz[i].designacao,
            potencia: potenciaInicial,
            consumo: consumoInicial,
            custoEnergia: custoEnergiaInicial,
            fluxoLuminoso: fluxoLuminosoInicial,
            iluminancia: iluminanciaInicial,
            iluminanciaAdequada: iluminanciaRecomendada,
            dpi: dpiInicial,
            dpiMax: dpiMaximo
        });
        //Adiciona o total
        cenarioInicial[TOTAL].potencia = totalPotenciaInicial;
        cenarioInicial[TOTAL].consumo = totalConsumoInicial;
        cenarioInicial[TOTAL].custoEnergia = totalCustoEnergiaInicial;
        cenarioInicial[TOTAL].fluxoLuminoso = totalFluxoLuminosoInicial;
    }
    //alert(JSON.stringify(cenarioInicial));
}

function calculaCenarioFinal() {
    cenarioFinal = [
        {
            espacoNum: 0,
            designacao: "",
            potencia: "",
            fonteLuz: "",
            reguladoresFluxo: "",
            sensores: "",
            sistemaGestao: "",
            consumoFinal: "",
            custoEnergia: "",
            reducaoAnual: ""
        }
    ];
    var potenciaFinal = 0;
    var fonteLuzFinal = 0;
    var reguladoresFinal = 0;
    var sensoresFinal = 0;
    var sistemaGestaoFinal = 0;
    var consumoFinal = 0;
    var custoEnergiaFinal = 0;
    var reducaoAnualFinal = 0;

    var poupancaReguladores = 0;
    var poupancaSensores = 0;
    var poupancaSistemaGestao = 0;

    var totalPotencia = 0;
    var totalFonteLuz = 0;
    var totalReguladores = 0;
    var totalSensores = 0;
    var totalSistemaGestao = 0;
    var totalConsumo = 0;
    var totalCustoEnergia = 0;
    var totalReducao = 0;

    for (var i = 1; i <= espacoCount; i++) {

        
            poupancaReguladores = 0;
            poupancaSensores = 0;
            poupancaSistemaGestao = 0;
            sistemaGestaoFinal = 0;
            sensoresFinal = 0;
            if(fonteLuz[i].rendimento!=tipoFonteLuz[fonteLuz[i].tipo].rendimento && (medidasDados[i].fonteLuz==null || medidasDados[i].fonteLuz==undefined || medidasDados[i].fonteLuz=="")){
                potenciaFinal = calculaPotenciaFinal(cenarioInicial[i].fluxoLuminoso,fonteLuz[i].rendimento);
            }else if(medidasDados[i].fonteLuz!=undefined && medidasDados[i].fonteLuz!="" && medidasDados[i].fonteLuz!=null && medidasDados[i].fonteLuz>=0){
                potenciaFinal = calculaPotenciaFinal(cenarioInicial[i].fluxoLuminoso, medidas[medidasDados[i].fonteLuz].poupanca);
            }else{
                potenciaFinal = cenarioInicial[i].potencia;
            }
            
            fonteLuzFinal = calculaFonteLuzFinal(cenarioInicial[i].consumo, potenciaFinal, fonteLuz[i].horasFuncionamento);
            medidas.forEach(function (medida) {
                if (medida.tipo.match(estado) && medidasDados[i].reguladoresFluxo == SIM) {
                    poupancaReguladores = medida.poupanca;
                }
            });
            reguladoresFinal = calculaMedidasSimNaoFinal(potenciaFinal, poupancaReguladores, fonteLuz[i].horasFuncionamento);
            if (estado == INTERIOR) {
                if (medidasDados[i].sensores == SIM) {
                    medidas.forEach(function (medida) {
                        if (medida.tipo === SENSORES) {
                            poupancaSensores = medida.poupanca;
                        }
                    });
                    sensoresFinal = calculaMedidasSimNaoFinal(potenciaFinal, poupancaSensores, fonteLuz[i].horasFuncionamento);
                }
            }
            if (medidasDados[i].sistemaGestao == SIM) {
                medidas.forEach(function (medida) {
                    if (medida.tipo === SISTEMAS_GESTAO) {
                        poupancaSistemaGestao = medida.poupanca;
                    }
                });
                sistemaGestaoFinal = calculaMedidasSimNaoFinal(potenciaFinal, poupancaSistemaGestao, fonteLuz[i].horasFuncionamento);
            }
            consumoFinal = calculaConsumoFinal(cenarioInicial[i].consumo, fonteLuzFinal, reguladoresFinal, sensoresFinal, sistemaGestaoFinal);
            custoEnergiaFinal = calculaCustoEnergiaFinal(consumoFinal, tipoInstalacao[estadoNum].custo_unit);
            reducaoAnualFinal = calculaReducaoAnualFinal(cenarioInicial[i].consumo, consumoFinal);

            totalPotencia += potenciaFinal;
            totalFonteLuz += fonteLuzFinal;
            totalReguladores += reguladoresFinal;
            totalSensores += sensoresFinal;
            totalSistemaGestao += sistemaGestaoFinal;
            totalConsumo += consumoFinal;
            totalCustoEnergia += custoEnergiaFinal;
            totalReducao += reducaoAnualFinal;

            cenarioFinal.push({
                espacoNum: medidasDados[i].espacoNum,
                designacao: medidasDados[i].designacao,
                potencia: potenciaFinal,
                fonteLuz: fonteLuzFinal,
                reguladoresFluxo: reguladoresFinal,
                sensores: sensoresFinal,
                sistemaGestao: sistemaGestaoFinal,
                consumoFinal: consumoFinal,
                custoEnergia: custoEnergiaFinal,
                reducaoAnual: reducaoAnualFinal
            });
        
    }
    cenarioFinal[TOTAL].potencia = totalPotencia;
    cenarioFinal[TOTAL].fonteLuz = totalFonteLuz;
    cenarioFinal[TOTAL].reguladoresFluxo = totalReguladores;
    cenarioFinal[TOTAL].sensores = totalSensores;
    cenarioFinal[TOTAL].sistemaGestao = totalSistemaGestao;
    cenarioFinal[TOTAL].consumoFinal = totalConsumo;
    cenarioFinal[TOTAL].custoEnergia = totalCustoEnergia;
    cenarioFinal[TOTAL].reducaoAnual = (cenarioInicial[TOTAL].consumo - cenarioFinal[TOTAL].consumoFinal) / cenarioInicial[TOTAL].consumo;
    //alert(JSON.stringify(cenarioFinal));
}

function calculaInvestimento() {
    investimento = [
        {
            espacoNum: 0,
            designacao: "",
            fonteLuz: "",
            reguladoresFluxo: "",
            sensores: "",
            sistemaGestao: "",
            investimento: "",
            reducaoCustos1: "",
            reducaoCustos2: "",
            pri: ""
        }
    ];
    var investimentoFL = 0;

    var fonteLuzInvestimento = 0;
    var reguladoresFluxo = 0;
    var sensores = 0;
    var sistemaGestao = 0;
    var investimentoInv = 0;
    var reducaoCustos1 = 0;
    var reducaoCustos2 = 0;
    var pri = 0;

    var totalFonteLuz = 0;
    var totalReguladores = 0;
    var totalSensores = 0;
    var totalSistemaGestao = 0;
    var totalInvestimento = 0;
    var totalReducaoCustos1 = 0;
    var totalReducaoCustos2 = 0;
    var totalPri = 0;

    for (var i = 1; i <= espacoCount; i++) {
            reguladoresFluxo = 0;
            sensores = 0;
            sistemaGestao = 0;
            fonteLuzInvestimento = 0;
            if(medidasDados[i].fonteLuz!=undefined && medidasDados[i].fonteLuz!="" && medidasDados[i].fonteLuz>=0){
                investimentoFL = medidas[medidasDados[i].fonteLuz].investimento;
                if (fonteLuz[i].quantidade >= descontoInvestimento[0].quantidade) {
                    fonteLuzInvestimento = calculaMedidasInvestimento(investimentoFL, cenarioFinal[i].potencia);
                    fonteLuzInvestimento *= (1 - descontoInvestimento[0].desconto);
                } else if (fonteLuz[i].quantidade >= descontoInvestimento[1].quantidade) {
                    fonteLuzInvestimento = calculaMedidasInvestimento(investimentoFL, cenarioFinal[i].potencia);
                    fonteLuzInvestimento *= (1 - descontoInvestimento[1].desconto);
                } else {
                    fonteLuzInvestimento = calculaMedidasInvestimento(investimentoFL, cenarioFinal[i].potencia);
                }
            }else{
                fonteLuzInvestimento = 0;
            }
            medidas.forEach(function (medida) {
                if ((medidasDados[i].reguladoresFluxo == SIM) && (medida.tipo.match(estado))) {
                    reguladoresFluxo = calculaMedidasInvestimento(medida.investimento, cenarioFinal[i].potencia);
                } else if ((medidasDados[i].sensores == SIM) && (medida.tipo === SENSORES) && (estado == INTERIOR)) {
                    sensores = calculaMedidasInvestimento(medida.investimento, cenarioFinal[i].potencia);
                } else if ((medidasDados[i].sistemaGestao == SIM) && (medida.tipo === SISTEMAS_GESTAO)) {
                    sistemaGestao = calculaMedidasInvestimento(medida.investimento, cenarioFinal[i].potencia);
                }
            });
            investimentoInv = calculaInvestimentoResultadoInvestimento(fonteLuzInvestimento, reguladoresFluxo, sensores, sistemaGestao);
            reducaoCustos1 = calculaReducaoCustos1Investimento(cenarioInicial[i].custoEnergia, cenarioFinal[i].custoEnergia);
            reducaoCustos2 = calculaReducaoCustos2Investimento(reducaoCustos1, cenarioInicial[i].custoEnergia);
            pri = calculaPriInvestimento(investimentoInv, reducaoCustos1);

            //calcula o total dos campos
            totalFonteLuz += fonteLuzInvestimento;
            totalReguladores += reguladoresFluxo;
            totalSensores += sensores;
            totalSistemaGestao += sistemaGestao;
            totalInvestimento += investimentoInv;
            totalReducaoCustos1 += reducaoCustos1;
            totalReducaoCustos2 += reducaoCustos2;
            totalPri += pri;

            investimento.push({
                espacoNum: medidasDados[i].espacoNum,
                designacao: medidasDados[i].designacao,
                fonteLuz: fonteLuzInvestimento,
                reguladoresFluxo: reguladoresFluxo,
                sensores: sensores,
                sistemaGestao: sistemaGestao,
                investimento: investimentoInv,
                reducaoCustos1: reducaoCustos1,
                reducaoCustos2: reducaoCustos2,
                pri: pri
            });
    }
    investimento[TOTAL].fonteLuz = totalFonteLuz;
    investimento[TOTAL].reguladoresFluxo = totalReguladores;
    investimento[TOTAL].sensores = totalSensores;
    investimento[TOTAL].sistemaGestao = totalSistemaGestao;
    investimento[TOTAL].investimento = totalInvestimento;
    investimento[TOTAL].reducaoCustos1 = totalReducaoCustos1;
    investimento[TOTAL].reducaoCustos2 = totalReducaoCustos2;
    investimento[TOTAL].pri = calculaPriInvestimento(totalInvestimento, totalReducaoCustos1);
   
}
