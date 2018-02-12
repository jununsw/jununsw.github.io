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
$column_data = "d2";

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
        
        <title>Quiz 02</title>
        <link rel="shortcut icon" href="http://www.lindenbaum.net.au/unsw/util/favicon.ico" type="image/vnd.microsoft.icon"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.0/themes/smoothness/jquery-ui.css"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.0/jquery-ui.min.js"></script>
        <script src="https://use.fontawesome.com/582f5b6b01.js"></script>
        <script src="http://www.lindenbaum.net.au/unsw/util/angular.min.js"></script>
        <script src="http://www.lindenbaum.net.au/unsw/util/util.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.6/jsxgraph.css"/>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.6/jsxgraphcore.js"></script>
        <link rel="stylesheet" type="text/css" href="css/layout.css?v=<?php echo rand(1, 10000); ?>"/>
        
        <script>
            var who = '<?php echo isset($_POST["id"]) ? $_POST["id"] : ""; ?>';
            var isFirst = '<?php echo $attempt; ?>';
        </script>
    </head>
    <body>
        <div class="container">
            <div ng-app="app" ng-controller="Controller" id="myapp" class="row">
                <div id="id-bar">
                    <p id="main-score">
                        Your zID: <input id="zid" size="10"/> (e.g. z1234567, no spacing before or after)
                    </p>
                    <p>
                        <button class="btn btn-primary" id="id-btn" onclick="check_id()">Start</button><label id="after-id"></label>
                    </p>
                </div>

                <div id="score-bar" class="row">
                    <p>
                        <button class="btn btn-primary" id="id-submit" ng-click="tofinish($event);">Finish and Submit</button>
                        <span style="font-weight: bold;">zID: <?php echo isset($_POST["id"]) ? $_POST["id"] : "";?></span>
                        <span id="after-submit"></span><br/><br/>
                        <span style="font-weight: bold; after-hide" id="timeup"></span>
                    </p>
                    <p class="instruction after-hide" style="display: block; color: red; font-weight: bold; font-size: 18px;">
                        Important Note: Please take screenshots or photos of each tab including your zID as a record before submission.<br/>
                    </p>
                    <div class="h2 timer after-hide"><span style=""> zID: <?php echo isset($_POST["id"]) ? $_POST["id"] : "";?></span><br/><br/>Time Left <span id="min">90</span>:<span id="sec">00</span></div>
                </div>

                <div id="main-body">
                    <div class="row">
                        <div class="col-xs-12" id="answers" style="border: none;">
                            <ul>
                                <li><a href="#p1" class="bold after-hide">Stress</a></li>
                                <li><a href="#p2" class="bold after-hide">Strain</a></li>
                                <li><a href="#p3" class="bold after-hide">Plotting Mohr's Circle</a></li>
                                <li><a href="#testing" class="bold" style="color: red">Submission</a></li>
                            </ul>
                            
                            <div id="p1">
                                <div class="col-xs-12" style="font-weight: bold;">
                                    <p>
                                        The stress block shown in the figure below has the following stress components: (arrows in the figures always indicates the positive direction)
                                    </p>
                                    <div class="row">
                                        <div class="col-xs-6" style="font-weight: bold;">
                                            <ul>
                                                <li>&sigma;<sub>x</sub> = {{prob.x}} MPa</li>
                                                <li>&sigma;<sub>y</sub> = {{prob.y}} MPa</li>
                                                <li>&tau;<sub>xy</sub> = {{prob.xy}} MPa</li>
                                            </ul>
                                            <p>
                                                Please calculate the principal stress and principal angle. Round the answers to 0.01 MPa and/or 0.01&deg;
                                            </p>
                                            <ul class="qlist">
                                                <li>&sigma;<sub>1</sub> = <input id="s1" data-group="0" data-mark="20" size="6"/> MPa</li>
                                                <li>&sigma;<sub>2</sub> = <input id="s2" data-group="0" data-mark="20" size="6"/> MPa</li>
                                                <li>&theta;<sub>stress</sub> = <input id="theta_stress" data-group="0" data-mark="20" size="6"/> &deg;</li>
                                            </ul>
                                        </div>
                                        <div class="col-xs-6">
                                            <img src="resource/stress.png"/>
                                        </div>
                                    </div>
                                    <div class="row" style="margin-top: 40px; padding-top: 20px; border-top: 1px black dashed;">
                                        <div class="col-xs-6" style="font-weight: bold;">
                                            <p>
                                                If the stress block is rotated anti-clockwise from the horizontal direction by &beta; = 40&deg;, please calculate the new stress components using the direction indicated in the figure. Round the answers to 0.01 MPa:
                                            </p>
                                            <ul class="qlist">
                                                <li>&sigma;<sub>x1</sub> = <input id="xp" data-group="1" data-mark="20" size="6"/> MPa</li>
                                                <li>&sigma;<sub>y1</sub> = <input id="yp" data-group="1" data-mark="20" size="6"/> MPa</li>
                                                <li>&tau;<sub>x1y1</sub> = <input id="taup" data-group="1" data-mark="20" size="6"/> MPa</li>
                                            </ul>
                                        </div>
                                        <div class="col-xs-6">
                                            <img src="resource/rotation.png"/>
                                        </div>
                                    </div>
                                    <button type="button" class="btn btn-primary record" data-tab="1" ng-click="toRecord($event);">Record</button>
                                </div>
                            </div>
                            
                            <div id="p2">
                                <div class="col-xs-12" style="font-weight: bold;">
                                    <p>
                                        The stress in the previous tab are:
                                    </p>
                                    <ul>
                                        <li>&sigma;<sub>x</sub> = {{prob.x}} MPa</li>
                                        <li>&sigma;<sub>y</sub> = {{prob.y}} MPa</li>
                                        <li>&tau;<sub>xy</sub> = {{prob.xy}} MPa</li>
                                    </ul>
                                    <p>
                                        Assuming Young's modulus E = {{prob.young / 1e9}} GPa and Poisson's ratio &nu; = {{prob.pos}}, please calculate the strain components, the principal strain and principal angle using the Hooke's Law. Note the strain is written in &mu;, which represents one millionth, 10<sup>&#8209;6</sup>. Round the answers to 0.01 &mu; and/or 0.01&deg;
                                    </p>
                                    <div class="row">
                                        <div class="col-xs-6" style="font-weight: bold;">
                                            <ul class="qlist">
                                                <li>&epsilon;<sub>x</sub> = <input id="ex" data-group="0" data-mark="30" size="6"/> &mu;</li>
                                                <li>&epsilon;<sub>y</sub> = <input id="ey" data-group="0" data-mark="30" size="6"/> &mu;</li>
                                                <li>&gamma;<sub>xy</sub> = <input id="exy" data-group="0" data-mark="30" size="6"/> &mu;</li>
                                            </ul>
                                            <ul class="qlist" style="margin-top: 20px; padding-top: 20px; border-top: 1px black dashed;">
                                                <li>&epsilon;<sub>1</sub> = <input id="es1" data-group="1" data-mark="20" size="6"/> &mu;</li>
                                                <li>&epsilon;<sub>2</sub> = <input id="es2" data-group="1" data-mark="20" size="6"/> &mu;</li>
                                                <li>&theta;<sub>strain</sub> = <input id="theta_strain" data-group="1" data-mark="20" size="6"/> &deg;</li>
                                            </ul>
                                        </div>
                                        <div class="col-xs-6">
                                            <img src="resource/strain.png"/>
                                        </div>
                                    </div>
                                    <button type="button" class="btn btn-primary record" data-tab="2" ng-click="toRecord($event);">Record</button>
                                </div>
                            </div>
                            
                            <div id="p3">
                                <div class="col-xs-12" style="font-weight: bold;">
                                    <p>
                                        Please use the following plotting area to draw the Mohr's Circle for &sigma;<sub>x</sub> = {{prob.x}} MPa, &sigma;<sub>y</sub> = {{prob.y}} MPa, &tau;<sub>xy</sub> = {{prob.xy}} MPa.
                                    </p>
                                    <p>Instructions</p>
                                    <ol>
                                        <li>Drag point O to the center of the Mohr's Circle</li>
                                        <li>Drag point A to decide the size of the Mohr's Circle</li>
                                        <li>Drag point B to the corresponding location</li>
                                        <li>All numbers are rounded to 1</li>
                                    </ol>
                                </div>
                                <div class="col-xs-9">
                                    <div id="svg-mohr" style="width: 600px; height: 600px;"></div>
                                </div>
                                <div class="col-xs-3">
                                    <ul>
                                        <li id="list-o">O: (<span id="ox">1000</span>, <span id="oy">1000</span>)</li>
                                        <li id="list-a">A: (<span id="ax">1000</span>, <span id="ay">1000</span>)</li>
                                        <li id="list-b">B: (<span id="bx">1000</span>, <span id="by">1000</span>)</li>
                                        <li id="list-r">Radius: <span id="radius">1000</span></li>
                                    </ul>
                                </div>
                                <button type="button" class="btn btn-primary record" data-tab="3" ng-click="toRecord($event);">Record</button>
                            </div>
                            
                            <div id="testing">
                                <div class="col-xs-6" style="font-weight: bold;">
                                    <p>Question and Correct Answers</p>
                                    <ul>
                                        <li ng-repeat="(key, data) in prob">{{key}}: {{data > 1e6 ? data.toExponential(3) : data.toFixed(3)}}</li>
                                    </ul>
                                </div>
                                <div class="col-xs-6" style="font-weight: bold;">
                                    <p>Your Submission</p>
                                    <ul>
                                        <li ng-repeat="(key, data) in record.answers">{{key}}: {{data > 1e6 ? data.toExponential(3) : data.toFixed(3)}}</li>
                                    </ul>
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
</html>