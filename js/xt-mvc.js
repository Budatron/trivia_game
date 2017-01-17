
$(function(){
   /* ======= Model ======= */
    // var database = require('./js/database');
    // database.getData(function(datos) {

    // });
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
        maxPreg: 0,
        steps: [
            {step: 'intro-1', panel: '#panel-intro', title: "INTRO", sub: ""}, 
            {step: 'intro-2', panel: '#panel-intro', title: "JUEGO NUEVO", sub: "SELECCION"}, 
            {step: 'select', panel: '#panel-select', title: "SELECCIÓN JUGADORES", sub: "2 a 5 Equipos"}, 
            {step: 'ask', panel: '#panel-aq', title: "PREGUNTA", sub: ""}, 
            {step: 'qton', panel: '#panel-aq', title: "PREGUNTA", sub: ""}, 
            {step: 'score', panel: '#panel-score', title: "RESULTADOS", sub: ""}, 
            {step: 'total', panel: '#panel-score', title: "RESULTADOS FINALES", sub: ""}
        ],
        temp: 20000,
        pause: 5000,
        time: 0,
        numEqus: 3,
        tolFlag: true,
        nextStep: 'intro-1',
        db: require('./js/database'),
        data: [],
        interval: null,
        roundTeam: []
    };

    
/* ======= Octopus ======= */

    var octopus = {

        getDataFromDB: function() {
            model.db.getData(function(datos) {
                model.data = datos;
                octopus.init();
            });
        },

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
                    octopus.introStep('select');
                break;
                case 'select':
                    octopus.selectionStep('ask');
                break;
                case 'ask':
                    octopus.askStep('score');
                break;
                // case 'qton': 
                //     octopus.qtonStep();
                // break;
                case 'score':
                    if(model.turno >= model.maxPreg)octopus.scoreStep('total');
                    else octopus.scoreStep('ask');
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
            octopus.saveEquipos();
            octopus.setNextStep(nextStep);
        },

        askStep: function(nextStep){
            aqView.render();
            mainView.render();
            octopus.setTimer();
            octopus.setClicTab();
            octopus.setNextStep(nextStep);
        },

        // qtonStep: function(nextStep){
        //     octopus.setNextStep('ask');
        //     octopus.setNextStep('score');
        // },

        scoreStep: function(nextStep){
            model.turno++;
            scoreView.render();
            mainView.render();
            octopus.setNextStep(nextStep);
            // octopus.setNextStep('total');
        },

        total: function(nextStep){
            scoreView.render();
            mainView.render();
        },  

        setClicTab: function() {
            aqView.ans1.click(function(){
                aqView.eqres1.text($(this).data('letter'));
            });
            aqView.ans2.click(function(){
                aqView.eqres1.text($(this).data('letter'));
            });
            aqView.ans3.click(function(){
                aqView.eqres1.text($(this).data('letter'));
            });
            aqView.ans4.click(function(){
                aqView.eqres1.text($(this).data('letter'));
            });
        },

        saveEquipos: function(){
            selectView.eq1.blur(function(){
                model.equipos[0].name = $(this).val();
            });
            selectView.eq2.blur(function(){
                model.equipos[1].name = $(this).val();
            });
            selectView.eq3.blur(function(){
                model.equipos[2].name = $(this).val();
            });
            selectView.eq4.blur(function(){
                model.equipos[3].name = $(this).val();
            });
            selectView.eq5.blur(function(){
                model.equipos[4].name = $(this).val();
            });
            selectView.addPreg.click(function(){
                model.maxPreg = $(this).val();
                model.maxPreg = model.maxPreg -1;
            });
            selectView.addEqu.click(function(){
                model.numEqus = $(this).val();
                model.roundTeam = [];
                selectView.eq3.hide();
                selectView.eq4.hide();
                selectView.eq5.hide();
                for(var i = 0; i<model.numEqus; i++){
                    model.roundTeam.push(i);
                    selectView['eq'+(i+1)].show();
                }

                // model.maxPreg = model.maxPreg -1;
            });
        },

        loadData: function(){
            return model.data[model.turno];
        },

        getEqusNames: function(){
            return model.equipos;
        },

        setTimer: function(){
           var ne = model.numEqus;

           model.interval = setInterval(function(){ 
                aqView.timer.text(model.time++); 
                if(model.tolFlag){
                    if(model.time >= 5){
                        model.time = 0;
                        model.tolFlag = false;
                    }
                }else {
                    if(model.time >= 20){
                        model.time = 0;
                        model.tolFlag = true;
                        ne--;
                    }
                }
                
                if(ne === 0)octopus.stopTimer();
            }, 1000);
           // console.log(int)
        },

        stopTimer: function(){
            clearInterval(model.interval);
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
                octopus.hidePanels();
                octopus.setCurrentStep();
                octopus.stepSelector();
            });
        },

        hidePanels: function(){
            $(model.currentStep.panel).hide();
        },

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
            $(stepPanel.panel).show();
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
            this.eq1 = $('#eq-1');
            this.eq2 = $('#eq-2');
            this.eq3 = $('#eq-3');
            this.eq4 = $('#eq-4');
            this.eq5 = $('#eq-5');
            this.addPreg = $('#add-preg');
            this.addEqu = $('#add-equ');
            this.eqSave = $('.eq-save');
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
            this.sub = $('#pregunta');
            this.timer = $('#timer');
            this.answers = $('#panel-aq #answers');
            this.equip = $('#panel-aq #equipos');
            this.cont = $('#counter');
            this.ans1 = $('#ans-1');
            this.ans2 = $('#ans-2');
            this.ans3 = $('#ans-3');
            this.ans4 = $('#ans-4');
            this.eqnom1 = $('#equ-nom-1');
            this.eqnom2 = $('#equ-nom-2');
            this.eqnom3 = $('#equ-nom-3');
            this.eqnom4 = $('#equ-nom-4');
            this.eqnom5 = $('#equ-nom-5');
            this.eqres1 = $('#equ-res-1');
            this.eqres2 = $('#equ-res-2');
            this.eqres3 = $('#equ-res-3');
            this.eqres4 = $('#equ-res-4');
            this.eqres5 = $('#equ-res-5');
            // aqView.render();
        },

        render: function(){
            var stepPanel = octopus.getCurrentStep();
            var data = octopus.loadData();
            var equsName = octopus.getEqusNames();
            // var timer = octopus.getTimer();
            this.title.text(stepPanel.title); 
            this.sub.text(data.preg);
            this.cont.text(model.turno);
            this.ans1.text(data.r1);
            this.ans2.text(data.r2);
            this.ans3.text(data.r3);
            this.ans4.text(data.r4);
            this.eqnom1.text(equsName[0].name);
            this.eqnom2.text(equsName[1].name);
            this.eqnom3.text(equsName[2].name);
            this.eqnom4.text(equsName[3].name);
            this.eqnom5.text(equsName[4].name);
            this.timer.text(timer);
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
            var stepPanel = octopus.getCurrentStep();
            this.title.text(stepPanel.title); 
            this.sub.text(stepPanel.sub);
        }
    };

    // octopus.init();
    octopus.getDataFromDB();
});
