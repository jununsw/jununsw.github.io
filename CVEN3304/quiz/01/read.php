<?php

header('Expires: Sun, 01 Jan 2014 00:00:00 GMT');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('Cache-Control: post-check=0, pre-check=0', FALSE);
header('Pragma: no-cache');

$dir =  $_SERVER['DOCUMENT_ROOT'];
require($dir .  "/unsw/db_config/db_header.php");

if (isset($_GET["zid"])) {
    $id = $_GET["zid"];
    $sql1 = "select quiz1 from cven3304 where zid='{$id}'";
    
    $conn = unsw_connect();
    $result = $conn->query($sql1);
    $conn->close();
    
    if ($result->num_rows > 0) {
        $row = $result->fetch_row();
        $record = $row[0];
    } else {
        die("You have not submitted or your submission has not been processed yet!");
    }
} else {
    die("Access denied: unknown user");
}

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
        <script>
            var r1 = '<?php echo $record; ?>';
            var record = JSON.parse(r1);
        </script>
        <script src="script/data.js?v=<?php echo rand(1, 10000); ?>"></script>
        <script>
            part1 = [];
            part2 = [];
            part3 = [];
            part4 = [];
            part5 = [];
            part6 = [];
            
            for (let i = 0; i < record.q1.length; i++) {
                for (let idx = 0; idx < pool1.length; idx ++) {
                    if (pool1[idx]['idx'] == record.q1[i][0]) {
                        part1.push(pool1[idx]);
                    }
                }
            }
            
            for (let i = 0; i < pool2.length; i++) {
                if (pool2[i]['idx'] == record['q2'][0]) {
                    part2 = pool2[i];
                }
            }
            
            for (let i = 0; i < pool3.length; i++) {
                if (pool3[i]['idx'] == record['q3'][0]) {
                    part3 = pool3[i];
                }
            }
            
            for (let i = 0; i < pool4.length; i++) {
                if (pool4[i]['idx'] == record['q4'][0]) {
                    part4 = pool4[i];
                }
            }
            
            for (let i = 0; i < pool5.length; i++) {
                if (pool5[i]['idx'] == record['q5'][0]) {
                    part5 = pool5[i];
                }
            }
            
            for (let i = 0; i < pool6.length; i++) {
                if (pool6[i]['idx'] == record['q6'][0]) {
                    part6 = pool6[i];
                }
            }
            
            var who = '<?php echo $id; ?>';
        </script>
        <link rel="stylesheet" type="text/css" href="css/layout.css?v=<?php echo rand(1, 10000); ?>"/>
    </head>
    <body onload="init('read');">
        <div class="container">
            <div class="row" id="myapp">
                <div id="score-bar" class="col-xs-12" style="display: none;">
                    <p>
                        <button class="btn btn-primary" id="id-submit" v-on:click="toMark($event);">Finish and Submit</button>
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
                                    False statements are shown in red
                                </p>
                                <ol>
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
                                </ol>
                            </div>
                            <div id="p1">
                                <h5><strong>Question for Hydration</strong></h5>
                                <p>
                                    False statements are shown in red
                                </p>
                                <img src="resource/fig1.PNG" style="display: block;"/>
                                <ol style="margin-top: 20px; border-top: 1px black solid;">
                                    <li>
                                        <span v-html="part2.question[0][1]"></span>
                                    </li>
                                    <li>
                                        <span v-html="part2.question[1][1]"></span>
                                    </li>
                                    <li>
                                        <span v-html="part2.question[2][1]"></span>
                                    </li>
                                    <li>
                                        <span v-html="part2.question[3][1]"></span>
                                    </li>
                                    <li>
                                        <span v-html="part2.question[4][1]"></span>
                                    </li>
                                </ol>
                                <p id="return1"></p>
                            </div>
                            <div id="p2">
                                <h5><strong>Question for Shrinkage</strong></h5>
                                <p>
                                    False statements are shown in red
                                </p>
                                <img src="resource/fig2.PNG" style="display: block;"/>
                                <ol style="margin-top: 20px; border-top: 1px black solid;">
                                    <li>
                                        <span v-html="part3.question[0][1]"></span>
                                    </li>
                                    <li>
                                        <span v-html="part3.question[1][1]"></span>
                                    </li>
                                    <li>
                                        <span v-html="part3.question[2][1]"></span>
                                    </li>
                                    <li>
                                        <span v-html="part3.question[3][1]"></span>
                                    </li>
                                    <li>
                                        <span v-html="part3.question[4][1]"></span>
                                    </li>
                                </ol>
                                <p id="return2"></p>
                            </div>
                            <div id="p3">
                                <p>
                                    Consider a slab supported on a number of parallel beams shown in the figure. Those beams are simply supported beams with {{part4.length}} metres of span. The beams are spaced {{part4.space}} metres apart. The slab is {{part4.thickness}} mm thick; the cross-section of the beams is {{part4.width}} mm wide, with an overall depth of {{part4.depth}} mm. The dead load consists of self-weight plus an additional {{part4.dl}} kPa. The self-weight of reinforced concrete taken as 25 kN/m<sup>3</sup>. The live load is {{part4.ll}} kPa. Compute the factored design load for the maximum positive design moment for the interior beam and also calculate the maximum positive design moment at midspan of the beam (M<sup>*</sup>).
                                </p>
                                <div class="row" style="margin-top: 2px;">
                                    <div class="col-sm-8">
                                        <img src="resource/fig3-1.PNG" id="img-3-1"/>
                                        <img src="resource/fig3-2.PNG" id="img-3-2"/>
                                        <img src="resource/fig3-3.PNG" id="img-3-3"/>
                                    </div>
                                    <div class="col-sm-4">
                                        <p><strong>Your Submission / Correct Answer:</strong></p>
                                        <p>M<sup>*</sup> = <span id="ans3"></span> kNm</p>
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
                                        <p><strong>Your Submission / Correct Answer:</strong></p>
                                        <p>d<sub>n</sub> (mm) = <span id="ans4"></span></p>
                                        <p>Note: if your answer is 'invalid', it means either your answer is not a valid number or you didn't input anything</p>
                                        <p>Your answer is marked as correct if it is within &plusmn; 10 mm of the correct answer</p>
                                    </div>
                                </div>
                            </div>
                            <div id="p5">
                                <p>
                                    Calculate the ultimate moment strength (M<sub>u</sub>) for a beam section shown in the figure and the curvature of the beam at this ultimate state (positive ultimate moment is applied). A characteristic compressive strength (f’<sub>c</sub>) is {{part6.fc}} MPa. The yield strength of steel is {{part6.yield}} MPa and the elastic modulus of steel is 200 GPa. 
                                </p>
                                <p>
                                    Take the maximum compressive concrete strain, &epsilon;<sub>cu</sub> = 0.003.
                                </p>
                                <div class="row" style="margin-top: 2px;">
                                    <div class="col-sm-4">
                                        <img src="resource/fig5-1.PNG" id="img-5-1"/>
                                        <img src="resource/fig5-2.PNG" id="img-5-2"/>
                                        <img src="resource/fig5-3.PNG" id="img-5-3"/>
                                    </div>
                                    <div class="col-sm-8">
                                        <p><strong>Your Submission / Correct Answer:</strong></p>
                                        <p>M<sub>u</sub> (kNm) = <span id="ans51"></span></p>
                                        <p>curvature &phi; (&times;10<sup>-5</sup> mm<sup>-1</sup>)= <span id="ans52"></span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" style="display: none;">
                    <h3><strong>Your total mark is <span id="score"></span></strong></h3>
                </div>
            </div>
        </div>
    </body>
    <script src="script/vm.js?v=<?php echo rand(1, 10000); ?>"></script>
</html>