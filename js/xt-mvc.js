
$(function(){
   /* ======= Model ======= */

    var model = {
        currentPanel: null,
        currentStep: null,
        equipos: [ 
            { points: [], answ: [], name: "" }, { points: [], answ: [], name: "" }, { points: [], answ: [], name: "" },
            { points: [], answ: [], name: "" }, { points: [], answ: [], name: "" } 
        ],
        trivia: {
            preguntas: [
                '¿Quién descubrio América?',
                '¿Dénde esta el polo Norte?',
                '¿En qué año se dan las petunias?', 
                '¿La Chiripiolca es contagiosa?', 
                '¿Por qué solo en México pica el chile?', 
                '¿Se puede morir uno de mal olor?', 
                '¿Se puede doblar una barra de chocolate con la mente?',
                '¿Los faros tienen baños?',
                '¿Quién le pone el cascabel al gato?',
                '¿Quién le pone el cascabel al gato?'
            ],

            respuestas: [
                {a1: 'Nadie', a2: 'Mickey', a3: 'Pluto', a4: 'Cricri', v1:100, v2:100, v3:100, v4:100 },
                {a1: 'Noreste', a2: 'Mickey', a3: 'Pluto', a4: 'Cricri', v1:100, v2:100, v3:100, v4:100 },
                {a1: '1965', a2: 'Mickey', a3: 'Pluto', a4: 'Cricri', v1:100, v2:100, v3:100, v4:100 },
                {a1: 'En verano', a2: 'Mickey', a3: 'Pluto', a4: 'Cricri', v1:100, v2:100, v3:100, v4:100 },
                {a1: 'Por que si', a2: 'Mickey', a3: 'Pluto', a4: 'Cricri', v1:100, v2:100, v3:100, v4:100 },
                {a1: 'Si', a2: 'Mickey', a3: 'Pluto', a4: 'Cricri', v1:100, v2:100, v3:100, v4:100 },
                {a1: 'Siempre', a2: 'Mickey', a3: 'Pluto', a4: 'Cricri', v1:100, v2:100, v3:100, v4:100 },
                {a1: 'No', a2: 'Mickey', a3: 'Pluto', a4: 'Cricri', v1:100, v2:100, v3:100, v4:100 },
                {a1: 'Otro gato', a2: 'Mickey', a3: 'Pluto', a4: 'Cricri', v1:100, v2:100, v3:100, v4:100 },
                {a1: 'Otro gato', a2: 'Mickey', a3: 'Pluto', a4: 'Cricri', v1:100, v2:100, v3:100, v4:100 }
            ]
        },
        
        turno: 0,
        numQ: 0,
        steps: [
            {step: 'intro-1', panel: $('#panel-intro'), title: "INTRO", sub: ""}, 
            {step: 'intro-2', panel: $('#panel-intro'), title: "JUEGO NUEVO", sub: "SELECCION"}, 
            {step: 'seleccion', panel: $('#panel-select'), title: "SELECCIÓN JUGADORES", sub: "2 a 5 Equipos"}, 
            {step: 'ask', panel: $('#panel-aq'), title: "PREGUNTA", sub: ""}, 
            {step: 'qton', panel: $('#panel-aq'), title: "PREGUNTA", sub: ""}, 
            {step: 'score', panel: $('#panel-score'), title: "RESULTADOS", sub: ""}, 
            {step: 'total', panel: $('#panel-score'), title: "RESULTADOS FINALES", sub: ""}
        ],
        stepCicle: 0,
        temp: 20000,
        pause: 5000,
        nextStep: 'intro-1'
    };

/* ======= Octopus ======= */

    var octopus = {
        init: function() {
            
            octopus.setCurrentStep();

            mainView.init();
            introView.init();
            selectView.init();
            aqView.init();
            scoreView.init();

            
            octopus.stepSelector();
            octopus.nextBtn();
        },

        stepSelector: function(){
            switch(model.currentStep.step){
                case 'intro-1':
                    octopus.introStep('intro-2');
                break;
                case 'intro-2':
                    octopus.introStep('selection');
                break;
                case 'seleccion':
                    octopus.selectionStep('ask');
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

        introStep: function(nextStep){

            introView.render();
            mainView.render();
            octopus.setNextStep(nextStep);
        },

        selectionStep: function(nextStep){
            selectView.render();
            mainView.render();
            octopus.setNextStep(nextStep);
        },

        askStep: function(){
            octopus.setNextStep('qton');
        },

        qtonStep: function(){
            octopus.setNextStep('ask');
            octopus.setNextStep('score');
        },

        scoreStep: function(){
            octopus.setNextStep('ask');
            octopus.setNextStep('total');
        },

        total: function(){

        },  

        getCurrentPanel: function() {
            return model.currentPanel;
        },

        getCurrentStep: function() {
            return model.currentStep;
        },

        setCurrentStep: function() {
            for(var i = 0; i < model.steps.length; i++) {
                if(model.steps[i].step == model.nextStep) {
                    model.currentStep = model.steps[i];
                }
            }
        },

        setNextStep: function(nextStep) {
            model.nextStep = nextStep;
        },

        nextBtn: function(){
            $('#next-btn').on('click', function(){
                octopus.cleanContainer();
                octopus.setCurrentStep();
                octopus.stepSelector();
            });
        },

        cleanContainer: function(){
            model.currentStep.panel.find('*').empty();
            mainView.mainContainer.empty();
        }

    };

/* ======= View ======= */

    var mainView = {
        init: function() {
            this.mainContainer = $('#main-container');
            this.mainFooter = $('#main-footer');
            
            mainView.render();
        },

        render: function(){
            var stepPanel = octopus.getCurrentStep();
            this.mainContainer.append(stepPanel.panel);
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
            var stepPanel = octopus.getCurrentStep();
            
            this.title.text(stepPanel.title); 
            this.sub.text(stepPanel.sub);
            this.animation.text('animation'); 
        }
    };

    var selectView = {
        init: function() {
            this.title = $('#panel-select .title');
            this.sub = $('#panel-select .subtitle');
            this.cEquipos = $('#panel-select #crea-equipos');
            this.numPreg = $('#panel-select #num-preg');
            // selectView.render();
        },

        render: function(){
            var stepPanel = octopus.getCurrentStep();
            
            this.title.text(stepPanel.title); 
            this.sub.text(stepPanel.sub);
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
