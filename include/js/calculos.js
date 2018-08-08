// TABELAS CALCULOS //
function totalQtFonteLuz() {
    var total = 0;
    var quantidade = 0;
    for (var i = 1; i <= espacoCount; i++) {
      quantidade = new Number($("#quantidade-fonte-luz" + i).val());
      total += quantidade;
    }
    $("#total-fonte-luz-row").find("td").eq(1).html(total);
}

function totalPotenciaFonteLuz() {
  var potenciaQuantidade = 0;
  var potenciaIndex = 0;
  var tipoLuzIndex = 0;
  var quantidade = 0;
  var total = 0;
  var potencia = 0;
  for (var i = 1; i <= espacoCount; i++) {

    //added increment i value because when you get this values, they exist two times, so in the specific 
    //case of OUTROS he read the same data two times and because of that it add it to total
    quantidade = $("#quantidade-fonte-luz" + i).val();
    tipoLuzIndex = $("#tipo-fonte-luz" + i).val();
    if (tipoLuzIndex == OUTROS){
      potencia = $("#potencia-fonte-luz-input" + i).val();
      potenciaQuantidade = new Number(quantidade) * new Number(potencia);

      i++;
    }
    else {
      potenciaIndex = $("#potencia-fonte-luz" + i).val();
      if (potenciaIndex == "")
        potenciaQuantidade = 0;
      else
        potenciaQuantidade = new Number(quantidade) * new Number(tipoFonteLuz[tipoLuzIndex].potencia[potenciaIndex]);
    }    
    
    total += potenciaQuantidade;
  }
  
  $("#total-fonte-luz-row").find("td").eq(2).html(total + "W");
}

function totalArea() {
  var total = 0;
  var area = 0;
  for (var i = 1; i <= espacoCount; i++) {
    area = new Number($("#area"+i).val());
    total += area;
  }
  $("#total-area").html(total + " m2");
}

function calculaAP_BP(potenciaFL, rendimentoFL, rendimentoLED) {
    return (potenciaFL * rendimentoFL) / rendimentoLED;
}

// CENARIOS CALCULOS // 
function calculaPotenciaInicial(quantidade, potencia, acessorios) {
  return quantidade * potencia * (1 + acessorios);
}

function calculaConsumoInicial(potenciaInicial, horasFuncionamento) {
  return potenciaInicial * horasFuncionamento / 1000;
}

function calculaCustoEnergiaInicial(consumoInicial, custoUnitario) {
  return consumoInicial * custoUnitario;
}

function calculaFluxoLuminosoInicial(quantidade, potencia, rendimento) {
  return quantidade * potencia * rendimento;
}

function calculaIluminanciaInicial(fluxoLuminosoInicial, area) {
  return fluxoLuminosoInicial / area;
}

function calclulaDpiInicial(potenciaInicial, area, iluminanciaInicial) {
  return potenciaInicial / area / iluminanciaInicial * 100;
}

function calculaPotenciaFinal(fluxoLuminosoInicial, poupancaMedidasFL) {
  return fluxoLuminosoInicial / poupancaMedidasFL;
}

function calculaFonteLuzFinal(consumoInicial, potenciaFinal, horasFuncionamento) {
  return consumoInicial - (potenciaFinal * horasFuncionamento / 1000);
}

function calculaMedidasSimNaoFinal(potenciaFinal, poupanca, horasFuncionamento) {
  return potenciaFinal * poupanca * horasFuncionamento / 1000;
}

function calculaConsumoFinal(consumoInicial, fonteLuzFinal, reguladoresFinal, sensoresFinal, sistemaGestaoFinal) {
  return consumoInicial - fonteLuzFinal - reguladoresFinal - sensoresFinal - sistemaGestaoFinal;
}

function calculaCustoEnergiaFinal(consumoFinal, custoUnitario) {
  return consumoFinal * custoUnitario;
}

function calculaReducaoAnualFinal(consumoInicial, consumoFinal) {
  return (consumoInicial - consumoFinal) / consumoInicial;
}

function calculaMedidasInvestimento(investimentoFL, potenciaFinal) {
  return (investimentoFL * potenciaFinal) / 1000;
}

function calculaInvestimentoResultadoInvestimento(fonteLuzInv, reguladoresInv, sensoresInv, sistemaGestaoInv) {
  return fonteLuzInv + reguladoresInv + sensoresInv + sistemaGestaoInv;
}

function calculaReducaoCustos1Investimento(custoEnergiaInicial, custoEnergiaFinal) {
  return custoEnergiaInicial - custoEnergiaFinal;
}

function calculaReducaoCustos2Investimento(reducaoCustos1, custoEnergiaInicial) {
  return reducaoCustos1 / custoEnergiaInicial;
}

function calculaPriInvestimento(investimentoInv, reducaoCustos1) {
  return investimentoInv / reducaoCustos1;
}
