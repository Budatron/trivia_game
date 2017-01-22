/*jslint */
/*global AdobeEdge: false, window: false, document: false, console:false, alert: false */
(function (compId) {

    "use strict";
    var im='images/',
        aud='media/',
        vid='media/',
        js='js/',
        fonts = {
        },
        opts = {
            'gAudioPreloadPreference': 'auto',
            'gVideoPreloadPreference': 'auto'
        },
        resources = [
        ],
        scripts = [
        ],
        symbols = {
            "stage": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            id: 'fondo2',
                            type: 'image',
                            rect: ['-5px', '-37px', '1046px', '838px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"fondo.png",'0px','0px']
                        },
                        {
                            id: 'rayos2',
                            type: 'image',
                            rect: ['-339px', '-138px', '1807px', '1018px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"rayos.png",'0px','0px','100%','100%', 'no-repeat'],
                            transform: [[],[],[],['1.18','1.18']]
                        },
                        {
                            id: 'compradores2',
                            type: 'image',
                            rect: ['-437px', '-134px', '1920px', '1080px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"compradores.png",'0px','0px'],
                            transform: [[],[],[],['0','0']]
                        },
                        {
                            id: 'compradores',
                            type: 'image',
                            rect: ['-420px', '-134px', '1920px', '1080px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"compradores.png",'0px','0px'],
                            transform: [[],[],[],['0','0']]
                        },
                        {
                            id: 'camion1',
                            type: 'image',
                            rect: ['-457px', '-151px', '1920px', '1080px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"camion1.png",'0px','0px'],
                            transform: [[],[],[],['0','0']]
                        },
                        {
                            id: 'camion2',
                            type: 'image',
                            rect: ['-457px', '-151px', '1920px', '1080px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"camion2.png",'0px','0px'],
                            transform: [[],[],[],['0','0']]
                        },
                        {
                            id: 'camion3',
                            type: 'image',
                            rect: ['-457px', '-151px', '1920px', '1080px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"camion3.png",'0px','0px'],
                            transform: [[],[],[],['0','0']]
                        },
                        {
                            id: 'camion4',
                            type: 'image',
                            rect: ['-457px', '-151px', '1920px', '1080px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"camion4.png",'0px','0px'],
                            transform: [[],[],[],['0','0']]
                        },
                        {
                            id: 'dijeron',
                            type: 'image',
                            rect: ['-516px', '-96px', '1920px', '1080px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"dijeron.png",'0px','0px'],
                            transform: [[],[],[],['0','0']]
                        },
                        {
                            id: 'cien',
                            type: 'image',
                            rect: ['-430px', '-134px', '1920px', '1080px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"cien.png",'0px','0px'],
                            transform: [[],[],[],['0','0']]
                        },
                        {
                            id: 'vendedores',
                            type: 'image',
                            rect: ['-389px', '-134px', '1920px', '1080px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"vendedores.png",'0px','0px'],
                            transform: [[],[],[],['0','0']]
                        }
                    ],
                    style: {
                        '${Stage}': {
                            isStage: true,
                            rect: ['null', 'null', '1024px', '768px', 'auto', 'auto'],
                            overflow: 'hidden',
                            fill: ["rgba(255,255,255,1)"]
                        }
                    }
                },
                timeline: {
                    duration: 9905,
                    autoPlay: true,
                    data: [
                        [
                            "eid175",
                            "left",
                            2931,
                            0,
                            "easeOutBounce",
                            "${cien}",
                            '-430px',
                            '-430px'
                        ],
                        [
                            "eid169",
                            "left",
                            2931,
                            0,
                            "easeOutBounce",
                            "${compradores}",
                            '-420px',
                            '-420px'
                        ],
                        [
                            "eid158",
                            "left",
                            4320,
                            0,
                            "linear",
                            "${rayos2}",
                            '-339px',
                            '-339px'
                        ],
                        [
                            "eid157",
                            "scaleY",
                            1680,
                            773,
                            "easeOutBounce",
                            "${vendedores}",
                            '0',
                            '0.7'
                        ],
                        [
                            "eid132",
                            "scaleY",
                            1170,
                            780,
                            "easeOutBounce",
                            "${compradores}",
                            '0',
                            '0.5'
                        ],
                        [
                            "eid194",
                            "scaleY",
                            1170,
                            780,
                            "easeOutBounce",
                            "${camion4}",
                            '0',
                            '0.7'
                        ],
                        [
                            "eid193",
                            "scaleX",
                            1170,
                            780,
                            "easeOutBounce",
                            "${camion4}",
                            '0',
                            '0.7'
                        ],
                        [
                            "eid190",
                            "scaleY",
                            750,
                            930,
                            "easeOutBounce",
                            "${camion3}",
                            '0',
                            '0.7'
                        ],
                        [
                            "eid27",
                            "rotateZ",
                            0,
                            9905,
                            "linear",
                            "${rayos2}",
                            '0deg',
                            '92deg'
                        ],
                        [
                            "eid185",
                            "scaleX",
                            351,
                            1008,
                            "easeOutBounce",
                            "${camion2}",
                            '0',
                            '0.7'
                        ],
                        [
                            "eid159",
                            "top",
                            4320,
                            0,
                            "linear",
                            "${rayos2}",
                            '-138px',
                            '-138px'
                        ],
                        [
                            "eid172",
                            "left",
                            2931,
                            0,
                            "easeOutBounce",
                            "${vendedores}",
                            '-389px',
                            '-389px'
                        ],
                        [
                            "eid149",
                            "scaleY",
                            1950,
                            812,
                            "easeOutBounce",
                            "${cien}",
                            '0',
                            '0.7'
                        ],
                        [
                            "eid189",
                            "scaleX",
                            750,
                            930,
                            "easeOutBounce",
                            "${camion3}",
                            '0',
                            '0.7'
                        ],
                        [
                            "eid176",
                            "left",
                            2931,
                            0,
                            "easeOutBounce",
                            "${compradores2}",
                            '-437px',
                            '-437px'
                        ],
                        [
                            "eid181",
                            "scaleX",
                            0,
                            1000,
                            "easeOutBounce",
                            "${camion1}",
                            '0',
                            '0.7'
                        ],
                        [
                            "eid138",
                            "scaleY",
                            1680,
                            1082,
                            "easeOutBounce",
                            "${dijeron}",
                            '0',
                            '0.6'
                        ],
                        [
                            "eid177",
                            "left",
                            2762,
                            0,
                            "easeOutBounce",
                            "${dijeron}",
                            '-516px',
                            '-516px'
                        ],
                        [
                            "eid131",
                            "scaleX",
                            1170,
                            780,
                            "easeOutBounce",
                            "${compradores}",
                            '0',
                            '0.5'
                        ],
                        [
                            "eid186",
                            "scaleY",
                            351,
                            1008,
                            "easeOutBounce",
                            "${camion2}",
                            '0',
                            '0.7'
                        ],
                        [
                            "eid137",
                            "scaleX",
                            1680,
                            1082,
                            "easeOutBounce",
                            "${dijeron}",
                            '0',
                            '0.6'
                        ],
                        [
                            "eid178",
                            "top",
                            2762,
                            0,
                            "easeOutBounce",
                            "${dijeron}",
                            '-96px',
                            '-96px'
                        ],
                        [
                            "eid182",
                            "scaleY",
                            0,
                            1000,
                            "easeOutBounce",
                            "${camion1}",
                            '0',
                            '0.7'
                        ],
                        [
                            "eid156",
                            "scaleX",
                            1680,
                            773,
                            "easeOutBounce",
                            "${vendedores}",
                            '0',
                            '0.7'
                        ],
                        [
                            "eid41",
                            "scaleY",
                            0,
                            0,
                            "linear",
                            "${rayos2}",
                            '1.18',
                            '1.18'
                        ],
                        [
                            "eid148",
                            "scaleX",
                            1950,
                            812,
                            "easeOutBounce",
                            "${cien}",
                            '0',
                            '0.7'
                        ],
                        [
                            "eid40",
                            "scaleX",
                            0,
                            0,
                            "linear",
                            "${rayos2}",
                            '1.18',
                            '1.18'
                        ]
                    ]
                }
            }
        };

    AdobeEdge.registerCompositionDefn(compId, symbols, fonts, scripts, resources, opts);

    if (!window.edge_authoring_mode) AdobeEdge.getComposition(compId).load("100prueba_edgeActions.js");
})("EDGE-26209740");
