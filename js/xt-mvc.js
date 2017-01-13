
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
            '¿Quién descubrio América?', 
            '¿Dénde esta el polo Norte?', 
            '¿En qué año se dan las petunias?', 
            '¿Por qué solo en México pica el chile?',
            '¿Por qué solo en México pica el chile?',
            '¿La Chiripiolca es contagiosa?',
            '¿Por qué solo en México pica el chile?',
            '¿Se puede morir uno de mal olor?',
            '¿Por qué solo en México pica el chile?',
            '¿Se puede doblar una barra de chocolate con la mente?',
            '¿Los faros tienen baños?',
            '¿Quién le pone el cascabel al gato?'
        ],
        titles: [
            {title: "INTRO", sub: ""}, {title: "JUEGO NUEVO", sub: "SELECCION"},
            {title: "SELECCIÓN JUGADORES", sub: "2 a 5 Equipos"}, 
            {title: "PREGUNTA", sub: ""}, {title: "RESULTADOS", sub: ""},
            {title: "RESULTADOS FINALES", sub: ""}
        ],
        respuestas: [],
        turno: 0,
        numQ: 0,
        steps: ['intro-1', 'intro-2', 'seleccion', 'ask', 'qton', 'score', 'total']
    };

/* ======= Octopus ======= */

    var octopus = {
        init: function() {
            // setCurrentStep('intro-1');
            stepSelector();
            model.currentPanel = view.panel_1;

            view.init();
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
            this.panel_1 = $('#panel-1');
            this.panel_2 = $('#panel-2');
            this.panel_3 = $('#panel-3');
            this.panel_4 = $('#panel-4');
            view.render();
        },

        render: function(){
            var currentPanel = octopus.getCurrentPanel();
            // this.main_container
        }
    };

    var introView = {
        init: function() {
            this.main_container = $('#main-container');
            this.main_footer = $('#main-footer');
            this.panel_1 = $('#panel-1');
            this.panel_2 = $('#panel-2');
            this.panel_3 = $('#panel-3');
            this.panel_4 = $('#panel-4');
            view.render();
        },

        render: function(){
            var currentPanel = octopus.getCurrentPanel();
            // this.main_container
        }
    };

    var selectView = {
        init: function() {
            this.main_container = $('#main-container');
            this.main_footer = $('#main-footer');
            this.panel_1 = $('#panel-1');
            this.panel_2 = $('#panel-2');
            this.panel_3 = $('#panel-3');
            this.panel_4 = $('#panel-4');
            view.render();
        },

        render: function(){
            var currentPanel = octopus.getCurrentPanel();
            // this.main_container
        }
    };

    var qrView = {
        init: function() {
            this.main_container = $('#main-container');
            this.main_footer = $('#main-footer');
            this.panel_1 = $('#panel-1');
            this.panel_2 = $('#panel-2');
            this.panel_3 = $('#panel-3');
            this.panel_4 = $('#panel-4');
            view.render();
        },

        render: function(){
            var currentPanel = octopus.getCurrentPanel();
            // this.main_container
        }
    };

    var totalView = {
        init: function() {
            this.main_container = $('#main-container');
            this.main_footer = $('#main-footer');
            this.panel_1 = $('#panel-1');
            this.panel_2 = $('#panel-2');
            this.panel_3 = $('#panel-3');
            this.panel_4 = $('#panel-4');
            view.render();
        },

        render: function(){
            var currentPanel = octopus.getCurrentPanel();
            // this.main_container
        }
    };

    octopus.init();

});
