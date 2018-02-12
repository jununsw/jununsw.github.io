<?php

header('Expires: Sun, 01 Jan 2014 00:00:00 GMT');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('Cache-Control: post-check=0, pre-check=0', FALSE);
header('Pragma: no-cache');

// connect to database to see if it is a new attempt
if (!isset($_POST["id"])) {
    die("Cannot obtain your id, probably due to your network connection, please close the tab and re-try");
} else {
    $zid = $_POST["id"];
}

$dir =  $_SERVER['DOCUMENT_ROOT'];
require($dir . "/unsw/db_config/db_header.php");

$table = "cven2301_quiz";
$column_data = "d3";

$conn = unsw_connect();

if ($conn->connect_error) {
    die("Netword Error: Unable to read Moodle Gradebook");
}

$sql1 = "select zid from {$table} where {$column_data}<>'' and zid='{$zid}'";

$result = $conn->query($sql1);

if ($result->num_rows > 0) {
    $attempt = "not first attempt";
} else {
    $attempt = "first attempt";
}

$conn->close();

?>

<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8"/>
        <meta name="description" content="Teaching and learning module"/>
        <meta name="keywords" content=""/>
        <meta name="author" content="Dr Xiaojun Chen"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <title>Quiz 03</title>
        <link rel="shortcut icon" href="http://www.lindenbaum.net.au/unsw/util/favicon.ico" type="image/vnd.microsoft.icon"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.0/themes/smoothness/jquery-ui.css"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.0/jquery-ui.min.js"></script>
        <script src="https://use.fontawesome.com/582f5b6b01.js"></script>
        <script src="https://unpkg.com/vue"></script>
        <script src="http://www.lindenbaum.net.au/unsw/util/util.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.6/jsxgraph.css"/>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.6/jsxgraphcore.js"></script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-MML-AM_CHTML"></script>
        <link rel="stylesheet" type="text/css" href="css/layout.css?v=<?php echo rand(1, 10000); ?>"/>
        
        <script>
            var who = '<?php echo isset($_POST["id"]) ? $_POST["id"] : ""; ?>';
            var isFirst = '<?php echo $attempt; ?>';
        </script>
    </head>
    <body>
        <div class="container" id="module">
            <div class="row">
                <div id="id-bar" class="col-xs-12">
                    <p id="main-score" style="margin-top: 20px;">
                        Your zID: <input id="zid" size="10"/> (e.g. z1234567, no spacing before or after)
                    </p>
                    <p>
                        <button class="btn btn-primary" id="id-btn" onclick="check_id()">Start</button><label id="after-id"></label>
                    </p>
                </div>

                <div id="score-bar" class="col-xs-12">
                    <p>
                        <button class="btn btn-primary" id="id-submit" v-on:click="tofinish($event);" disabled>Finish and Submit</button>
                        <span style="font-weight: bold;">zID: <?php echo isset($_POST["id"]) ? $_POST["id"] : "";?></span>
                        <span id="after-submit"></span><br/><br/>
                        <span style="font-weight: bold; after-hide" id="timeup"></span>
                    </p>
                    <p class="instruction after-hide" style="display: block; color: red; font-weight: bold; font-size: 18px;">
                        Important Note: Please take screenshots or photos of each tab including your zID as a record before submission.<br/>
                    </p>
                    <div class="h2 timer after-hide"><span style=""> zID: <?php echo isset($_POST["id"]) ? $_POST["id"] : "";?></span><br/><br/>Time Left <span id="min">90</span>:<span id="sec">00</span></div>
                </div>
            </div>

            <div id="main-body">
                <div class="row">
                    <div class="col-xs-12" id="answers" style="border: none;">
                        <ul>
                            <li><a href="#p1" class="bold after-hide">Question</a></li>
                            <li><a href="#testing" class="bold" style="color: red;">Submission</a></li>
                        </ul>

                        <div id="p1">
                            <div class="col-xs-12" style="font-weight: bold;">
                                <p>
                                    As shown in the figure below, a point load P and a uniform distributed load w are applied on an overhanding beam (AB = {{prob.l}} m, BC = {{4 - prob.l}} m). The magnitude of the loads are:
                                </p>
                                <div class="row">
                                    <div class="col-xs-6" style="font-weight: bold;">
                                        <ul>
                                            <li>p = {{prob.p}} kN</li>
                                            <li>w = {{prob.w}} kN/m</li>
                                        </ul>
                                        <p>
                                            The beam has a horizontal roller support at B and a pin support at C. Let A be the origin of the coordinate system.
                                        </p>
                                        <p style="color: red">
                                            To get the correct rounding, work with 3 decimal places only for the calculation. Present your answer to 2 decimal places.
                                        </p>
                                        <p style="font-style: italic;">
                                            Answer the questions in the following three tabs in sequence
                                        </p>
                                    </div>
                                    <div class="col-xs-6">
                                        <div id="svg-prob" style="width: 400px; height: 200px;"></div>
                                    </div>
                                </div>
                                
                                <div class="row">
                                    <div class="col-xs-12" id="answer-tabs" style="border-color: #ffffff;">
                                        <ul>
                                            <li style="font-weight: bold;"><a href="#at1">BMD</a></li>
                                            <li style="font-weight: bold;"><a href="#at2">Reactions, Moment, Slope and Deflection</a></li>
                                            <li style="font-weight: bold;"><a href="#at3" v-on:click="updateDisplacement($event);">Boundary Conditions</a></li>
                                        </ul>
                                        
                                        <div id="at1">
                                            <p>
                                                Plot the shape of the bending moment diagram, instruction:
                                            </p>
                                            <ul style="font-weight: normal;">
                                                <li>There are four blue points in the figure below, indicating the bending moment at point A, point B, middle of segment BC and point C, respectively</li>
                                                <li>Drag these points vertically to create the shape of the BMD</li>
                                                <li>Actual values of the bending moment is not important</li>
                                                <li>Plot the bending moment on the tension side of the member</li>
                                            </ul>
                                            <div>
                                                <div id="svg-bmd" style="width: 600px; height: 200px; margin: auto; display: block;"></div>
                                            </div>
                                        </div>
                                        
                                        <div id="at2">
                                            <p>
                                                Calculate vertical reactions at B and C (round to 0.01 kN):
                                            </p>
                                            <ul>
                                                <li>R<sub>B</sub> = <input id="r1" data-group="1" data-mark="10" size="6"/> kN</li>
                                                <li>R<sub>C</sub> = <input id="r2" data-group="1" data-mark="10" size="6"/> kN</li>
                                            </ul>
                                            <p>
                                                The bending moment can be written as a function of x (x in m, M in kN-m). Determine its coefficients:
                                            </p>
                                            <p style="padding-left: 30px; font-weight: normal; font-style: italic;" id="moment">
                                                M = EIv''(x) = 
                                                <span>
                                                    <input id='m1' size='6'/>&bull;
                                                    <select>
                                                        <option disabled selected value style="color: grey"> select a term </option>
                                                        <option value='mx1'>x</option>
                                                        <option value='mx2'>x&sup2;</option>
                                                        <option value='mxhat1'>&lt;x-{{prob.l}}&gt;</option>
                                                        <option value='mxhat2'>&lt;x-{{prob.l}}&gt;&sup2;</option>
                                                    </select>
                                                    <button type="button" class="btn btn-xs btn-basic" v-on:click="addTerm($event);">+</button>
                                                </span>
                                            </p>
                                            <p>
                                                <button type="button" class="btn btn-primary btn-xs" v-on:click="resetTerm($event, 'm');">Reset Bending Moment</button>
                                            </p>
                                            <p>
                                                The slope &theta; can be written as a function of x. Determine its coefficients:
                                            </p>
                                            <p style="padding-left: 30px; font-weight: normal; font-style: italic;" id="slope">
                                                &theta; = EIv'(x) = C +
                                                <span>
                                                    <input id='v1' size='6'/>&bull;
                                                    <select>
                                                        <option disabled selected value style="color: grey"> select a term </option>
                                                        <option value='vx2'>x&sup2;</option>
                                                        <option value='vx3'>x&sup3;</option>
                                                        <option value='vxhat2'>&lt;x-{{prob.l}}&gt;&sup2;</option>
                                                        <option value='vxhat3'>&lt;x-{{prob.l}}&gt;&sup3;</option>
                                                    </select>
                                                    <button type="button" class="btn btn-xs btn-basic" v-on:click="addTerm($event);">+</button>
                                                </span>
                                            </p>
                                            <p>
                                                <button type="button" class="btn btn-primary btn-xs" v-on:click="resetTerm($event, 'm');">Reset Bending Moment</button>
                                            </p>
                                            <p>
                                                The deflection v can be written as a function of x. Determine its coefficients:
                                            </p>
                                            <p style="padding-left: 30px; font-weight: normal; font-style: italic;" id="deflection">
                                                EIv(x) = Cx + D +
                                                <span>
                                                    <input id='d1' size='6'/>&bull;
                                                    <select>
                                                        <option disabled selected value style="color: grey"> select a term </option>
                                                        <option value='dx2'>x&sup3;</option>
                                                        <option value='dx3'>x&#8308;</option>
                                                        <option value='dxhat2'>&lt;x-{{prob.l}}&gt;&sup3;</option>
                                                        <option value='dxhat3'>&lt;x-{{prob.l}}&gt;&#8308;</option>
                                                    </select>
                                                    <button type="button" class="btn btn-xs btn-basic" v-on:click="addTerm($event);">+</button>
                                                </span>
                                            </p>
                                            <p>
                                                <button type="button" class="btn btn-primary btn-xs" v-on:click="resetTerm($event, 'm');">Reset Bending Moment</button>
                                            </p>
                                            <button type="button" class="btn btn-primary record" v-on:click="toRecord($event);">Record</button>
                                        </div>
                                        
                                        <div id="at3">
                                            <p>
                                                Deflection function you input in the previous tab is
                                            </p>
                                            <p style="padding-left: 30px; font-weight: normal; font-style: italic;" id="formula">
                                                
                                            </p>
                                            <p>
                                                Determine the coefficent C and D using the boundary condition
                                            </p>
                                            <ul>
                                                <li>C = <input id="c" data-group="2" data-mark="10" size="6"/></li>
                                                <li>D = <input id="d" data-group="2" data-mark="10" size="6"/></li>
                                            </ul>
                                            <button type="button" class="btn btn-primary record" ng-click="toRecord($event);">Record</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="testing" class="row">
                            <div class="col-xs-6" style="font-weight: bold;">
                                <p>Question and Correct Answers</p>
                                <ul>
                                    <li v-for="(data, key) in problem">{{key}}: {{data > 1e6 ? data.toExponential(3) : data.toFixed(3)}}</li>
                                </ul>
                            </div>
                            <div class="col-xs-6" style="font-weight: bold;">
                                <p>Your Submission</p>
                                <ul>
                                    <li v-for="(data, key) in record.answers">{{key}}: {{data > 1e6 ? data.toExponential(3) : data.toFixed(3)}}</li>
                                </ul>
                            </div>
                            <div class="col-xs-12" style="font-weight: bold;">
                                <p>Score: {{record.score}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                

                <div class="row">
                    <div class="col-xs-12">
                        <p class="additional after-hide">
                            You can record some of the working used to solve the questions, in the textbox below (max. 500 characters). This is optional. It could help us understand your solutions.<br/><br/>
                            <textarea id="text-data" rows="10"></textarea><br/>
                            <span>500 characters remains</span>
                        </p>
                    </div>
                </div>
            </div>

            <div id="dialog-message" title="Submission Comfirmation!" style="display: none;">
                <div>
                    <p style="font-weight: bold;">
                        Warning: you only have ONE chance to submit. Questions will not be shown after submission.
                        <br/><br/>
                        Are you sure to submit?
                    </p>
                </div>
            </div>
        </div>
    </body>
    <script src="script/app.js?v=<?php echo rand(1, 10000); ?>"></script>
    <script src="script/events.js?v=<?php echo rand(1, 10000); ?>"></script>
</html>