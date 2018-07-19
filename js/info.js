const INTERIOR = "Iluminação interior";
const EXTERIOR = "Iluminação exterior";
const INT = 0;
const EXT = 1;
const TOTAL = 0;
const SIM = 0;
const NAO = 1;
const FONTE_LUZ = "Fonte de luz";
const REGULADORES = "Reguladores de fluxo";
const SENSORES = "Sensores de presença / movimento / luminosidade";
const SISTEMAS_GESTAO = "Sistemas de Gestão";
const AP = "Retrofit LED (AP)";
const BP = "Retrofit LED (BP)";
const INICIAL = 0;
const FINAL = 1;
const LED = 6;
const OUTROS = 9;

//Faz o estado para não mostrar o que tiver seleccionado
var estadoPotenciaUnitFinal = "";

var estado = "";
var estadoNum = "";

//flag para nao acrescentar mais dados ao select do fonte luz
var firstTimeMedidas = true;

var horasAnuaisFunc = 4015;

var tipoInstalacao = [
  {
    nome: INTERIOR,
    custo_unit: 0.25
  },
  {
    nome: EXTERIOR,
    custo_unit: 0.15
  }
];

var tipoTipologia = [
  {
    nome: "Armazéns, arrumos e arquivos",
    dpiMax: 3.4,
    iluminanciaRecomendada: 200
  },
  {
    nome: "Cozinhas",
    dpiMax: 3.4,
    iluminanciaRecomendada: 500
  },
  {
    nome: "Enfermarias e quartos individuais",
    dpiMax: 3.8,
    iluminanciaRecomendada: 300
  },
  {
    nome: "Sala de desenho",
    dpiMax: 2.1,
    iluminanciaRecomendada: 750
  },
  {
    nome: "Escritório",
    dpiMax: 2.4,
    iluminanciaRecomendada: 500
  },
  {
    nome: "Hall/Entrada, corredores e escadas",
    dpiMax: 3.8,
    iluminanciaRecomendada: 300
  },
  {
    nome: "Instalações sanitárias",
    dpiMax: 3.8,
    iluminanciaRecomendada: 200
  },
  {
    nome: "Laboratórios, salas de exame, blocos operatórios",
    dpiMax: 2.4,
    iluminanciaRecomendada: 1000
  },
  {
    nome: "Lojas de comércio e serviços",
    dpiMax: 3.4,
    iluminanciaRecomendada: 500
  },
  {
    nome: "Parques de estacionamento interiores",
    dpiMax: 3.4,
    iluminanciaRecomendada: 200
  },
  {
    nome: "Polidesportivos, ginásios e similares",
    dpiMax: 3.4,
    iluminanciaRecomendada: 500
  },
  {
    nome: "Sala de reuniões, auditórios",
    dpiMax: 2.4,
    iluminanciaRecomendada: 500
  },
  {
    nome: "Salas de aula, salas de leitura, biblioteca",
    dpiMax: 2.4,
    iluminanciaRecomendada: 750
  },
  {
    nome: "Salas de espera",
    dpiMax: 3.8,
    iluminanciaRecomendada: 300
  },
  {
    nome: "Salas de pré e pós operatório",
    dpiMax: 3.4,
    iluminanciaRecomendada: 750
  },
  {
    nome: "Salas de refeições",
    dpiMax: 3.8,
    iluminanciaRecomendada: 300
  },
  {
    nome: "Salas técnicas (centros de dados, fotocópias e similares)",
    dpiMax: 3.4,
    iluminanciaRecomendada: 500
  },
  {
    nome: "Showroom e salas de exposição, museus",
    dpiMax: 2.4,
    iluminanciaRecomendada: 500
  }
];

