//todo alterar o check dados para guardar tambem o custo unitario (que pode ser alterado)
/*DECLARATIONS*/
const INTERIOR = "Iluminação interior";
const EXTERIOR = "Iluminação exterior";

var estado = "";

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
var espacoCount = 0;

var tabelaCount = 0;

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

var espaco = [
    {
        //id: espacoCount,
        id: tabelaCount,
        tipologia: "",
        designacao: "",
        area: ""
    }
];

var tipoFonteLuz = [
    {
        tipo: "Fluorescente Compacta",
        rendimento: 60,
        acessorios: 10,
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
        acessorios: 10,
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
        acessorios: 20,
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
        acessorios: 15,
        potencia: [
            100,
            150,
            250
        ],
        aplicacaoPotencia: [
            EXTERIOR,
            EXTERIOR,
            EXTERIOR
        ]
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
        tipo: "Outra",
        rendimento: "", //a definir pelo utilizador
        acessorios: 10,
        potencia: "",
        aplicacaoPotencia: ""
    },
    {
        tipo: "Vapor de Mercúrio",
        rendimento: 45,
        acessorios: 15,
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
        acessorios: 20,
        potencia: [
            70,
            100,
            150
        ],
        aplicacaoPotencia: [
            EXTERIOR,
            EXTERIOR,
            EXTERIOR
        ]
    },

];