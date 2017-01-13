
$(function(){
   /* ======= Model ======= */

    var model = {
        currentPanel: null,
        currentStep: null,
        equipos: [ 
            { points: 0, answ: "", name: "" }, { points: 0, answ: "", name: "" }, { points: 0, answ: "", name: "" },
            { points: 0, answ: "", name: "" }, { points: 0, answ: "", name: "" } 
        ],
        preguntas: [
            {q: '¿Quién descubrio América?', a: 1},
            {q: '¿Dénde esta el polo Norte?', a: 1},
            {q: '¿En qué año se dan las petunias?',  a: 1},
            {q: '¿La Chiripiolca es contagiosa?', a: 1},
            {q: '¿Por qué solo en México pica el chile?', a: 1},
            {q: '¿Se puede morir uno de mal olor?', a: 1},
            {q: '¿Se puede doblar una barra de chocolate con la mente?', a: 1},
            {q: '¿Los faros tienen baños?', a: 1},
            {q: '¿Quién le pone el cascabel al gato?', a: 1},
            {q: '¿Quién le pone el cascabel al gato?', a: 1}
        ],

        respuestas: [
            ['Nadie', 'Mickey', 'Pluto', 'Cricri'],
            ['Noreste', 'Mickey', 'Pluto', 'Cricri'],
            ['1965', 'Mickey', 'Pluto', 'Cricri'],
            ['En verano', 'Mickey', 'Pluto', 'Cricri'],
            ['Por que si', 'Mickey', 'Pluto', 'Cricri'],
            ['Si', 'Mickey', 'Pluto', 'Cricri'],
            ['Siempre', 'Mickey', 'Pluto', 'Cricri'],
            ['No', 'Mickey', 'Pluto', 'Cricri'],
            ['Otro gato', 'Mickey', 'Pluto', 'Cricri'],
            ['Otro gato', 'Mickey', 'Pluto', 'Cricri']
        ],
        titles: [
            {title: "INTRO", sub: ""}, {title: "JUEGO NUEVO", sub: "SELECCION"},
            {title: "SELECCIÓN JUGADORES", sub: "2 a 5 Equipos"}, 
            {title: "PREGUNTA", sub: ""}, {title: "RESULTADOS", sub: ""},
            {title: "RESULTADOS FINALES", sub: ""}
        ],
        turno: 0,
        numQ: 0,
        steps: [
            {step:'intro-1', panel: $('#panel-intro'), title: "INTRO", sub: ""}, 
            {step: 'intro-2', panel: $('#panel-intro'), title: "JUEGO NUEVO", sub: "SELECCION"}, 
            {step:'seleccion', panel: $('#panel-select'), title: "SELECCIÓN JUGADORES", sub: "2 a 5 Equipos"}, 
            {step:'ask', panel: $('#panel-aq'), title: "PREGUNTA", sub: ""}, 
            {step: 'qton', panel: $('#panel-aq'), title: "PREGUNTA", sub: ""}, 
            {step:'score', panel: $('#panel-score'), title: "RESULTADOS", sub: ""}, 
            {step:'total', panel: $('#panel-score'), title: "RESULTADOS FINALES", sub: ""}
        ]
    };

/* ======= Octopus ======= */

    var octopus = {
        init: function() {
            setCurrentStep('intro-1');
            
            mainView.init();
            introView.init();
            selectView.init();
            aqView.init();
            scoreView.init();

            stepSelector();
        },

        stepSelector: function(){
            switch(model.currentStep){
                case 'intro-1':
                    octopus.introStep();
                break;
                case 'intro-2':
                    octopus.intro2Setep();
                break;
                case 'seleccion':
                    octopus.selectionStep();
                break;
                case 'ask':
                    octopus.askStep();
                break;
                case 'qton': 
                    octopus.qtonStep();
                break;
                case 'score':
                    octopus.scoreStep();
                break;
                case 'total':
                    octopus.total();
                break;
            }
        },

        introStep: function(){
            introView.render();
            mainView.render();
        },

        intro2Setep: function(){

        },

        selectionStep: function(){

        },

        askStep: function(){

        },

        qtonStep: function(){

        },

        scoreStep: function(){

        },

        total: function(){

        },      
        getCurrentPanel: function() {
            return model.currentPanel;
        },

        getCurrentStep: function() {
            return model.currentStep;
        },

        setCurrentStep: function(step) {
            model.currentStep = step;
        },

    };

/* ======= View ======= */

    var mainView = {
        init: function() {
            this.main_container = $('#main-container');
            this.main_footer = $('#main-footer');
            
            mainView.render();
        },

        render: function(){
            var currentPanel = octopus.getCurrentPanel();
            this.main_container.append(currentPanel);
        }
    };

    var introView = {
        init: function() {
            this.title = $('#panel-intro .title');
            this.sub = $('#panel-intro .subtitle');
            this.animation = $('#panel-intro #animation');
            // introView.render();
        },

        render: function(){
            var currentPanel = octopus.getCurrentPanel();
            // this.main_container
        }
    };

    var selectView = {
        init: function() {
            this.title = $('#panel-select .title');
            this.sub = $('#panel-select .subtitle');
            this.cEquipos = $('#panel-select #crea-equipos');
            this.ayuda = $('#panel-select #ayuda');
            // selectView.render();
        },

        render: function(){
            var currentPanel = octopus.getCurrentPanel();
            // this.main_container
        }
    };

    var aqView = {
        init: function() {
            this.title = $('#panel-aq .title');
            this.sub = $('#panel-aq .subtitle');
            this.timer = $('#panel-aq #timer');
            this.answers = $('#panel-aq #answers');
            this.equip = $('#panel-aq #equipos');
            // aqView.render();
        },

        render: function(){
            var currentPanel = octopus.getCurrentPanel();
            // this.main_container
        }
    };

    var scoreView = {
        init: function() {
            this.title = $('#panel-score .title');
            this.sub = $('#panel-score .subtitle');
            this.score = $('#panel-score #score');
            // scoreView.render();
        },

        render: function(){
            var currentPanel = octopus.getCurrentPanel();
            // this.main_container
        }
    };

    octopus.init();

});
