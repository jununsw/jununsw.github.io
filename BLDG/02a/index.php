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
        <link rel="stylesheet" type="text/css" href="css/main.css"/>
        <script type="text/javascript" src="script/prob.js"></script>
    </head>
    <body>
        <div id="dialog" title="Activity Input" style="display: none;">
            <table>
                <tr>
                    <td></td>
                    <td><input id="est" class="early" size="8" type="text" placeholder="early start"/></td>
                    <td><input id="eft" class="early"  size="8" type="text" placeholder="early finish"/></td>
                    <td></td>
                </tr>
                <tr>
                    <td><input id="tst" class="final"  size="4" type="text" placeholder="" disabled/></td>
                    <td class="bordered" colspan="2" style="text-align: center;"><span id="lbl" style="font-weight: bold;"></span></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td><input id="lst" class="late"  size="8" type="text" placeholder="late start" disabled/></td>
                    <td><input id="lft" class="late"  size="8" type="text" placeholder="late finish" disabled/></td>
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
                                <p>
                                    <strong>
                                        Determine the project critical path. Perform a forward pass and a backward pass through the network. The forward pass will identify the early start and finish times. The backward pass will identify the late start and finish times. These processes are required to be able to calculate the float on each activity.
                                    </strong>
                                </p>
                            </div>
                            <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" style="margin: auto;">
                                <defs>
                                    <marker id="se_marker_end_svg_11" markerUnits="strokeWidth" orient="auto" viewBox="0 0 100 100" markerWidth="5" markerHeight="5" refX="50" refY="50">
                                       <path id="svg_1" d="m100,50l-100,40l30,-40l-30,-40l100,40z" fill="#0000ff" stroke="#0000ff" stroke-width="10"/>
                                    </marker>
                                    <marker id="se_marker_end_svg_12" markerUnits="strokeWidth" orient="auto" viewBox="0 0 100 100" markerWidth="5" markerHeight="5" refX="50" refY="50">
                                       <path id="svg_2" d="m100,50l-100,40l30,-40l-30,-40l100,40z" fill="#0000ff" stroke="#0000ff" stroke-width="10"/>
                                    </marker>
                                    <marker id="se_marker_end_svg_13" markerUnits="strokeWidth" orient="auto" viewBox="0 0 100 100" markerWidth="5" markerHeight="5" refX="50" refY="50">
                                       <path id="svg_3" d="m100,50l-100,40l30,-40l-30,-40l100,40z" fill="#0000ff" stroke="#0000ff" stroke-width="10"/>
                                    </marker>
                                    <marker id="se_marker_end_svg_14" markerUnits="strokeWidth" orient="auto" viewBox="0 0 100 100" markerWidth="5" markerHeight="5" refX="50" refY="50">
                                       <path id="svg_4" d="m100,50l-100,40l30,-40l-30,-40l100,40z" fill="#0000ff" stroke="#0000ff" stroke-width="10"/>
                                    </marker>
                                    <marker id="se_marker_end_svg_15" markerUnits="strokeWidth" orient="auto" viewBox="0 0 100 100" markerWidth="5" markerHeight="5" refX="50" refY="50">
                                       <path id="svg_5" d="m100,50l-100,40l30,-40l-30,-40l100,40z" fill="#0000ff" stroke="#0000ff" stroke-width="10"/>
                                    </marker>
                                </defs>
                                <g>
                                    <rect id="ba" height="50" width="106" y="102" x="47" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="5" fill="white" stroke="#000000"/>
                                    <rect id="bb" height="50" width="106" y="244" x="45" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="5" stroke="#000000" fill="white"/>
                                    <rect id="bc" height="50" width="106" y="415" x="44" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="5" stroke="#000000" fill="white"/>
                                    <rect id="bf" height="50" width="106" y="329" x="228" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="5" stroke="#000000" fill="white"/>
                                    <rect id="bd" height="50" width="106" y="95" x="391" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="5" stroke="#000000" fill="white"/>
                                    <rect id="be" height="50" width="106" y="237" x="405" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="5" stroke="#000000" fill="white"/>
                                    <rect id="bg" height="50" width="106" y="418" x="406" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="5" stroke="#000000" fill="white"/>
                                    <rect id="bh" height="50" width="106" y="242" x="659" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="5" stroke="#000000" fill="white"/>
                                    <rect id="bj" height="50" width="106" y="372" x="662" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="5" stroke="#000000" fill="white"/>
                                    <text xml:space="preserve" class="label" text-anchor="middle" font-family="Sans-serif" font-size="24" id="ta" y="135" x="97" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="0" stroke="#000000" fill="#000000">A, 7</text>
                                    <text id="tb" class="label" xml:space="preserve" text-anchor="middle" font-family="Sans-serif" font-size="24" y="277.5" x="98.51563" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="0" stroke="#000000" fill="#000000">B, 8</text>
                                    <text id="tc" class="label" xml:space="preserve" text-anchor="middle" font-family="Sans-serif" font-size="24" y="447.5" x="96.01563" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="0" stroke="#000000" fill="#000000">C, 6</text>
                                    <text id="td" class="label" xml:space="preserve" text-anchor="middle" font-family="Sans-serif" font-size="24" y="125.5" x="444.00781" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="0" stroke="#000000" fill="#000000">D, 6</text>
                                    <text id="te" class="label" xml:space="preserve" text-anchor="middle" font-family="Sans-serif" font-size="24" y="268.5" x="460.00781" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="0" stroke="#000000" fill="#000000">E, 6</text>
                                    <text id="tf" class="label" xml:space="preserve" text-anchor="middle" font-family="Sans-serif" font-size="24" y="366.5" x="270.00781" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="0" stroke="#000000" fill="#000000">F, 8</text>
                                    <text id="tg" class="label" xml:space="preserve" text-anchor="middle" font-family="Sans-serif" font-size="24" y="457.5" x="472.01563" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="0" stroke="#000000" fill="#000000">G, 4</text>
                                    <text id="th" class="label" xml:space="preserve" text-anchor="middle" font-family="Sans-serif" font-size="24" y="275.5" x="717.01563" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="0" stroke="#000000" fill="#000000">H, 7</text>
                                    <text id="tj" class="label" xml:space="preserve" text-anchor="middle" font-family="Sans-serif" font-size="24" y="403.5" x="715.00781" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="0" stroke="#000000" fill="#000000">J, 3</text>
                                    <text fill="#ff0000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="59" y="97" id="a1" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve" stroke="#000000">0</text>
                                    <text fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="144.01563" y="95.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve" id="a2">0</text>
                                    <text fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="59.01563" y="174.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve" id="a3">0</text>
                                    <text fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="146.01563" y="174.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve" id="a4">0</text>
                                    <text fill="#ff0000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="34.01563" y="133.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve" stroke="#000000" id="a5">0</text>
                                    <text id="b1" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="64.01563" y="239.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="b2" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="144.01563" y="238.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="b3" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="62.01563" y="317.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="b4" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="143.01563" y="316.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="b5" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="34.01563" y="274.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="c1" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="57.01563" y="407.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="c2" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="136.01563" y="406.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="c3" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="53.01563" y="487.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="c4" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="135.01563" y="487.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="c5" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="29.01563" y="445.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="f1" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="249.01563" y="319.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="f2" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="314.01563" y="320.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="f3" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="245.01563" y="400.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="f4" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="311.01563" y="400.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="f5" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="212.01563" y="360.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="d1" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="405.01563" y="89.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="d2" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="484.01563" y="88.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="d3" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="407.01563" y="165.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="d4" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="484.01563" y="166.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="d5" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="374.01563" y="123.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="e1" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="419.01563" y="229.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="e2" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="496.01563" y="229.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="e3" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="417.01563" y="308.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="e4" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="496.01563" y="308.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="e5" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="391.01563" y="264.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="g1" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="421.01563" y="410.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="g2" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="501.01563" y="413.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="g3" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="423.01563" y="488.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="g4" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="500.01563" y="490.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="g5" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="389.01563" y="445.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="h1" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="678.01563" y="234.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="h2" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="759.01563" y="234.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="h3" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="677.01563" y="313.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="h4" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="756.01563" y="313.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="j1" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="680.01563" y="364.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="j2" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="752.01563" y="365.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="j3" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="681.01563" y="445.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="j4" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="751.01563" y="446.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="j5" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="648.01563" y="401.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <text id="h5" fill="#ff0000" stroke="#000000" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="643.01563" y="275.5" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve">0</text>
                                    <line fill="none" stroke-width="5" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="154" y1="138" x2="377" y2="138" id="svg_11" marker-end="url(#se_marker_end_svg_11)" stroke="#0000ff"/>
                                    <line fill="none" stroke-width="5" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="153.50001" y1="277" x2="390.5" y2="277" marker-end="url(#se_marker_end_svg_12)" id="svg_12" stroke="#0000ff"/>
                                    <line fill="none" stroke-width="5" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="149.53344" y1="311.91377" x2="223.34464" y2="311.91377" marker-end="url(#se_marker_end_svg_13)" id="svg_13" transform="rotate(28.178590774536133 186.4390411376955,311.9137878417968) " stroke="#0000ff"/>
                                    <line fill="none" stroke-width="5" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="153.50001" y1="455" x2="390.5" y2="455" marker-end="url(#se_marker_end_svg_14)" stroke="#0000ff" id="svg_14"/>
                                    <line fill="none" stroke-width="5" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="326.95579" y1="322.92186" x2="403.24463" y2="322.92186" marker-end="url(#se_marker_end_svg_15)" id="svg_15" transform="rotate(-42.10496139526367 365.10021972656256,322.921875) " stroke="#0000ff"/>
                                    <line stroke="#0000ff" transform="rotate(-10.994563102722168 581.1853027343756,427.0422668457036) " id="svg_6" marker-end="url(#se_marker_end_svg_12)" y2="427.04229" x2="649.24212" y1="427.04229" x1="513.12843" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="5" fill="none"/>
                                    <line stroke="#0000ff" transform="rotate(36.11933898925781 573.4769287109375,183.40205383300784) " id="svg_7" marker-end="url(#se_marker_end_svg_12)" y2="183.40208" x2="665.7926" y1="183.40208" x1="481.16119" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="5" fill="none"/>
                                    <line stroke="#0000ff" transform="rotate(5.90614128112793 577.5941162109377,279.9235229492185) " id="svg_8" marker-end="url(#se_marker_end_svg_12)" y2="279.92353" x2="644.55553" y1="279.92353" x1="510.63271" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="5" fill="none"/>
                                    <line stroke="#0000ff" transform="rotate(2.12109637260437 492.79040527343494,370.6589050292969) " id="svg_9" marker-end="url(#se_marker_end_svg_12)" y2="370.6589" x2="647.52483" y1="370.6589" x1="338.05601" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="5" fill="none"/>
                                    <line stroke="#0000ff" transform="rotate(91.3412094116211 714.2638549804688,325.4676818847657) " id="svg_10" marker-end="url(#se_marker_end_svg_12)" y2="325.46768" x2="744.28718" y1="325.46768" x1="684.24055" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="5" fill="none"/>
                                </g>
                            </svg><br/>
                            <button onclick="toStart(event);" class="btn btn-primary">Press Here to Start</button>
                            <div id="answer"></div>
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
            
            $("svg text").attr("opacity", "0");
            $(".label").attr("opacity", "1");
        });
    </script>
</html>