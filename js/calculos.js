// TABELAS CALCULOS //
function totalQtFonteLuz(elementos) {
    var total = 0;
    var quantidade = 0;
    for (var i = 1; i < elementos.length; i++) {
      quantidade = new Number($(elementos[i]).val());
      total += quantidade;
    }
    return total;
}

function totalPotenciaFonteLuz(elementos) {
  var potenciaQuantidade = 0;
  var potenciaIndex = 0;
  var tipoLuzIndex = 0;
  var quantidade = 0;
  var total = 0;
  var potencia = 0;
  for (var i = 1; i < elementos.length; i++) {

    //duvidas é só dizer ;) Filipe Calha
    //added increment i value because when you get this values, they exist two times, so in the specific 
    //case of OUTROS he read the same data two times and because of that it add it to total
    quantidade = $(elementos[i]).parent("td").parent("tr").find("td").eq(2).find("input").val();
    tipoLuzIndex = $(elementos[i]).parent("td").parent("tr").find("td").eq(3).find("select").val();
    if (tipoLuzIndex == OUTROS){
      potencia = $(elementos[i]).parent("td").parent("tr").find("td").eq(5).find("input").val();
      potenciaQuantidade = new Number(quantidade) * new Number(potencia);

      i++;
    }
    else {
      potenciaIndex = $(elementos[i]).val();
      if (potenciaIndex == "")
        potenciaQuantidade = 0;
      else
        potenciaQuantidade = new Number(quantidade) * new Number(tipoFonteLuz[tipoLuzIndex].potencia[potenciaIndex]);
    }    
    
    total += potenciaQuantidade;
  }
  return total;
}

function totalArea(elementos) {
  var total = 0;
  var area = 0;
  for (var i = 1; i < elementos.length; i++) {
    area = new Number($(elementos[i]).val());
    total += area;
  }
  return total;
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
