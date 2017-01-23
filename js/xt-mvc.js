
$(function(){
   
    var model = {
        currentStep: null,
        equipos: [ 
            { points: [], answ: [], name: "" }, { points: [], answ: [], name: "" }, { points: [], answ: [], name: "" },
            { points: [], answ: [], name: "" }, { points: [], answ: [], name: "" } 
        ],
        // trivia: {
        //     preguntas: [
        //         '¿Quién descubrio América?',
        //         '¿Dénde esta el polo Norte?',
        //         '¿En qué año se dan las petunias?', 
        //         '¿La Chiripiolca es contagiosa?', 
        //         '¿Por qué solo en México pica el chile?', 
        //         '¿Se puede morir uno de mal olor?', 
        //         '¿Se puede doblar una barra de chocolate con la mente?',
        //         '¿Los faros tienen baños?',
        //         '¿Quién le pone el cascabel al gato?',
        //         '¿Quién le pone el cascabel al gato?'
        //     ],

        //     respuestas: [
        //         {a1: 'Nadie', a2: 'Mickey', a3: 'Pluto', a4: 'Cricri', v1:100, v2:100, v3:100, v4:100 },
        //         {a1: 'Noreste', a2: 'Mickey', a3: 'Pluto', a4: 'Cricri', v1:100, v2:100, v3:100, v4:100 },
        //         {a1: '1965', a2: 'Mickey', a3: 'Pluto', a4: 'Cricri', v1:100, v2:100, v3:100, v4:100 },
        //         {a1: 'En verano', a2: 'Mickey', a3: 'Pluto', a4: 'Cricri', v1:100, v2:100, v3:100, v4:100 },
        //         {a1: 'Por que si', a2: 'Mickey', a3: 'Pluto', a4: 'Cricri', v1:100, v2:100, v3:100, v4:100 },
        //         {a1: 'Si', a2: 'Mickey', a3: 'Pluto', a4: 'Cricri', v1:100, v2:100, v3:100, v4:100 },
        //         {a1: 'Siempre', a2: 'Mickey', a3: 'Pluto', a4: 'Cricri', v1:100, v2:100, v3:100, v4:100 },
        //         {a1: 'No', a2: 'Mickey', a3: 'Pluto', a4: 'Cricri', v1:100, v2:100, v3:100, v4:100 },
        //         {a1: 'Otro gato', a2: 'Mickey', a3: 'Pluto', a4: 'Cricri', v1:100, v2:100, v3:100, v4:100 },
        //         {a1: 'Otro gato', a2: 'Mickey', a3: 'Pluto', a4: 'Cricri', v1:100, v2:100, v3:100, v4:100 }
        //     ]
        // },
        tiempo: 20,
        pausa: 3,
        turno: 0,
        maxPreg: 10,
        steps: [
            {step: 'intro-1', panel: '#panel-intro', title: "INTRO", sub: "", btn: 'JUGAR' }, 
            // {step: 'intro-2', panel: '#panel-intro', title: "JUEGO NUEVO", sub: "SELECCION", btn: 'CONTINUA' }, 
            {step: 'select', panel: '#panel-select', title: "SELECCIÓN JUGADORES", sub: "2 a 5 Equipos", btn: 'OK' }, 
            {step: 'ask', panel: '#panel-aq', title: "PREGUNTA", sub: "", btn: 'SIGUIENTE' }, 
            // {step: 'qton', panel: '#panel-aq', title: "PREGUNTA", sub: "", btn: }, 
            {step: 'score', panel: '#panel-score', title: "RESULTADOS", sub: "", btn: 'SIGUIENTE' }, 
            {step: 'total', panel: '#panel-score', title: "RESULTADOS FINALES", sub: "", btn: 'NUEVO' }
        ],
        time: 1,
        numEqus: 2,
        tolFlag: true,
        respFlag: false,
        nextStep: 'intro-1',
        db: require('./js/database'),
        data: [],
        interval: null,
        roundTeam: [1, 2],
        actualTeam: []
    };

    
/* ======= Octopus ======= */

    var octopus = {

        getDataFromDB: function() {
            model.db.getData(function(datos) {
                model.data = datos;
                octopus.introStep('select');
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
                    octopus.cleanData();
                    
                break;
                // case 'intro-2':
                //     octopus.introStep('select');
                // break;
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
                    if(model.turno < (model.maxPreg-1))octopus.scoreStep('ask');
                    else octopus.scoreStep('total');
                break;
                case 'total':
                    octopus.total('intro-1');
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
            octopus.hideNext();
            octopus.setNextStep(nextStep);
        },

        scoreStep: function(nextStep){
            model.turno++;
            scoreView.render();
            mainView.render();
            octopus.showScore();
            octopus.setNextStep(nextStep);
        },

        total: function(nextStep){
            scoreView.render();
            mainView.render();
            octopus.hideScore();
            octopus.setNextStep(nextStep);
        },  

        cleanData: function() {
            for (var i = model.equipos.length - 1; i >= 0; i--) {
                model.equipos[i].points = [];
                model.equipos[i].answ = [];
                model.equipos[i].name = '';
            }
            model.turno = 0;
            model.maxPreg = 10;
            model.time = 1;
            model.numEqus = 2;
            model.tolFlag = true;
            model.data = [];
            model.interval = null;
            model.roundTeam = [1, 2];
            model.actualTeam = [];
            model.respFlag = false;
            octopus.getDataFromDB();
        },

        hideScore: function() {
            $('.parcial-score').hide();
            $('.total-score').css('margin-left', '530px');
            scoreView.btn.css('left', 'calc(50% - 198px)');
        }, 

        showScore: function() {
            $('.parcial-score').show();
            $('.total-score').css('margin', 'auto');

        }, 
        hideNext: function(){
            $('.next-btn').hide();
        },

        showNext: function(){
            $('.next-btn').show();
        },

        setClicTab: function() {
            for(var i = 1; i <= 4; i++){
                    aqView['ans'+i].click(function(){
                    if(model.respFlag){
                       aqView['eqres'+model.actualTeam[0]].text($(this).data('letter'));
                        model.equipos[model.actualTeam[0]-1].answ[model.turno] = $(this).data('letter');
                        model.equipos[model.actualTeam[0]-1].points[model.turno] = $(this).data('valor'); 
                        model.time = model.tiempo;
                    }
                });
            }
            
            
            // if(model.respFlag)aqView.ans2.click(function(){
            //     aqView['eqres'+model.actualTeam[0]].text($(this).data('letter'));
            //     model.equipos[model.actualTeam[0]-1].answ[model.turno] = $(this).data('letter');
            //     model.equipos[model.actualTeam[0]-1].points[model.turno] = $(this).data('valor');
            // });
            // if(model.respFlag)aqView.ans3.click(function(){
            //     aqView['eqres'+model.actualTeam[0]].text($(this).data('letter'));
            //     model.equipos[model.actualTeam[0]-1].answ[model.turno] = $(this).data('letter');
            //     model.equipos[model.actualTeam[0]-1].points[model.turno] = $(this).data('valor');
            // });
            // if(model.respFlag)aqView.ans4.click(function(){
            //     aqView['eqres'+model.actualTeam[0]].text($(this).data('letter'));
            //     model.equipos[model.actualTeam[0]-1].answ[model.turno] = $(this).data('letter');
            //     model.equipos[model.actualTeam[0]-1].points[model.turno] = $(this).data('valor');
            // });
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
                $('.aster').text('');
                $(this).find('.aster').html(' &#x25C2;');
            });
            selectView.addEqu.click(function(){
                model.numEqus = $(this).val();
                model.roundTeam = [];
                selectView.eq3.hide();
                selectView.eq4.hide();
                selectView.eq5.hide();
                for(var i = 0; i<model.numEqus; i++){
                    model.roundTeam.push(i+1);
                    selectView['eq'+(i+1)].show();
                }

                // model.maxPreg = model.maxPreg -1;
            });
        },

        loadData: function(){
            var r = model.data.splice(Math.floor(Math.random()*model.data.length),1);
            return r[0];
        },

        getEqusNames: function(){
            return model.equipos;
        },

        setTimer: function(){
           var ne = model.numEqus;
           var ca = model.roundTeam.slice(0);
           model.actualTeam = ca.splice(Math.floor(Math.random()*ca.length),1);
           // console.log(se, 'se')
           $('.nom-equ-cont').hide();
           model.interval = setInterval(function(){
                var t = model.time++; 
                aqView.timer.text(t<10?'0'+t:t); 
                if(model.tolFlag){
                    aqView.tablero.show();
                    if(model.time > model.pausa){
                        model.time = 1;
                        $('.equ-cont-'+model.actualTeam[0]).show();
                        model.equipos[model.actualTeam[0]-1].points[model.turno] = 0;
                        model.equipos[model.actualTeam[0]-1].answ[model.turno] = '';
                        aqView.tablero.hide();
                        model.respFlag = true;
                        model.tolFlag = false;
                    }
                }else {
                    if(model.time > model.tiempo){
                        model.time = 1;
                        model.respFlag = false;
                        model.tolFlag = true;
                        model.actualTeam = ca.splice(Math.floor(Math.random()*ca.length),1);
                        ne--;
                    }
                }
                
                if(ne === 0){
                    octopus.stopTimer();
                    octopus.endRound();
                }
            }, 1000);
       
        },

        endRound: function(){
            octopus.hidePanels();
            octopus.setCurrentStep();
            octopus.stepSelector();
            octopus.showNext();
        },

        stopTimer: function(){
            clearInterval(model.interval);
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
            $('.next-btn').on('click', function(){
                octopus.hidePanels();
                octopus.setCurrentStep();
                octopus.stepSelector();
            });
        },

        hidePanels: function(){
            $(model.currentStep.panel).hide();
        },

        sumaPuntos: function(arr) {
            var suma = 0;
            for(var i= 0; i < arr.length; i++) {
                suma = suma + Number(arr[i]); 
            }
            return suma;
        },

        shuffle: function() {
            var array = [1, 2, 3, 4];
            for (var tmp, cur, top=array.length; top--;){
                cur = (Math.random() * (top + 1)) << 0;
                tmp = array[cur]; array[cur] = array[top]; array[top] = tmp;
            }
            return array;
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
            $(stepPanel.panel).show();
        }
    };

    var introView = {
        init: function() {
            this.title = $('#panel-intro .title');
            this.sub = $('#panel-intro .subtitle');
            this.animation = $('#panel-intro #animation');
            this.btn = $('.next-btn');
            // introView.render();
        },

        render: function(){
            var stepPanel = octopus.getCurrentStep();
            
            // this.title.text(stepPanel.title); 
            // this.sub.text(stepPanel.sub);
            this.animation.attr('src', 'assets/100prueba/100prueba.html'); 
            this.btn.text(stepPanel.btn); 
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
            this.addPreg = $('.add-preg li');
            this.addEqu = $('.add-equ li');
            this.eqSave = $('.eq-save');
            this.btn = $('.next-btn');
            // selectView.render();
        },

        render: function(){
            var stepPanel = octopus.getCurrentStep();
            // this.title.text(stepPanel.title); 
            // this.sub.text(stepPanel.sub);
            this.btn.text(stepPanel.btn); 
            this.eq1.val('');
            this.eq2.val('');
            this.eq3.val('');
            this.eq4.val('');
            this.eq5.val('');
            this.eq3.hide();
            this.eq4.hide();
            this.eq5.hide();
            this.btn.css('left', '1200px');

        }
    };

    var aqView = {
        init: function() {
            this.title = $('#panel-aq .title');
            this.sub = $('#pregunta');
            this.timer = $('#timer');
            this.tablero = $('.tablero');
            this.answers = $('#panel-aq #answers');
            this.equip = $('#panel-aq #equipos');
            // this.cont = $('#counter');
            this.ans1 = $('#ans-1');
            this.ans2 = $('#ans-2');
            this.ans3 = $('#ans-3');
            this.ans4 = $('#ans-4');
            this.eqcont1 = $('.equ-cont-nom-1');
            this.eqcont2 = $('.equ-cont-nom-2');
            this.eqcont3 = $('.equ-cont-nom-3');
            this.eqcont4 = $('.equ-cont-nom-4');
            this.eqcont5 = $('.equ-cont-nom-5');
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
            var sh = octopus.shuffle();
            // this.title.text(stepPanel.title); 
            this.sub.text(data.preg);
            // this.cont.text(model.turno);
            this.ans1.text('A ' + data['r'+sh[0]]);
            this.ans2.text('B ' + data['r'+sh[1]]);
            this.ans3.text('C ' + data['r'+sh[2]]);
            this.ans4.text('D ' + data['r'+sh[3]]);
            this.ans1.data('valor', data.v1);
            this.ans2.data('valor', data.v2);
            this.ans3.data('valor', data.v3);
            this.ans4.data('valor', data.v4);
            this.eqnom1.text(equsName[0].name);
            this.eqnom2.text(equsName[1].name);
            this.eqnom3.text(equsName[2].name);
            this.eqnom4.text(equsName[3].name);
            this.eqnom5.text(equsName[4].name);
            this.eqres1.text('');
            this.eqres2.text('');
            this.eqres3.text('');
            this.eqres4.text('');
            this.eqres5.text('');
            this.timer.text('00');
        }
    };

    var scoreView = {
        init: function() {
            this.title = $('#panel-score .title');
            this.sub = $('#panel-score .subtitle');
            this.score = $('#panel-score #score');
            this.s0 = $('.s1');
            this.s1 = $('.s2');
            this.s2 = $('.s3');
            this.s3 = $('.s4');
            this.s4 = $('.s5');
            this.sf0 = $('.sf1');
            this.sf1 = $('.sf2');
            this.sf2 = $('.sf3');
            this.sf3 = $('.sf4');
            this.sf4 = $('.sf5');
            this.n0 = $('.n1');
            this.n1 = $('.n2');
            this.n2 = $('.n3');
            this.n3 = $('.n4');
            this.n4 = $('.n5');
            this.btn = $('.next-btn');
            // scoreView.render();
        },

        render: function(){
            var stepPanel = octopus.getCurrentStep();
            var equsName = octopus.getEqusNames();
            this.title.text(stepPanel.title); 
            this.sub.text(stepPanel.sub);
            for (var i = 4 - 1; i >= 0; i--) {
                this['s'+i].text(equsName[i].points[model.turno -1]);
                
                if(octopus.sumaPuntos(equsName[i].points) === 0) this['sf'+i].html('&nbsp;');
                else this['sf'+i].text(octopus.sumaPuntos(equsName[i].points));

                this['n'+i].text(equsName[i].name);
            }
          
            this.btn.text(stepPanel.btn); 
        }
    };

    octopus.init();
});
