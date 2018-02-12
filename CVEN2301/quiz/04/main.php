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
$column_data = "d4";

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
        
        <title>Quiz 04</title>
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
        <script src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-MML-AM_CHTML'></script>
        <link rel="stylesheet" type="text/css" href="css/layout.css?v=<?php echo rand(1, 10000); ?>"/>
        
        <script>
            var who = '<?php echo isset($_POST["id"]) ? $_POST["id"] : ""; ?>';
            var isFirst = '<?php echo $attempt; ?>';
        </script>
    </head>
    <body>
        <div class="container" id="module">
            <div class="row">
                <div id="id-bar" class="col-xs-12" style="margin-top: 30px;">
                    <p id="main-score">
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
                            <div class="col-xs-12">
                                <p style="font-weight: bold;">
                                    A beam is made from a linear elastic material and has a cross section as follows. The vertical shear force on the section is 100 kN.
                                </p>
                                <div class="row">
                                    <div class="col-xs-6" style="font-weight: bold;">
                                        <p>
                                            Dimensions are shown as follows
                                        </p>
                                        <ul style="font-weight: bold; font-family: monospace;">
                                            <li>AB = {{problem.x1}} mm</li>
                                            <li>AC = {{problem.y1}} mm</li>
                                            <li>DE = {{problem.x2}} mm</li>
                                            <li>DH = {{problem.y2}} mm</li>
                                            <li>GK = {{problem.y3}} mm</li>
                                            <li>CD = {{problem.left}} mm</li>
                                        </ul>
                                        <p>
                                            Distance from the neutral axis to the bottom edge is<br/>
                                            <span style="border-top: 3px black solid;">y</span> = {{problem.y.toFixed(2)}} mm
                                        </p>
                                        <p>
                                            The second moment of area is<br/>
                                            I<sub>xx</sub> = {{problem.i.toExponential(3)}} mm<sup>4</sup>
                                        </p>
                                    </div>
                                    <div class="col-xs-6">
                                        <div id="svg-prob" style="width: 400px; height: 400px;"></div>
                                    </div>
                                </div>
                                <div class="row" style="margin-top: 40px; padding-top: 10px; border-top: 1px black dashed;">
                                    <div class="col-xs-12" style="padding-top: 10px;">
                                        <strong>1. Determine First Moment of Area: (answer with 3 significant digits)</strong><br/><br/>
                                        <ul>
                                            <li>Q<sub>DE</sub> = <input id='qde' size='8'> mm<sup>3</sup></li>
                                            <li>Q<sub>HL</sub> = <input id='qhl' size='8'> mm<sup>3</sup></li>
                                            <li>Q<sub>IM</sub> = <input id='qim' size='8'> mm<sup>3</sup></li>
                                        </ul>
                                        To help with your calculation, you can add/remove arrows in the figure by clicking the following buttons (drag arrow-tip point to move the arrow)<br/><br/>
                                        <button class='btn btn-success btn-xs' onclick="add_arrow(event);">add arrow</button>
                                        <button class='btn btn-danger btn-xs' onclick="remove_arrow(event);">remove arrow</button>
                                    </div>
                                    <div class="col-xs-12" style="border-top: 1px black dashed; padding-top: 10px; margin-top: 10px;">
                                        <strong>2. Determine Shear Stress:</strong><br/><br/>
                                        <ul>
                                            <li>&#120591;<sub>DE</sub> = <input id='tde' size='8'> MPa</li>
                                            <li>&#120591;<sub>HL</sub> = <input id='thl' size='8'> MPa</li>
                                            <li>&#120591;<sub>IM</sub> = <input id='tim' size='8'> MPa</li>
                                        </ul>
                                    </div>
                                </div>
                                <button type="button" class="btn btn-primary record" data-tab="1" v-on:click="toRecord($event);">Record</button>
                            </div>
                        </div>

                        <div id="testing">
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