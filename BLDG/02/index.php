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
        
        <title>Critical Path</title>
        <link rel="shortcut icon" href="http://www.lindenbaum.net.au/unsw/util/favicon.ico" type="image/vnd.microsoft.icon"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.0/themes/smoothness/jquery-ui.css"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.0/jquery-ui.min.js"></script>
        <script src="https://use.fontawesome.com/582f5b6b01.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.10.2/d3.min.js"></script>
        <link rel="stylesheet" type="text/css" href="css/main.css"/>
        <script type="text/javascript" src="script/prob.js"></script>
        <script type="text/javascript" src="script/question.js"></script>
    </head>
    <body>
        <noscript style="font-weight: bold; color: red; margin: 20px; display: block;">You have disabled JavaScript in your browser. Please enable it.</noscript>
        <div id="dialog" title="Answer Dialog" style="display: none;">
            <div style="color: black; font-weight: bold;">
                <p>Instrustion:</p>
                <ul style="font-size: 14px; width: 500px;">
                    <li>The activity name and duration are shown in the middle</li>
                    <li>Fill in the input boxes which are in golden color</li>
                    <li>Press OK button after your answered</li>
                    <li>You can move this dialog by dragging its title bar</li>
                </ul>
            </div>
            <table>
                <tr>
                    <td></td>
                    <td><input id="est" class="early" size="6" type="text" placeholder=" early start"/></td>
                    <td><input id="eft" class="early"  size="6" type="text" placeholder=" early finish"/></td>
                    <td></td>
                </tr>
                <tr>
                    <td><input id="ff" class="final"  size="6" type="text" placeholder=" free float" disabled/></td>
                    <td class="bordered" colspan="2" style="text-align: center; background"><span id="lbl" style="font-weight: bold; color: black;"></span></td>
                    <td><input id="tf" class="final"  size="6" type="text" placeholder=" total float" disabled/></td>
                </tr>
                <tr>
                    <td></td>
                    <td><input id="lst" class="late"  size="6" type="text" placeholder=" late start" disabled/></td>
                    <td><input id="lft" class="late"  size="6" type="text" placeholder=" late finish" disabled/></td>
                    <td></td>
                </tr>
            </table>
            <p id="feedback" style="color: red;">&nbsp;</p>
        </div>
        <div id="warning" title="Sorry" style="display: none;">
            <p>Currently not available</p>
        </div>
        <div class="text-center h1" style="padding-top: 20px; padding-bottom: 20px;"><strong>Critical Path</strong></div>
        <div class="container">
            <div class="row">
                <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="accordion">
                        <h2>Question</h2>
                        <div id="q1">
                            <div class="h4">
                                <p style="color: red;">
                                    <strong>
                                        Note: please use Chrome, Safari, Firefox or Edge for this page. IE is not supported and you may be unable to proceed in some steps.<br/><br/>
                                    </strong>
                                </p>
                                <p>
                                    <strong>
                                        Press "START" button and follow the instructions to finish the question. The number after each activity is its duration.
                                    </strong>
                                </p>
                                <button onclick="toStart(event);" class="btn btn-primary">&nbsp;&nbsp;START&nbsp;&nbsp;</button>
                            </div>
                            <div id="answer" style=""></div>
                            <div id="svg-container">
                                <svg id="svg-main" xmlns="http://www.w3.org/2000/svg" 
                                     xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 50 800 600">
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <canvas id="mycanvas" style="display: none; position: fixed; left: 0; top: 0;"></canvas>
    </body>
    <script type="text/javascript" src="script/explode.js"></script>
</html>