var tipoFonteLuz = [
  {
    tipo: "Fluorescente Compacta",
    rendimento: 60,
    acessorios: 10/100,
    potencia: [
      11,
      18,
      26
    ],
    aplicacaoPotencia: [
      INTERIOR,
      INTERIOR,
      INTERIOR
    ],
    medidas: "0,2,3"
  },
  {
    tipo: "Fluorescente Tubular - T5",
    rendimento: 95,
    acessorios: 10/100,
    potencia: [
      14,
      28,
      49
    ],
    aplicacaoPotencia: [
      INTERIOR,
      INTERIOR,
      INTERIOR
    ],
        medidas: "0,2,3"
  },
  {
    tipo: "Fluorescente Tubular - T8",
    rendimento: 80,
    acessorios: 20/100,
    potencia: [
      18,
      36,
      58
    ],
    aplicacaoPotencia: [
      INTERIOR,
      INTERIOR,
      INTERIOR
    ],
        medidas: "0,1,2,3"
  },
  {
    tipo: "Halogéneo",
    rendimento: 20,
    acessorios: 0,
    potencia: [
      25,
      50,
      75
    ],
    aplicacaoPotencia: [
      INTERIOR,
      INTERIOR,
      INTERIOR
    ],
        medidas: "0,2,3"
  },
  {
    tipo: "Incandescente",
    rendimento: 10,
    acessorios: 0,
    potencia: [
      25,
      40,
      60
    ],
    aplicacaoPotencia: [
      INTERIOR,
      INTERIOR,
      INTERIOR
    ],
    medidas: "0,2,3"
  },
  {
    tipo: "Iodetos Metálicos",
    rendimento: 70,
    acessorios: 15/100,
    potencia: [
      100,
      150,
      250
    ],
    aplicacaoPotencia: [
      EXTERIOR,
      EXTERIOR,
      EXTERIOR
    ],
    medidas: "0,2,3"
  },
  {
    tipo: "LED",    //predefinida
    rendimento: 120,
    acessorios: 0,
    potencia: [
      5,
      10,
      20,
      30,
      40,
      50,
      75,
      100
    ],
    aplicacaoPotencia: [
      INTERIOR,
      INTERIOR,
      INTERIOR + ";" + EXTERIOR,
      INTERIOR + ";" + EXTERIOR,
      INTERIOR + ";" + EXTERIOR,
      EXTERIOR,
      EXTERIOR,
      EXTERIOR
    ],
    medidas: ""
  },
  {
    tipo: "Vapor de Mercúrio",
    rendimento: 45,
    acessorios: 15/100,
    potencia: [
      80,
      125,
      250
    ],
    aplicacaoPotencia: [
      EXTERIOR,
      EXTERIOR,
      EXTERIOR
    ],
    medidas: "0,2,3"
  },
  {
    tipo: "Vapor de Sódio",
    rendimento: 70,
    acessorios: 20/100,
    potencia: [
      70,
      100,
      150
    ],
    aplicacaoPotencia: [
      EXTERIOR,
      EXTERIOR,
      EXTERIOR
    ],
    medidas: "0,2,3"
  },
  {
    tipo: "Outra",
    rendimento: "", //a definir pelo utilizador
    acessorios: 0,
    potencia: 0,
    aplicacaoPotencia: [
      INTERIOR + ";" + EXTERIOR
    ],
    medidas: "0,2,3"
  }
];

var luminosidade = [
  {
    nome: "Adequada",
    percentagem: ""
  },
  {
    nome: "Excessiva",
    percentagem: 120/100
  },
  {
    nome: "Insuficiente",
    percentagem: 80/100
  }
];

var tipoMedidas = [
  "Sim",
  "Não"
];

var medidas = [
  {
    nome: "Conversão para LED",
    tipo: FONTE_LUZ,
    poupanca: 120,
    investimento: 3000
  },
  {
    nome: "Conversão para T5",
    tipo: FONTE_LUZ,
    poupanca: 86.5,
    investimento: 1500
  },
  {
    nome: "Retrofit LED (AP)",
    tipo: FONTE_LUZ,
    poupanca: 120,
    investimento: 1500
  },
  {
    nome: "Retrofit LED (BP)",
    tipo: FONTE_LUZ,
    poupanca: 120,
    investimento: 2000
  },
  {
    nome: "Reguladores de fluxo (exterior)",
    tipo: REGULADORES + ";" + EXTERIOR,
    poupanca: 30/100,
    investimento: 1500
  },
  {
    nome: "Reguladores de fluxo (interior)",
    tipo: REGULADORES + ";" + INTERIOR,
    poupanca: 20/100,
    investimento: 1000
  },
  {
    nome: "Sensores de presença / movimento / luminosidade",
    tipo: SENSORES,
    poupanca: 10/100,
    investimento: 500
  },
  {
    nome: "Sistemas de Gestão",
    tipo: SISTEMAS_GESTAO,
    poupanca: 10/100,
    investimento: 2000
  }
];

var descontoInvestimento = [
  {
    quantidade: 100,
    desconto: 12.5/100
  },
  {
    quantidade: 500,
    desconto: 25/100
  }
];

var espacoCount = 0;

var tabelaCount = 0;

var espaco = [
  {
    id: espacoCount,
    tipologia: "",
    designacao: "",
    area: ""
  }
];

var fonteLuz = [
  {
    espacoNum: 0,
    designacao: "",
    quantidade: "",
    tipo: "",
    potencia: "",
    horasFuncionamento: ""
  }
];

var medidasDados = [
  {
    espacoNum: 0,
    designacao: "",
    fonteLuz: "",
    reguladoresFluxo: "",
    sensores: "",
    sistemaGestao: ""
  }
];

var cenarioInicial = [
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

var cenarioFinal = [
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

var investimento = [
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

var resumoCenarios = [
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

var resumoGeral = {
  reducaoCustos1: "",
  reducaoCustos2: "",
  investimento: "",
  payback: ""
};
