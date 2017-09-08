<?php
header('Expires: Sun, 01 Jan 2014 00:00:00 GMT');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('Cache-Control: post-check=0, pre-check=0', FALSE);
header('Pragma: no-cache');
?>

<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8"/>
        <meta name="description" content="Teaching and learning module"/>
        <meta name="keywords" content="line of balance"/>
        <meta name="author" content="Dr Xiaojun Chen"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <title>Line of balance</title>
        <link rel="shortcut icon" href="http://www.lindenbaum.net.au/unsw/util/favicon.ico" type="image/vnd.microsoft.icon"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
        <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.0/themes/smoothness/jquery-ui.css"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.0/jquery-ui.min.js"></script>
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
        <script src="https://use.fontawesome.com/582f5b6b01.js"></script>
        <link rel="stylesheet" type="text/css" href="css/main.css"/>
        <script type="text/javascript" src="script/prob.js"></script>
    </head>
    <body>
        <div class="text-center h1" style="padding-top: 20px; padding-bottom: 20px;"><strong>Line of Balance</strong></div>
        <div class="container">
            <div class="row">
                <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="accordion">
                        <h2>Question</h2>
                        <div id="q1">
                            <div class="h4">
                                <p>
                                    <strong>
                                        The Line of Balance technique will be applied to schedule the construction of 20 typical floors of a multistorey commercial project. The overall project duration is not specified. The building is a concrete frame, comprising column, walls and slabs. Construction of a typical floor involves 8 trade packages listed in the table.
                                    </strong>
                                </p>
                            </div>
                            <img id="question-img" src="resource/question.png"/>
                            <button onclick="toStart(event);" class="btn btn-primary">Press Here to Start</button>
                            <div id="answer">
                                <p style="border-top: solid black; margin-top: 20px; padding-top: 20px;">
                                    The Logic Diagram is redrawn below:<br/><br/>
                                    <strong>Step 1: Write down the duration in the logic diagram by clicking</strong> <button onclick="toText(event);" class="btn btn-primary">Show Duration</button>
                                </p>
                                <svg id="q1-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                     width="968" height="247" viewBox="0 0 968 247" style="margin-left: 20px;">
                                    <image xlink:href="./resource/fig01.jpg" x="0" y="0" width="968px" height="247px"/>
                                    <text id="fig-a" class="svg-text" x="49" y="165" fill="red" font-size="18">6</text>
                                    <text id="fig-b" class="svg-text" x="200" y="165" fill="red" font-size="18">6</text>
                                    <text id="fig-c" class="svg-text" x="315" y="80" fill="red" font-size="18">8</text>
                                    <text id="fig-d" class="svg-text" x="315" y="235" fill="red" font-size="18">5</text>
                                    <text id="fig-e" class="svg-text" x="450" y="165" fill="red" font-size="18">7</text>
                                    <text id="fig-f" class="svg-text" x="580" y="165" fill="red" font-size="18">5</text>
                                    <text id="fig-g" class="svg-text" x="730" y="165" fill="red" font-size="18">6</text>
                                    <text id="fig-h" class="svg-text" x="900" y="165" fill="red" font-size="18">8</text>
                                </svg>
                                <p style="margin-top: 30px;">
                                    <strong>Step 2: Please complete the following table (Please first read the instruction below the table. Press ENTER after each input)</strong>
                                </p>
                                <table class="table table-responsive table-bordered" style="margin-top: 20px;">
                                    <thead>
                                        <tr>
                                            <th style="min-width: 14em;">Activity</th>
                                            <th>Duration Per Cycle (Days)</th>
                                            <th>Total Duration (Days)</th>
                                            <th>Start of Package (Days)</th>
                                            <th>Finish of Package (Days)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="column">Structure</td>
                                            <td>6</td>
                                            <td><input class="column-3" onkeypress="check_input(event, 120, '.column-3', '.row-1');" type="text"/></td>
                                            <td><input class="row-1 column-4" onkeypress="check_input(event, 0, '.row-1', '.row-2');" type="text" disabled/></td>
                                            <td><input class="row-1 column-4" onkeypress="check_input(event, 120, '.row-1', '.row-2');" type="text" disabled/></td>
                                        </tr>
                                        <tr>
                                            <td>Strip Framework</td>
                                            <td>6</td>
                                            <td><input class="column-3" onkeypress="check_input(event, 120, '.column-3', '.row-1');" type="text"/></td>
                                            <td><input class="row-2 column-4" onkeypress="check_input(event, 6, '.row-2', '.row-3');" type="text" disabled/></td>
                                            <td><input class="row-2 column-4" onkeypress="check_input(event, 126, '.row-2', '.row-3');" type="text" disabled/></td>
                                        </tr>
                                        <tr>
                                            <td>Air-conditioning Ducks</td>
                                            <td>8</td>
                                            <td><input class="column-3" onkeypress="check_input(event, 160, '.column-3', '.row-1');" type="text"/></td>
                                            <td><input class="row-3 column-4" onkeypress="check_input(event, 12, '.row-3', '.row-4');" type="text" disabled/></td>
                                            <td><input class="row-3 column-4" onkeypress="check_input(event, 172, '.row-3', '.row-4');" type="text" disabled/></td>
                                        </tr>
                                        <tr>
                                            <td>Hydraulics</td>
                                            <td>5</td>
                                            <td><input class="column-3" onkeypress="check_input(event, 100, '.column-3', '.row-1');" type="text"/></td>
                                            <td><input class="row-4 column-4" onkeypress="check_input(event, 31, '.row-4', '.row-5');" type="text" disabled/></td>
                                            <td><input class="row-4 column-4" onkeypress="check_input(event, 131, '.row-4', '.row-5');" type="text" disabled/></td>
                                        </tr>
                                        <tr>
                                            <td>Internal Brickwork</td>
                                            <td>7</td>
                                            <td><input class="column-3" onkeypress="check_input(event, 140, '.column-3', '.row-1');" type="text"/></td>
                                            <td><input class="row-5 column-4" onkeypress="check_input(event, 39, '.row-5', '.row-6');" type="text" disabled/></td>
                                            <td><input class="row-5 column-4" onkeypress="check_input(event, 179, '.row-5', '.row-6');" type="text" disabled/></td>
                                        </tr>
                                        <tr>
                                            <td>Concrete Fa&ccedil;ade</td>
                                            <td>5</td>
                                            <td><input class="column-3" onkeypress="check_input(event, 100, '.column-3', '.row-1');" type="text"/></td>
                                            <td><input class="row-6 column-4" onkeypress="check_input(event, 84, '.row-6', '.row-7');" type="text" disabled/></td>
                                            <td><input class="row-6 column-4" onkeypress="check_input(event, 184, '.row-6', '.row-7');" type="text" disabled/></td>
                                        </tr>
                                        <tr>
                                            <td>Suspended Ceiling</td>
                                            <td>6</td>
                                            <td><input class="column-3" onkeypress="check_input(event, 120, '.column-3', '.row-1');" type="text"/></td>
                                            <td><input class="row-7 column-4" onkeypress="check_input(event, 89, '.row-7', '.row-8');" type="text" disabled/></td>
                                            <td><input class="row-7 column-4" onkeypress="check_input(event, 209, '.row-7', '.row-8');" type="text" disabled/></td>
                                        </tr>
                                        <tr>
                                            <td>Interior Finishes</td>
                                            <td>8</td>
                                            <td><input class="column-3" onkeypress="check_input(event, 160, '.column-3', '.row-1');" type="text"/></td>
                                            <td><input class="row-8 column-4" onkeypress="check_input(event, 95, '.row-8', '.row-9');" type="text" disabled/></td>
                                            <td><input class="row-8 column-4" onkeypress="check_input(event, 255, '.row-8', '.row-9');" type="text" disabled/></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div style="margin-top: 30px;" class="row-9 column-4">
                                    <span id="final" style="color: red;">Congratulation! You have completed this question!<br/><br/></span>
                                </div>
                                <p>
                                    Instructions:
                                </p>
                                <ol>
                                    <li>The column "Total Duration" needs to be completed first;</li>
                                    <li>Then the last two columns become available for input from top to bottom;</li>
                                    <li>Boxes available for input are shown in light gold color. After each input, please press ENTER to continue;</li>
                                    <li>If your answer is incorrect, the input box will turn red. Please modify your answer and press ENTER again;</li>
                                    <li>If you have four failed attempts for an input box, the correct answer will be shown.</li>
                                </ol>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
    <script type="text/javascript">
        var colorCode = "#FAFAD2";
        
        $(document).ready(function() {
            $(".accordion").accordion({
                collapsible: true,
                heightStyle: "content"
            });
            
            $("input").css("background", colorCode).attr("data-trial", "3");
            $(".column-4").hide();
        });
    </script>
</html>