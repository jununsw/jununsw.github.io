<?php

header('Expires: Sun, 01 Jan 2014 00:00:00 GMT');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('Cache-Control: post-check=0, pre-check=0', FALSE);
header('Pragma: no-cache');

$id = isset($_GET["id"]) ? $_GET["id"] : "your zID";

?>

<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8"/>
        <meta name="description" content="Teaching and learning module"/>
        <meta name="keywords" content=""/>
        <meta name="author" content="Dr Xiaojun Chen"/>
        
        <title>Quiz 01</title>
        <link rel="shortcut icon" href="http://www.lindenbaum.net.au/unsw/util/favicon.ico" type="image/vnd.microsoft.icon"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.0/themes/smoothness/jquery-ui.css"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.0/jquery-ui.min.js"></script>
        <script src="https://use.fontawesome.com/582f5b6b01.js"></script>
        <script src="https://unpkg.com/vue"></script>
        <script src="https://jununsw.github.io/res/util.js"></script>
        <script src="script/data.js?v=<?php echo rand(1, 10000); ?>"></script>
        <link rel="stylesheet" type="text/css" href="css/layout.css?v=<?php echo rand(1, 10000); ?>"/>
    </head>
    <script>
        var who = '<?php echo $id; ?>';
    </script>
    <body onload="test();">
        <div class="container">
            <div class="row" id="myapp">
                <div id="score-bar" class="col-xs-12">
                    <p>
                        <button class="btn btn-primary" id="id-submit" v-on:click="toMark($event);" disabled>Finish and Submit</button>
                        <button class="btn btn-success" onclick="checkType();">Check Browser Type</button>
                        <span style="font-weight: bold;">zID: <?php echo $id; ?></span>
                        <span id="after-submit"></span><br/><br/>
                        <span style="font-weight: bold;" class="after-hide" id="timeup"></span>
                    </p>
                    <div class="alert alert-danger after-hide" role="alert">
                        <p class="after-hide" style="font-weight: bold; font-size: 1.1em;">
                            There are six tabs of questions.<br/>
                            Please take screenshot of each tab for your record. (You MUST record your answers before submission)<br/>
                            Click 'Finish and Submit' after you complete all questions. Note you can only submit once!
                        </p>
                    </div>
                    <div class="h2 timer after-hide">
                        <span style=""> zID: <?php echo $id; ?></span><br/><br/>
                        Time Left <span id="min">90</span>:<span id="sec">00</span><br/><br/>
                        <canvas id="clock" width="150" height="150" style="display: none;"></canvas>
                    </div>
                </div>
                <div class="row after-hide">
                    <div class="col-xs-12" id="answers" style="border: none;">
                        <div id="main-body">
                            <ul>
                                <li><a href="#p0" class="bold">Part 1</a></li>
                                <li><a href="#p1" class="bold">Part 2</a></li>
                                <li><a href="#p2" class="bold">Part 3</a></li>
                                <li><a href="#p3" class="bold">Part 4</a></li>
                                <li><a href="#p4" class="bold">Part 5</a></li>
                                <li><a href="#p5" class="bold">Part 6</a></li>
                            </ul>
                            <div id="p0">
                                <p style="font-weight: bold;">
                                    Among the following five statements, select the ones which are true. (Note: tick the box if you think the statement is true. All statements can be either true or false) (2 marks each)
                                </p>
                                <ul>
                                    <li>
                                        <input type="checkbox" data-idx="0">&nbsp;
                                        <span v-html="part1[0].question"></span>
                                    </li>
                                    <li>
                                        <input type="checkbox" data-idx="1">&nbsp;
                                        <span v-html="part1[1].question"></span>
                                    </li>
                                    <li>
                                        <input type="checkbox" data-idx="2">&nbsp;
                                        <span v-html="part1[2].question"></span>
                                    </li>
                                    <li>
                                        <input type="checkbox" data-idx="3">&nbsp;
                                        <span v-html="part1[3].question"></span>
                                    </li>
                                    <li>
                                        <input type="checkbox" data-idx="4">&nbsp;
                                        <span v-html="part1[4].question"></span>
                                    </li>
                                </ul>
                            </div>
                            <div id="p1">
                                <h5><strong>Question for Hydration</strong></h5>
                                <p>
                                    The figure below shows two schematic plots: one is the rate of heat evolution as a function of time and the other is the amount of hydration products as a function of time. Select all the correct statements. (5 marks if all correct statements are selected)
                                </p>
                                <img src="resource/fig1.PNG" style="display: block;"/>
                                <ul style="margin-top: 20px; border-top: 1px black solid;">
                                    <li>
                                        <input type="checkbox">&nbsp;
                                        <span v-html="part2.question[order2[0]][1]"></span>
                                    </li>
                                    <li>
                                        <input type="checkbox">&nbsp;
                                        <span v-html="part2.question[order2[1]][1]"></span>
                                    </li>
                                    <li>
                                        <input type="checkbox">&nbsp;
                                        <span v-html="part2.question[order2[2]][1]"></span>
                                    </li>
                                    <li>
                                        <input type="checkbox">&nbsp;
                                        <span v-html="part2.question[order2[3]][1]"></span>
                                    </li>
                                    <li>
                                        <input type="checkbox">&nbsp;
                                        <span v-html="part2.question[order2[4]][1]"></span>
                                    </li>
                                </ul>
                            </div>
                            <div id="p2">
                                <h5><strong>Question for Shrinkage</strong></h5>
                                <p>
                                    The plot shown below is the chemical shrinkage over time. Select all the correct statements. (5 marks if all correct statements are selected)
                                </p>
                                <img src="resource/fig2.PNG" style="display: block;"/>
                                <ul style="margin-top: 20px; border-top: 1px black solid;">
                                    <li>
                                        <input type="checkbox">&nbsp;
                                        <span v-html="part3.question[order3[0]][1]"></span>
                                    </li>
                                    <li>
                                        <input type="checkbox">&nbsp;
                                        <span v-html="part3.question[order3[1]][1]"></span>
                                    </li>
                                    <li>
                                        <input type="checkbox">&nbsp;
                                        <span v-html="part3.question[order3[2]][1]"></span>
                                    </li>
                                    <li>
                                        <input type="checkbox">&nbsp;
                                        <span v-html="part3.question[order3[3]][1]"></span>
                                    </li>
                                    <li>
                                        <input type="checkbox">&nbsp;
                                        <span v-html="part3.question[order3[4]][1]"></span>
                                    </li>
                                </ul>
                            </div>
                            <div id="p3">
                                <p>
                                    Consider a slab supported on a number of parallel beams shown in the figure. Those beams are simply supported beams with 8 metres of span. The beams are spaced {{part4.space}} metres apart. The slab is {{part4.thickness}} mm thick; the cross-section of the beams is {{part4.width}} mm wide, with an overall depth of {{part4.depth}} mm. The dead load consists of self-weight plus an additional {{part4.dl}} kPa. The self-weight of reinforced concrete taken as 25 kN/m<sup>3</sup>. The live load is {{part4.ll}} kPa. Compute the factored design load for the maximum positive design moment for the interior beam and also calculate the maximum positive design moment at midspan of the beam (M<sup>*</sup>).
                                </p>
                                <div class="row" style="margin-top: 2px;">
                                    <div class="col-sm-8">
                                        <img src="resource/fig3-1.PNG" id="img-3-1"/>
                                        <img src="resource/fig3-2.PNG" id="img-3-2"/>
                                        <img src="resource/fig3-3.PNG" id="img-3-3"/>
                                    </div>
                                    <div class="col-sm-4">
                                        <p><strong>Your Answer:</strong></p> (5 marks if both are correct)
                                        <p>w<sup>*</sup> = <input class="uneditable" type="text" id="w3" size="10"> kN/m <br/>(Choose from the follwing list)</p>
                                        <p>M<sup>*</sup> = <input class="uneditable" type="text" id="ans3" size="10"> kNm <br/>(Choose from the follwing list)</p>
                                        <p>Please select answers from the following options</p>
                                        <ul id="option3" style="list-style-type: none; border: 1px solid black; padding: 1em;"></ul>
                                    </div>
                                </div>
                            </div>
                            <div id="p4">
                                <p>
                                    Given that the section is uncracked and elastic region, find the neutral axis (d<sub>n</sub>) for the section shown in the figure. Positive moment is applied to all sections. Take E<sub>s</sub>/E<sub>c</sub> = 8
                                </p>
                                <div class="row" style="margin-top: 2px;">
                                    <div class="col-sm-4">
                                        <img src="resource/fig4-1.PNG" id="img-4-1"/>
                                        <img src="resource/fig4-2.PNG" id="img-4-2"/>
                                        <img src="resource/fig4-3.PNG" id="img-4-3"/>
                                    </div>
                                    <div class="col-sm-8">
                                        <p><strong>Your Answer:</strong></p>
                                        <p>d<sub>n</sub> = <input type="text" id="ans4" size="10"> mm (5 marks) <br/>Round your answer to 0.01 mm</p>
                                        <p style="font-style: italic;">Note: your answer must be a valid number. Fraction (e.g. "2/3"), math expression (e.g. "1+2") or text (e.g. "one hundred and forty") are not accepted.</p>
                                    </div>
                                </div>
                            </div>
                            <div id="p5">
                                <p>
                                    Calculate the ultimate moment strength (M<sub>u</sub>) for a beam section shown in the figure and the curvature of the beam at this ultimate state (positive ultimate moment is applied). A characteristic compressive strength (f’<sub>c</sub>) is {{part6.fc}} MPa. The yield strength of steel is {{part6.yield}} MPa and the elastic modulus of steel is 200 GPa. 
                                </p>
                                <div class="row" style="margin-top: 2px;">
                                    <div class="col-sm-4">
                                        <img src="resource/fig5-1.PNG" id="img-5-1"/>
                                        <img src="resource/fig5-2.PNG" id="img-5-2"/>
                                        <img src="resource/fig5-3.PNG" id="img-5-3"/>
                                    </div>
                                    <div class="col-sm-8">
                                        <p><strong>Your Answer:</strong></p>
                                        <p>M<sub>u</sub> = <input class="uneditable" type="text" id="ans51" size="10"> kNm (3 marks) <br/>(Choose from the follwing list)</p>
                                        <p>curvature &phi; = <input class="uneditable" type="text" id="ans52" size="10"> &times; 10<sup>-5</sup> mm<sup>-1</sup> (2 marks) <br/>(Choose from the follwing list)</p>
                                        <p>Please select answers from the following options</p>
                                        <ul id="option51" style="list-style-type: none; border: 1px solid black; padding: 1em;"></ul>
                                        <ul id="option52" style="list-style-type: none; border: 1px solid black; padding: 1em;"></ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div id="dialog-message" title="Submission Comfirmation!" style="display: none;">
            <div>
                <p style="font-weight: bold;">
                    Warning: you only have ONE chance to submit. Questions and answers will not show after submission.<br/>
                    You MUST take screenshots of your answers before submission!
                    <br/><br/>
                    Are you sure to submit?
                </p>
            </div>
        </div>
    </body>
    <script src="script/vm.js?v=<?php echo rand(1, 10000); ?>"></script>
    <script type="text/javascript">
        function test() {
            // window.timer = 3600;
            // $("#min").html(60);
            window.special = ['z3243398', 'z5117393', 'z5022017', 'z5061779'];
            
            if (window.special.includes(who)) {
                window.timer = 4500;
                $("#min").html(75);
            } else {
                window.timer = 3600;
                $("#min").html(60);
            }

            $("#main-body").css("display", "block");
            $("#p0,#p1,#p2,#p3,#p4,#p5").html("");
            $("#score-bar").css("display", "block");
            $("#txtbox").css("display", "block");
            $("#id-bar").css("display", "none");

            $("#clock").css("position", "fixed").show();
            window.start = Math.ceil((new Date()).getTime() / 1000);
            window.requestAnimationFrame(clock);

            $("#myapp").css("display", "block");
            $("#main-body").tabs();
            
            $("#img-3-" + vm.part4.idx.toString()).show();
            $("#img-4-" + vm.part5.idx.toString()).show();
            $("#img-5-" + vm.part6.idx.toString()).show();
            
            $(".uneditable").prop("disabled", true);
        }

        function checkType() {
            var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
            var isFirefox = typeof InstallTrigger !== 'undefined';
            var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
            var isIE = /*@cc_on!@*/false || !!document.documentMode;
            var isEdge = !isIE && !!window.StyleMedia;
            var isChrome = !!window.chrome && !!window.chrome.webstore;
            var isBlink = (isChrome || isOpera) && !!window.CSS;

            var output = 'Detecting browsers:\n\n';
            output += 'Firefox: ' + isFirefox + '\n';
            output += 'Chrome: ' + isChrome + '\n';
            output += 'Safari: ' + isSafari + '\n';
            output += 'Opera: ' + isOpera + '\n';
            output += 'IE: ' + isIE + '\n';
            output += 'Edge: ' + isEdge + '\n';
            output += 'Blink: ' + isBlink + '\n';

            window.alert(output);
        }
    </script>
</html>