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
$column_data = "d1";

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
        
        <title>Quiz 01</title>
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
        <link rel="stylesheet" type="text/css" href="css/layout.css?v=<?php echo rand(1, 10000); ?>"/>
        
        <script>
            var who = '<?php echo isset($_POST["id"]) ? $_POST["id"] : ""; ?>';
            var isFirst = '<?php echo $attempt; ?>';
        </script>
    </head>
    <body>
        <div class="container">
            <div id="myapp" class="row">
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
                        <button class="btn btn-primary" id="id-submit" v-on:click="tofinish">Finish and Submit</button>
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
                    <div id="question" class="row after-hide" style="font-weight: bold;">
                        <div id="text-prob" class="col-xs-6" style="padding-right: 30px;">
                            <p>
                                The section shown on the right has the following coordinates (unit: mm):
                            </p>
                            <ul style="font-weight: bold; font-family: monospace;">
                                <li>A: (0, 0)</li>
                                <li>B: (0, {{y}})</li>
                                <li>C: ({{x}}, {{y}})</li>
                                <li>D: ({{x}}, 0)</li>
                                <li>E: ({{(x - y) / 2}}, {{y}})</li>
                                <li>F: ({{(x - y) / 2}}, {{x}})</li>
                                <li>G: ({{(x - y) / 2 + y}}, {{x}})</li>
                                <li>H: ({{(x - y) / 2 + y}}, {{y}})</li>
                                <li>I: ({{(x - y) / 2 + y}}, {{x - y}})</li>
                                <li>J: ({{x - 10}}, {{x - y}})</li>
                                <li>K: ({{x - 10}}, {{x}})</li>
                            </ul>
                            <p>The coordinates system shown in the figure has its origin at the left bottom corner. The x axis is the horizontal axis and the y axis is perpendicular. You can identify the coordinates of each point A,B,... by moving your mouse above the points in the figure.</p>
                            <p>The section consists of three rectangular elements defined by:</p>
                            <ul>
                                <li>Member 1: <span style="color: #32CD32">ABCD</span></li>
                                <li>Member 2: <span style="color: #6495ED">EFGH</span></li>
                                <li>Member 3: <span style="color: #F08080">GKJI</span></li>
                            </ul>
                            <p>
                                Please complete the following questions in the three tabs:
                            </p>
                        </div>
                        <div class="col-xs-6">
                            <div id="svg-prob" style="width: 400px; height: 400px;"></div>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-xs-12" id="answers" style="border: none;">
                            <ul>
                                <li><a href="#p1" class="bold after-hide">Centroid</a></li>
                                <li><a href="#p2" class="bold after-hide">Second Moment of Area</a></li>
                                <li><a href="#p3" class="bold after-hide">Principal Second Moment of Area</a></li>
                                <li><a href="#testing" class="bold after-show" style="color: red">Correct Answers</a></li>
                                <li><a href="#submitted" class="bold after-show" style="color: red;">Your Answers</a></li>
                            </ul>

                            <div id="p1">
                                <p class="col-xs-12" style="font-weight: bold;">
                                    NOTE: If answer need rounding, work with <strong style="color: red">2 decimals</strong>. unit: mm, mm<sup>2</sup>, mm<sup>3</sup>.
                                </p>
                                <table class="table">
                                    <caption>Table for Centroid (10 Marks)</caption>
                                    <tr>
                                        <th>Member (i)</th>
                                        <th>Area (A)</th>
                                        <th>x'<sub>i</sub></th>
                                        <th>y'<sub>i</sub></th>
                                        <th>A<sub>i</sub>x'<sub>i</sub></th>
                                        <th>A<sub>i</sub>y'<sub>i</sub></th>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold;">1 <span style="color: #32CD32">ABCD</span></td>
                                        <td><input type="text" id="A1" size="10" data-type="n" v-model="input_A1"/></td>
                                        <td><input type="text" id="x1" size="10" data-type="n" v-model="input_x1"/></td>
                                        <td><input type="text" id="y1" size="10" data-type="n" v-model="input_y1"/></td>
                                        <td><input type="text" id="Ax1" size="10" data-type="n"/></td>
                                        <td><input type="text" id="Ay1" size="10" data-type="n"/></td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold;">2 <span style="color: #6495ED">EFGH</span></td>
                                        <td><input type="text" id="A2" size="10" data-type="n" v-model="input_A2"/></td>
                                        <td><input type="text" id="x2" size="10" data-type="n" v-model="input_x2"/></td>
                                        <td><input type="text" id="y2" size="10" data-type="n" v-model="input_y2"/></td>
                                        <td><input type="text" id="Ax2" size="10" data-type="n"/></td>
                                        <td><input type="text" id="Ay2" size="10" data-type="n"/></td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold;">3 <span style="color: #F08080">GKJI</span></td>
                                        <td><input type="text" id="A3" size="10" data-type="n" v-model="input_A3"/></td>
                                        <td><input type="text" id="x3" size="10" data-type="n" v-model="input_x3"/></td>
                                        <td><input type="text" id="y3" size="10" data-type="n" v-model="input_y3"/></td>
                                        <td><input type="text" id="Ax3" size="10" data-type="n"/></td>
                                        <td><input type="text" id="Ay3" size="10" data-type="n"/></td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold;">Sum</td>
                                        <td><input type="text" id="Asum" size="10" data-type="n"/></td>
                                        <td></td>
                                        <td></td>
                                        <td><input type="text" id="Axsum" size="10" data-type="n"/></td>
                                        <td><input type="text" id="Aysum" size="10" data-type="n"/></td>
                                    </tr>
                                </table>
                                <p style="font-weight: bold;">
                                    x̄ = <input type="text" class="sub-final" id="xbar" size="10" data-type="n" v-model="input_xbar"/> mm (10 Marks)
                                </p>
                                <p style="font-weight: bold;">
                                    ȳ = <input type="text" class="sub-final" id="ybar" size="10" data-type="n" v-model="input_ybar"/> mm (10 Marks)
                                </p>
                                <p style="font-weight: bold; margin-top: 20px;">
                                    You can check your x̄ and ȳ by clicking this button, but it costs you 5 marks!
                                    <button type="button" class="btn btn-primary btn-xs trial" data-trial="1" v-on:click="toCheck($event);">Check Your Answer (5 marks penalty)</button>
                                    <button type="button" class="btn btn-primary record" v-on:click="toRecord($event);">Record</button>
                                </p>
                                <p style="font-weight: bold; margin-top: 20px;">
                                    When finished, please scroll to the top of the page and click the 'Finish and Submit' button
                                </p>
                            </div>
                            
                            <div id="p2">
                                <p class="col-xs-12" style="font-weight: bold;">
                                    NOTE: For values of second moment of area or components of second moment of area, work with <strong style="color: red">4 significant digits</strong> and present the answers in scientific notation (i.e. 1.2345e10 for 1.2345 &times; 10<sup>10</sup>, <a href="https://en.wikipedia.org/wiki/Significant_figures#Significant_figures_rules_explained" target="_blank" style="color: blue;">click here for more explanation</a>); for values of length, work with 2 decimals. unit: mm, mm<sup>4</sup>.
                                    <br/><br/>
                                    Values of area, x<sub>i</sub>, y<sub>i</sub>, x̄ and ȳ you calculated in the previous tab are shown in the table. Areas are rounded to 0 decimal and others are rounded to 2 decimals. (If you have not calculated them, nothing will be shown. If your previous input is not a number, "NaN" (Not a number) will be shown)
                                </p>
                                <table class="table">
                                    <caption>Table for Second Moment of Area (10 Marks)</caption>
                                    <tr>
                                        <th></th>
                                        <th>Member 1 <span style="color: #32CD32">ABCD</span></th>
                                        <th>Member 2 <span style="color: #6495ED">EFGH</span></th>
                                        <th>Member 3 <span style="color: #F08080">GKJI</span></th>
                                        <th>Sum</th>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold;">A</td>
                                        <td>{{input_A1 == "" ? "" : Number(input_A1).toFixed(0)}}</td>
                                        <td>{{input_A2 == "" ? "" : Number(input_A2).toFixed(0)}}</td>
                                        <td>{{input_A3 == "" ? "" : Number(input_A3).toFixed(0)}}</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold;">x<sub>i</sub></td>
                                        <td>{{input_x1 == "" ? "" : Number(input_x1).toFixed(2)}}</td>
                                        <td>{{input_x2 == "" ? "" : Number(input_x2).toFixed(2)}}</td>
                                        <td>{{input_x3 == "" ? "" : Number(input_x3).toFixed(2)}}</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold;">y<sub>i</sub></td>
                                        <td>{{input_y1 == "" ? "" : Number(input_y1).toFixed(2)}}</td>
                                        <td>{{input_y2 == "" ? "" : Number(input_y2).toFixed(2)}}</td>
                                        <td>{{input_y3 == "" ? "" : Number(input_y3).toFixed(2)}}</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold;">x̄</td>
                                        <td>{{input_xbar == "" ? "" : Number(input_xbar).toFixed(2)}}</td>
                                        <td>{{input_xbar == "" ? "" : Number(input_xbar).toFixed(2)}}</td>
                                        <td>{{input_xbar == "" ? "" : Number(input_xbar).toFixed(2)}}</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold;">ȳ</td>
                                        <td>{{input_ybar == "" ? "" : Number(input_ybar).toFixed(2)}}</td>
                                        <td>{{input_ybar == "" ? "" : Number(input_ybar).toFixed(2)}}</td>
                                        <td>{{input_ybar == "" ? "" : Number(input_ybar).toFixed(2)}}</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold;">x̄<sub>i</sub></td>
                                        <td><input type="text" id="xbar1" size="10" data-type="n"/></td>
                                        <td><input type="text" id="xbar2" size="10" data-type="n"/></td>
                                        <td><input type="text" id="xbar3" size="10" data-type="n"/></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold;">ȳ<sub>i</sub></td>
                                        <td><input type="text" id="ybar1" size="10" data-type="n"/></td>
                                        <td><input type="text" id="ybar2" size="10" data-type="n"/></td>
                                        <td><input type="text" id="ybar3" size="10" data-type="n"/></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold;">A<sub>i</sub>(x̄<sub>i</sub>)<sup>2</sup></td>
                                        <td><input type="text" id="Ax21" size="10"/></td>
                                        <td><input type="text" id="Ax22" size="10"/></td>
                                        <td><input type="text" id="Ax23" size="10"/></td>
                                        <td><input type="text" id="Ax2sum" size="10"/></td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold;">I<sup>i</sup><sub>yy</sub></td>
                                        <td><input type="text" id="Iyy1" size="10"/></td>
                                        <td><input type="text" id="Iyy2" size="10"/></td>
                                        <td><input type="text" id="Iyy3" size="10"/></td>
                                        <td><input type="text" id="Iyysum" size="10"/></td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold;">A<sub>i</sub>(ȳ<sub>i</sub>)<sup>2</sup></td>
                                        <td><input type="text" id="Ay21" size="10"/></td>
                                        <td><input type="text" id="Ay22" size="10"/></td>
                                        <td><input type="text" id="Ay23" size="10"/></td>
                                        <td><input type="text" id="Ay2sum" size="10"/></td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold;">I<sup>i</sup><sub>xx</sub></td>
                                        <td><input type="text" id="Ixx1" size="10"/></td>
                                        <td><input type="text" id="Ixx2" size="10"/></td>
                                        <td><input type="text" id="Ixx3" size="10"/></td>
                                        <td><input type="text" id="Ixxsum" size="10"/></td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold;">A<sub>i</sub>x̄<sub>i</sub>ȳ<sub>i</sub></td>
                                        <td><input type="text" id="Axy1" size="10"/></td>
                                        <td><input type="text" id="Axy2" size="10"/></td>
                                        <td><input type="text" id="Axy3" size="10"/></td>
                                        <td><input type="text" id="Axysum" size="10"/></td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold;">I<sup>i</sup><sub>xy</sub></td>
                                        <td><input type="text" id="Ixy1" size="10"/></td>
                                        <td><input type="text" id="Ixy2" size="10"/></td>
                                        <td><input type="text" id="Ixy3" size="10"/></td>
                                        <td><input type="text" id="Ixysum" size="10"/></td>
                                    </tr>
                                </table>
                                <p style="font-weight: bold;">
                                    I<sub>xx</sub> = <input type="text" class="sub-final" id="Ixx" size="10" v-model="input_Ixx"/> mm<sup>4</sup> (15 Marks)
                                </p>
                                <p style="font-weight: bold;">
                                    I<sub>yy</sub> = <input type="text" class="sub-final" id="Iyy" size="10" v-model="input_Iyy"/> mm<sup>4</sup> (15 Marks)
                                </p>
                                <p style="font-weight: bold;">
                                    I<sub>xy</sub> = <input type="text" class="sub-final" id="Ixy" size="10" v-model="input_Ixy"/> mm<sup>4</sup> (15 Marks)
                                </p>
                                <p style="font-weight: bold; margin-top: 20px;">
                                    You can check your I<sub>xx</sub>, I<sub>yy</sub> and I<sub>xy</sub> by clicking this button, but it costs you 5 marks!
                                    <button type="button" class="btn btn-primary btn-xs trial" data-trial="1" v-on:click="toCheck($event);">Check Your Answer (5 marks penalty)</button>
                                    <button type="button" class="btn btn-primary record" v-on:click="toRecord($event);">Record</button>
                                </p>
                                <p style="font-weight: bold; margin-top: 20px;">
                                    When finished, please scroll to the top of the page and click the 'Finish and Submit' button
                                </p>
                            </div>
                            
                            <div id="p3">
                                <p class="col-xs-12" style="font-weight: bold;">
                                    NOTE: For I<sub>1</sub> and I<sub>3</sub>, work with <strong style="color: red">four significant digits</strong> and present the answers in scientific notation (i.e. 1.234e10 for 1.234 &times; 10<sup>10</sup>, <a href="https://en.wikipedia.org/wiki/Significant_figures#Significant_figures_rules_explained" target="_blank" style="color: blue;">click here for more explanation</a>); for &theta;, work with <strong style="color: red">2 decimals</strong>.
                                    <br/><br/>
                                    Values of I<sub>xx</sub>, I<sub>yy</sub> and I<sub>xy</sub> you calculated in the previous tab are rounded to 4 significant digits and shown as follows (unit: mm<sup>4</sup>). (If you have not calculated them, nothing will be shown. If your previous input is not a number, "NaN" (not a number) will be shown)
                                </p>
                                <div style="margin-left: 30px; margin-bottom: 20px; font-weight: bold;">
                                    <p>I<sub>xx</sub> = {{input_Ixx == "" ? "" : Number(input_Ixx).toExponential(3)}}</p>
                                    <p>I<sub>yy</sub> = {{input_Iyy == "" ? "" : Number(input_Iyy).toExponential(3)}}</p>
                                    <p>I<sub>xy</sub> = {{input_Ixy == "" ? "" : Number(input_Ixy).toExponential(3)}}</p>
                                </div>
                                <p style="font-weight: bold;">
                                    &theta; = <input type="text" class="sub-final" id="theta" data-type="n" size="10"/> &deg; (5 Marks)
                                </p>
                                <p style="font-weight: bold;">
                                    I<sub>1</sub> = <input type="text" class="sub-final" id="I1" size="10"/> mm<sup>4</sup> (5 Marks)
                                </p>
                                <p style="font-weight: bold;">
                                    I<sub>2</sub> = <input type="text" class="sub-final" id="I2" size="10"/> mm<sup>4</sup> (5 Marks)
                                </p>
                                <p style="font-weight: bold; margin-top: 20px;">
                                    You can check your I<sub>1</sub>, I<sub>2</sub> and &theta; by clicking this button, but it costs you 5 marks!
                                    <button type="button" class="btn btn-primary btn-xs trial" data-trial="1" v-on:click="toCheck($event);">Check Your Answer (5 marks penalty)</button>
                                    <button type="button" class="btn btn-primary record" v-on:click="toRecord($event);">Record</button>
                                </p>
                                <p style="font-weight: bold; margin-top: 20px;">
                                    When finished, please scroll to the top of the page and click the 'Finish and Submit' button
                                </p>
                            </div>
                            
                            <div id="testing">
                                <p style="font-weight: bold;">zID: <?php echo isset($_POST["id"]) ? $_POST["id"] : "";?></p>
                                <div class="col-xs-4">
                                    <ul>
                                        <li v-for="(value, key) in part1">
                                            {{key}}: {{value}}
                                        </li>
                                    </ul>
                                </div>
                                <div class="col-xs-4">
                                    <ul>
                                        <li v-for="(value, key) in part2">
                                            {{key}}: {{value}}
                                        </li>
                                    </ul>
                                </div>
                                <div class="col-xs-4">
                                    <ul>
                                        <li v-for="(value, key) in part3">
                                            {{key}}: {{value}}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div id="submitted">
                                <p style="font-weight: bold;">zID: <?php echo isset($_POST["id"]) ? $_POST["id"] : "";?></p>
                                <div class="col-xs-4">
                                    <ul>
                                        <li v-for="(value, key) in submit.part1">
                                            {{key}}: {{value}}
                                        </li>
                                    </ul>
                                </div>
                                <div class="col-xs-4">
                                    <ul>
                                        <li v-for="(value, key) in submit.part2">
                                            {{key}}: {{value}}
                                        </li>
                                    </ul>
                                </div>
                                <div class="col-xs-4">
                                    <ul>
                                        <li v-for="(value, key) in submit.part3">
                                            {{key}}: {{value}}
                                        </li>
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
                    
                    <div id="console" class="row after-show" style="display: none;">
                        <div class="col-xs-4">
                            <p><strong>Console Info, for developing purpose</strong></p>
                            <p>
                                Score: {{score}}
                            </p>
                            <ul id="console-result">

                            </ul>
                            <p>
                                <span v-for="value in mark_part"> {{value}} ,</span>
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
    <script src="script/vm.js?v=<?php echo rand(1, 10000); ?>"></script>
</html>