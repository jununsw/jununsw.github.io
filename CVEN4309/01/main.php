<?php

header('Expires: Sun, 01 Jan 2014 00:00:00 GMT');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('Cache-Control: post-check=0, pre-check=0', FALSE);
header('Pragma: no-cache');

// check time
$now = time();
if ((isset($_GET['v'])) && (abs($now - intval($_GET['v'])) <= 5)) {

} else {
    die("access denied!");
}

// connect to database to see if it is a new attempt
if (!isset($_POST["id"])) {
    die("Cannot obtain your id, probably due to your network connection, please close the tab and re-try");
} else {
    $zid = $_POST["id"];
}

$dir =  $_SERVER['DOCUMENT_ROOT'];
require($dir . "/unsw/db_config/db_header.php");

$table = "cven4309";
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

<!--
#74 add class='ror'
-->

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
        <script src="script/data.js?v=<?php echo rand(1, 10000); ?>"></script>
        <script src="script/mulitple.js?v=<?php echo rand(1, 10000); ?>"></script>
        <script src="https://jununsw.github.io/res/util.js"></script>
        <link rel="stylesheet" type="text/css" href="css/layout.css?v=<?php echo rand(1, 10000); ?>"/>
        
        <script>
            var who = '<?php echo isset($_POST["id"]) ? $_POST["id"] : ""; ?>';
            var isFirst = '<?php echo $attempt; ?>';
        </script>
    </head>
    <body>
        <div class="container">
            <div class="row" id="myapp">
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
                        <button class="btn btn-primary" id="id-submit" v-on:click="tofinish" disabled>Finish and Submit</button>
                        <span style="font-weight: bold;">zID: <?php echo isset($_POST["id"]) ? $_POST["id"] : "";?></span>
                        <span id="after-submit"></span><br/><br/>
                        <span style="font-weight: bold;" class="after-hide" id="timeup"></span>
                    </p>
                    <div class="alert alert-danger after-hide" role="alert">
                        <p class="after-hide" style="font-weight: bold; font-size: 1.1em;">
                            There are three tabs of questions. There are 90 marks in total.<br/>
                            Please take screenshot of each tab for your record. (You can do so after submission)<br/>
                            Click 'Finish and Submit' after you complete all questions. Note you can only submit once!
                        </p>
                    </div>
                    <div class="h2 timer after-hide">
                        <span style=""> zID: <?php echo isset($_POST["id"]) ? $_POST["id"] : "";?></span><br/><br/>
                        Time Left <span id="min">90</span>:<span id="sec">00</span><br/><br/>
                        <canvas id="clock" width="150" height="150" style="display: none;"></canvas>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-xs-12" id="answers" style="border: none;">
                        <div id="main-body">
                            <ul>
                                <li><a href="#p0" class="bold">Multiple Choice</a></li>
                                <li><a href="#p1" class="bold">Calculation 1</a></li>
                                <li><a href="#p2" class="bold">Calculation 2</a></li>
                                <li><a href="#p3" class="bold">Upload Drafts (Optional)</a></li>
                            </ul>

                            <div id="p0" class="question">
                                <p class="bold">Multiple Choice (1 mark each)<br/><br/></p>
                                <p class="bold">
                                    1. {{part0[0].question}}
                                </p>
                                <form id="s0">
                                    <ul>
                                        <li><input type="radio" name="0-0" value="0"/> {{part0[0].options[0]}}</li>
                                        <li><input type="radio" name="0-0" value="1"/> {{part0[0].options[1]}}</li>
                                        <li><input type="radio" name="0-0" value="2"/> {{part0[0].options[2]}} <button type="button" class="btn btn-danger btn-xs" v-on:click="toSelect(0, $event);">Record Answers</button></li>
                                    </ul>
                                </form>

                                <p class="bold">
                                    2. {{part0[1].question}}
                                </p>
                                <form id="s1">
                                    <ul>
                                        <li><input type="radio" name="0-1" value="0"/> {{part0[1].options[0]}}</li>
                                        <li><input type="radio" name="0-1" value="1"/> {{part0[1].options[1]}}</li>
                                        <li><input type="radio" name="0-1" value="2"/> {{part0[1].options[2]}} <button type="button" class="btn btn-danger btn-xs" v-on:click="toSelect(1, $event);">Record Answers</button></li>
                                    </ul>
                                </form>

                                <p class="bold">
                                    3. {{part0[2].question}}
                                </p>
                                <form id="s2">
                                    <ul>
                                        <li><input type="radio" name="0-2" value="0"/> {{part0[2].options[0]}}</li>
                                        <li><input type="radio" name="0-2" value="1"/> {{part0[2].options[1]}}</li>
                                        <li><input type="radio" name="0-2" value="2"/> {{part0[2].options[2]}} <button type="button" class="btn btn-danger btn-xs" v-on:click="toSelect(2, $event);">Record Answers</button></li>
                                    </ul>
                                </form>

                                <p class="bold">
                                    4. {{part0[3].question}}
                                </p>
                                <form id="s3">
                                    <ul>
                                        <li><input type="radio" name="0-3" value="0"/> {{part0[3].options[0]}}</li>
                                        <li><input type="radio" name="0-3" value="1"/> {{part0[3].options[1]}}</li>
                                        <li><input type="radio" name="0-3" value="2"/> {{part0[3].options[2]}} <button type="button" class="btn btn-danger btn-xs" v-on:click="toSelect(3, $event);">Record Answers</button></li>
                                    </ul>
                                </form>
                            </div>

                            <div id="p1" class="question">
                                <p class="bold">
                                    NOTE:
                                </p>
                                <ul>
                                    <li class="bold">To get the correct rounding, work with four decimal places only for the calculation. Present your answer to three decimal places.</li>
                                    <li class="bold">There is a table at bottom for you to record any coefficients (optional). If you do so, when your final answer is incorrect, partial mark might be given if you correctly answered most of the coefficients (details see <a href="#table1" style="color: blue; font-style: italic;">below</a>)</li>
                                </ul>
                                <div class="figure">
                                    <img src="resource/01.png"/>
                                </div>
                                <p>
                                    {{part1.joist.depth}} &times; {{part1.joist.width}} seasoned {{part1.joist.grade}} joists support a residential floor at {{part1.joist.centres}} mm centres in {{part1.location}} under the below loads, spanning {{part1.joist.span}} m. The width of the floor is 6 m. These floor joists are supported by a 2 &times; {{part1.bearer.depth}} &times; {{part1.bearer.width}} seasoned {{part1.bearer.grade}} that spans {{part1.bearer.span}} m above a window with a bearing length of {{part1.bearer.length}} mm (assume the load of the joists acts as a UDL on the bearer).
                                </p>
                                <ul>
                                  <li>G (incl. SW) = {{part1.deadload}} kPa</li>
                                  <li>Q (&lt; 1 day duration) = {{part1.liveload}} kPa</li>
                                </ul>

                                <p class="bold">
                                    1. Assess the bending strength of the joists (4 marks &times; 2)
                                </p>
                                <ol>
                                    <li>What is the bending load on the joists? <input id="q0-1" size="8"/> kNm</li>
                                    <li>What is the bending capacity of the joists? <input id="q0-2" size="8"/> kNm <button type="button" class="btn btn-danger btn-xs" v-on:click="check(0, $event);">Record Answers</button></li>
                                </ol>

                                <p class="bold">
                                    2. Assess the flexural shear strength of the joists (4 marks &times; 2)
                                </p>
                                <ol>
                                    <li>What is the flexural load on the joists? <input id="q1-1" size="8"/> kN</li>
                                    <li>What is the flexural capacity of the joists? <input id="q1-2" size="8"/> kN <button type="button" class="btn btn-danger btn-xs" v-on:click="check(1, $event);">Record Answers</button></li>
                                </ol>

                                <p class="bold">
                                    3. Assess the bearing strength of the joists (4 marks &times; 2)
                                </p>
                                <ol>
                                    <li>What is the bearing load on the joists? <input id="q2-1" size="8"/> kN</li>
                                    <li>What is the bearing capacity of the joists? <input id="q2-2" size="8"/> kN <button type="button" class="btn btn-danger btn-xs" v-on:click="check(2, $event);">Record Answers</button></li>
                                </ol>

                                <p class="bold">
                                    4. Assess the serviceability the floor joists for appearance under the below loads against a span / 300 sag limit under a G + &psi;lQ load (4 marks &times; 2)
                                </p>
                                <ol>
                                    <li>What is the deflection of the joists? <input id="q3-1" size="8"/> mm</li>
                                    <li>What is the deflection limit on the joists? <input id="q3-2" size="8"/> mm <button type="button" class="btn btn-danger btn-xs" v-on:click="check(3, $event);">Record Answers</button></li>
                                </ol>

                                <p class="bold">
                                    5. Is the floor joist appropriate? (2 marks)
                                </p>
                                <form id="q4">
                                    <ul>
                                        <li><input type="radio" name="1-5" value="smaller"/> Yes</li>
                                        <li><input type="radio" name="1-5" value="larger"/> No, need larger joist</li>
                                        <li><input type="radio" name="1-5" value="smaller"/> No, need smaller joist <button type="button" class="btn btn-danger btn-xs" v-on:click="check(4, $event);">Record Answers</button></li>
                                    </ul>
                                </form>

                                <p class="bold">
                                    6. Assess the bending strength of the bearer (4 marks &times; 2)
                                </p>
                                <ol>
                                    <li>What is the bending load on the bearer? <input id="q5-1" size="8"/> kNm</li>
                                    <li>What is the bending capacity of the bearer? <input id="q5-2" size="8"/> kNm <button type="button" class="btn btn-danger btn-xs" v-on:click="check(5, $event);">Record Answers</button></li>
                                </ol>

                                <p class="bold">
                                    7. Assess the flexural shear strength of the bearer (4 marks &times; 2)
                                </p>
                                <ol>
                                    <li>What is the flexural load on the bearer? <input id="q6-1" size="8"/> kN</li>
                                    <li>What is the flexural capacity of the bearer? <input id="q6-2" size="8"/> kN <button type="button" class="btn btn-danger btn-xs" v-on:click="check(6, $event);">Record Answers</button></li>
                                </ol>

                                <p class="bold">
                                    8. Assess the bearing strength of the bearer (4 marks &times; 2)
                                </p>
                                <ol>
                                    <li>What is the bearing load on the bearer? <input id="q7-1" size="8"/> kN</li>
                                    <li>What is the bearing capacity of the bearer? <input id="q7-2" size="8"/> kN <button type="button" class="btn btn-danger btn-xs" v-on:click="check(7, $event);">Record Answers</button></li>
                                </ol>

                                <p class="bold">
                                    9. Assess the serviceability of the bearer against a maximum deflection of 5mm under a G + &psi;lQ load to prevent load transfer to the window (4 marks &times; 2)
                                </p>
                                <ol>
                                    <li>What is the deflection of the bearer? <input id="q8-1" size="8"/> mm</li>
                                    <li>What is the deflection limit on the bearer the bearer? <input id="q8-2" size="8"/> mm <button type="button" class="btn btn-danger btn-xs" v-on:click="check(8, $event);">Record Answers</button></li>
                                </ol>

                                <p class="bold">
                                    10. Is the bearer appropriate? (2 marks)
                                </p>
                                <form id="q9">
                                    <ul>
                                        <li><input type="radio" name="1-10" value="smaller"/> Yes</li>
                                        <li><input type="radio" name="1-10" value="larger"/> No, need larger bearer</li>
                                        <li><input type="radio" name="1-10" value="smaller"/> No, need smaller bearer <button type="button" class="btn btn-danger btn-xs" v-on:click="check(9, $event);">Record Answers</button></li>
                                    </ul>
                                </form>

                                <div id="table1" style="border-style: ridge; padding: 10px;">
                                    <p class="h4 bold">Table for Coefficients of Calculation 1</p>
                                    <ul>
                                        <li>You can record any relevant coefficients in your calculation (optional)</li>
                                        <li>Leave the inputbox blank if the coefficient is irrelevant</li>
                                        <li>Partial mark will be given for your calculation if you have no more than:</li>
                                        <ul>
                                            <li>1 incorrect coefficient: 75%</li>
                                            <li>2 incorrect coefficients: 50%</li>
                                            <li>3 incorrect coefficients: 25%</li>
                                        </ul>
                                        <li>Multiple choices (including those in Calculation 1&2) have no partial mark</li>
                                    </ul>
                                    <table class="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>Coeffcients</th>
                                                <th>For Joists</th>
                                                <th>For Bearer</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>A<sub>c</sub> (mm<sup>2</sup>)</td>
                                                <td><input v-model="text.input1.Ac[0]"></td>
                                                <td><input v-model="text.input1.Ac[1]"></td>
                                            </tr>
                                            <tr>
                                                <td>A<sub>p</sub> (mm<sup>2</sup>)</td>
                                                <td><input v-model="text.input1.Ap[0]"></td>
                                                <td><input v-model="text.input1.Ap[1]"></td>
                                            </tr>
                                            <tr>
                                                <td>A<sub>s</sub> (mm<sup>2</sup>)</td>
                                                <td><input v-model="text.input1.As[0]"></td>
                                                <td><input v-model="text.input1.As[1]"></td>
                                            </tr>
                                            <tr>
                                                <td>A<sub>t</sub> (mm<sup>2</sup>)</td>
                                                <td><input v-model="text.input1.At[0]"></td>
                                                <td><input v-model="text.input1.At[1]"></td>
                                            </tr>
                                            <tr>
                                                <td>E<sub>mean</sub> (MPa)</td>
                                                <td><input v-model="text.input1.Emean[0]"></td>
                                                <td><input v-model="text.input1.Emean[1]"></td>
                                            </tr>
                                            <tr>
                                                <td>E<sub>0.05</sub> (MPa)</td>
                                                <td><input v-model="text.input1.E005[0]"></td>
                                                <td><input v-model="text.input1.E005[1]"></td>
                                            </tr>
                                            <tr>
                                                <td>f<sub>b</sub> (MPa)</td>
                                                <td><input v-model="text.input1.fb[0]"></td>
                                                <td><input v-model="text.input1.fb[1]"></td>
                                            </tr>
                                            <tr>
                                                <td>f<sub>c</sub> (MPa)</td>
                                                <td><input v-model="text.input1.fc[0]"></td>
                                                <td><input v-model="text.input1.fc[1]"></td>
                                            </tr>
                                            <tr>
                                                <td>f<sub>p</sub> (MPa)</td>
                                                <td><input v-model="text.input1.fp[0]"></td>
                                                <td><input v-model="text.input1.fp[1]"></td>
                                            </tr>
                                            <tr>
                                                <td>f<sub>s</sub> (MPa)</td>
                                                <td><input v-model="text.input1.fs[0]"></td>
                                                <td><input v-model="text.input1.fs[1]"></td>
                                            </tr>
                                            <tr>
                                                <td>f<sub>t</sub> (MPa)</td>
                                                <td><input v-model="text.input1.ft[0]"></td>
                                                <td><input v-model="text.input1.ft[1]"></td>
                                            </tr>
                                            <tr>
                                                <td>I (mm<sup>4</sup>)</td>
                                                <td><input v-model="text.input1.I[0]"></td>
                                                <td><input v-model="text.input1.I[1]"></td>
                                            </tr>
                                            <tr>
                                                <td>j<sub>2,short</sub></td>
                                                <td><input v-model="text.input1.j2short[0]"></td>
                                                <td><input v-model="text.input1.j2short[1]"></td>
                                            </tr>
                                            <tr>
                                                <td>j<sub>2,long</sub></td>
                                                <td><input v-model="text.input1.j2long[0]"></td>
                                                <td><input v-model="text.input1.j2long[1]"></td>
                                            </tr>
                                            <tr>
                                                <td>j<sub>3</sub></td>
                                                <td><input v-model="text.input1.j3[0]"></td>
                                                <td><input v-model="text.input1.j3[1]"></td>
                                            </tr>
                                            <tr>
                                                <td>k<sub>1</sub></td>
                                                <td><input v-model="text.input1.k1[0]"></td>
                                                <td><input v-model="text.input1.k1[1]"></td>
                                            </tr>
                                            <tr>
                                                <td>k<sub>4</sub></td>
                                                <td><input v-model="text.input1.k4[0]"></td>
                                                <td><input v-model="text.input1.k4[1]"></td>
                                            </tr>
                                            <tr>
                                                <td>k<sub>6</sub></td>
                                                <td><input v-model="text.input1.k6[0]"></td>
                                                <td><input v-model="text.input1.k6[1]"></td>
                                            </tr>
                                            <tr>
                                                <td>k<sub>7</sub></td>
                                                <td><input v-model="text.input1.k7[0]"></td>
                                                <td><input v-model="text.input1.k7[1]"></td>
                                            </tr>
                                            <tr>
                                                <td>k<sub>9</sub></td>
                                                <td><input v-model="text.input1.k9[0]"></td>
                                                <td><input v-model="text.input1.k9[1]"></td>
                                            </tr>
                                            <tr>
                                                <td>k<sub>12</sub></td>
                                                <td><input v-model="text.input1.k12[0]"></td>
                                                <td><input v-model="text.input1.k12[1]"></td>
                                            </tr>
                                            <tr>
                                                <td>S<sub>1</sub></td>
                                                <td><input v-model="text.input1.S1[0]"></td>
                                                <td><input v-model="text.input1.S1[1]"></td>
                                            </tr>
                                            <tr>
                                                <td>Z (mm<sup>3</sup>)</td>
                                                <td><input v-model="text.input1.Z[0]"></td>
                                                <td><input v-model="text.input1.Z[1]"></td>
                                            </tr>
                                            <tr>
                                                <td>&phi;</td>
                                                <td><input v-model="text.input1.phi[0]"></td>
                                                <td><input v-model="text.input1.phi[1]"></td>
                                            </tr>
                                            <tr>
                                                <td>&rho;<sub>b</sub></td>
                                                <td><input v-model="text.input1.rhob[0]"></td>
                                                <td><input v-model="text.input1.rhob[1]"></td>
                                            </tr>
                                            <tr>
                                                <td>&rho;<sub>c</sub></td>
                                                <td><input v-model="text.input1.rhoc[0]"></td>
                                                <td><input v-model="text.input1.rhoc[1]"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div id="p2" class="question">
                                <p class="bold">
                                    NOTE:
                                </p>
                                <ul>
                                    <li class="bold">To get the correct rounding, work with four decimal places only for the calculation. Present your answer to three decimal places.</li>
                                    <li class="bold">There is a table at bottom for you to record any coefficients (optional). If you do so, when your final answer is incorrect, partial mark might be given if you correctly answered most of the coefficients (details see <a href="#table2" style="color: blue; font-style: italic;">below</a>)</li>
                                </ul>
                                <div class="figure">
                                    <img src="resource/02.png"/>
                                </div>
                                <p>
                                    {{part2.element.depth}} &times; {{part2.element.width}} seasoned {{part2.density}} {{part2.grade}} diagonal elements that are {{part2.element.length}} m long are used in a truss supporting a roof in {{part2.location}}. The worst case element is subject to the below loads. The element is fixed to the surrounding truss elements with two {{part2.boltsize}} bolts in {{part2.holesize}} m diameter holes at each end. 
                                </p>
                                <ul>
                                  <li>Distributed Roof Load P<sup>*</sup> (duration &lt; 5 hours) = 1.2G + 1.5Q = {{part2.load}} kN</li>
                                </ul>

                                <p class="bold">
                                    1. Assess the tensile strength of the element (4 marks &times; 2)
                                </p>
                                <ol>
                                    <li>What is the tensile load on the element ? <input id="q10-1" size="8"/> kN</li>
                                    <li>What is the tensile capacity on the element ? <input id="q10-2" size="8"/> kN <button type="button" class="btn btn-danger btn-xs" v-on:click="check(10, $event);">Record Answers</button></li>
                                </ol>

                                <p class="bold">
                                    2. Assess the compression strength of the element (4 marks &times; 2)
                                </p>
                                <ol>
                                    <li>What is the compression load on the element ? <input id="q11-1" size="8"/> kN</li>
                                    <li>What is the compression capacity on the element ? <input id="q11-2" size="8"/> kN <button type="button" class="btn btn-danger btn-xs" v-on:click="check(11, $event);">Record Answers</button></li>
                                </ol>

                                <p class="bold">
                                    3. Is the element appropriate? (2 marks)
                                </p>
                                <form id="q12">
                                    <ul>
                                        <li><input type="radio" name="1-13" value="yes"/> Yes</li>
                                        <li><input type="radio" name="1-13" value="larger"/> No, need larger element</li>
                                        <li><input type="radio" name="1-13" value="smaller"/> No, need smaller element <button type="button" class="btn btn-danger btn-xs" v-on:click="check(12, $event);">Record Answers</button></li>
                                    </ul>
                                </form>

                                <div id="table2" style="border-style: ridge; padding: 10px;">
                                    <p class="h4 bold">Table for Coefficients of Calculation 2</p>
                                    <ul>
                                        <li>You can record any relevant coefficients in your calculation (optional)</li>
                                        <li>Leave the inputbox blank if the coefficient is irrelevant</li>
                                        <li>Partial mark will be given for your calculation if you have no more than:</li>
                                        <ul>
                                            <li>1 incorrect coefficient: 75%</li>
                                            <li>2 incorrect coefficients: 50%</li>
                                            <li>3 incorrect coefficients: 25%</li>
                                        </ul>
                                        <li>Multiple choices (including those in Calculation 1&2) have no partial mark</li>
                                    </ul>
                                    <table class="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>Coeffcients</th>
                                                <th>For Element</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>A<sub>c</sub> (mm<sup>2</sup>)</td>
                                                <td><input v-model="text.input2.Ac"></td>
                                            </tr>
                                            <tr>
                                                <td>A<sub>p</sub> (mm<sup>2</sup>)</td>
                                                <td><input v-model="text.input2.Ap"></td>
                                            </tr>
                                            <tr>
                                                <td>A<sub>s</sub> (mm<sup>2</sup>)</td>
                                                <td><input v-model="text.input2.As"></td>
                                            </tr>
                                            <tr>
                                                <td>A<sub>t</sub> (mm<sup>2</sup>)</td>
                                                <td><input v-model="text.input2.At"></td>
                                            </tr>
                                            <tr>
                                                <td>E<sub>mean (MPa)</sub></td>
                                                <td><input v-model="text.input2.Emean"></td>
                                            </tr>
                                            <tr>
                                                <td>E<sub>0.05 (MPa)</sub></td>
                                                <td><input v-model="text.input2.E005"></td>
                                            </tr>
                                            <tr>
                                                <td>f<sub>b</sub> (MPa)</td>
                                                <td><input v-model="text.input2.fb"></td>
                                            </tr>
                                            <tr>
                                                <td>f<sub>c</sub> (MPa)</td>
                                                <td><input v-model="text.input2.fc"></td>
                                            </tr>
                                            <tr>
                                                <td>f<sub>p</sub> (MPa)</td>
                                                <td><input v-model="text.input2.fp"></td>
                                            </tr>
                                            <tr>
                                                <td>f<sub>s</sub> (MPa)</td>
                                                <td><input v-model="text.input2.fs"></td>
                                            </tr>
                                            <tr>
                                                <td>f<sub>t</sub> (MPa)</td>
                                                <td><input v-model="text.input2.ft"></td>
                                            </tr>
                                            <tr>
                                                <td>I (mm<sup>4</sup>)</td>
                                                <td><input v-model="text.input2.I"></td>
                                            </tr>
                                            <tr>
                                                <td>j<sub>2,short</sub></td>
                                                <td><input v-model="text.input2.j2short"></td>
                                            </tr>
                                            <tr>
                                                <td>j<sub>2,long</sub></td>
                                                <td><input v-model="text.input2.j2long"></td>
                                            </tr>
                                            <tr>
                                                <td>j<sub>3</sub></td>
                                                <td><input v-model="text.input2.j3"></td>
                                            </tr>
                                            <tr>
                                                <td>k<sub>1</sub></td>
                                                <td><input v-model="text.input2.k1"></td>
                                            </tr>
                                            <tr>
                                                <td>k<sub>4</sub></td>
                                                <td><input v-model="text.input2.k4"></td>
                                            </tr>
                                            <tr>
                                                <td>k<sub>6</sub></td>
                                                <td><input v-model="text.input2.k6"></td>
                                            </tr>
                                            <tr>
                                                <td>k<sub>7</sub></td>
                                                <td><input v-model="text.input2.k7"></td>
                                            </tr>
                                            <tr>
                                                <td>k<sub>9</sub></td>
                                                <td><input v-model="text.input2.k9"></td>
                                            </tr>
                                            <tr>
                                                <td>k<sub>12</sub></td>
                                                <td><input v-model="text.input2.k12"></td>
                                            </tr>
                                            <tr>
                                                <td>S<sub>1</sub></td>
                                                <td><input v-model="text.input2.S1"></td>
                                            </tr>
                                            <tr>
                                                <td>Z (mm<sup>3</sup>)</td>
                                                <td><input v-model="text.input2.Z"></td>
                                            </tr>
                                            <tr>
                                                <td>&phi;</td>
                                                <td><input v-model="text.input2.phi"></td>
                                            </tr>
                                            <tr>
                                                <td>&rho;<sub>b</sub></td>
                                                <td><input v-model="text.input2.rhob"></td>
                                            </tr>
                                            <tr>
                                                <td>&rho;<sub>c</sub></td>
                                                <td><input v-model="text.input2.rhoc"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div id="p3">
                                <ul>
                                    <li>You can upload your work as JPG, PNG, TXT or PDF to help us understand your procedure of solving the question.</li>
                                    <li>You can upload multiple files if they are located in the same folder. Ctrl+select multiple files and upload.</li>
                                    <li>Note the files are actually uploaded while you click the 'finish and submit' button. Larger files will take longer for the system to response. (Suggested total size < 1 MB)</li>
                                    <li>You can submit your files after the time is up, so do not need to rush.</li>
                                    <li><span style="color: red; font-weight: bold;">Note: you should also keep your uploaded files for yourself.</span></li>
                                </ul>
                                <input type="file" id="myFile" multiple size="50" onchange="myFunction()">
                                <p id="fileinfo"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div id="dialog-message" title="Submission Comfirmation!" style="display: none;">
            <div>
                <p style="font-weight: bold;">
                    Warning: you only have ONE chance to submit. Questions and answers will not show after submission.
                    <br/><br/>
                    Are you sure to submit?
                </p>
            </div>
        </div>
    </body>
    <script src="script/vm.js?v=<?php echo rand(1, 10000); ?>"></script>
</html>