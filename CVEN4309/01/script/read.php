<?php 

$dir =  $_SERVER['DOCUMENT_ROOT'];
require($dir . "/unsw/db_config/db_header.php");

if ((!isset($_GET["id"]))) {
    die("no parameter");
}

$zid = $_GET["id"];
$table = "cven4309_quiz";
$column = "d1";

$sql1 = "select {$column} from {$table} where zid='{$zid}'";

$conn = unsw_connect();

if ($conn->connect_error) {
    die("Error: " . $conn->connect_error);
} 

$result = $conn->query($sql1);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_row()) {
        foreach ($row as $item) {
            $data = $item;
        }
    }
} else {
    die("cannot fetch your record!");
}

// fetch additional info
$column2 = "t1";
$sql2 = "select {$column2} from {$table} where zid='{$zid}'";


$result2 = $conn->query($sql2);

if ($result2->num_rows > 0) {
    while ($row2 = $result2->fetch_row()) {
        foreach ($row2 as $item2) {
            $text = $item2;
        }
    }
} else {
    die("cannot fetch your record!");
}

$obj = json_decode($data);
$additional = json_decode($text);
$output = array();

// define function to proceed json
function parseObj($obj) {
    // student id
    if (isset($obj->{'zid'})) {
        $table = array(array('zid', $obj->{'zid'}, ''));
    } else {
        return array(array('zid', 'no record', ''));
    }

    // mark
    if (isset($obj->{'score'})) {
        array_push($table, array('score', strval($obj->{'score'}) . ' / 90', ''));
    } else {
        array_push($table, array('score', 'no score', ''));
        return $table;
    }

    // multiple choice
    if (isset($obj->{'q0'})) {
        $choice = "";
        $correct = "";
        for ($idx = 0; $idx < count($obj->{'q0'}[1]); $idx++) {
            if ($obj->{'q0'}[1][$idx] == '0') {
                $selection = 'A';
            } elseif ($obj->{'q0'}[1][$idx] == '1') {
                $selection = 'B';
            } elseif ($obj->{'q0'}[1][$idx] == '2') {
                $selection = 'C';
            } elseif ($obj->{'q0'}[1][$idx] == '3') {
                $selection = 'D';
            } else {
                $selection = 'N/A';
            }
            $choice = $choice . " " . $selection;

            if ($obj->{'q0'}[2][$idx] == '0') {
                $ans = 'A';
            } elseif ($obj->{'q0'}[2][$idx] == '1') {
                $ans = 'B';
            } elseif ($obj->{'q0'}[2][$idx] == '2') {
                $ans = 'C';
            } elseif ($obj->{'q0'}[2][$idx] == '3') {
                $ans = 'D';
            } else {
                $ans = 'N/A';
            }
            $correct = $correct . " " . $ans;
        }
        array_push($table, array('multiple choice', $choice, $correct));
    } else {
        return $table;
    }

    // questions
    $qidx = 1;    // index for #question
    $aidx = 1;    // index in $obj->answers (flat and linear)

    while (true) {
        $tag = 'q' . strval($qidx);  // question tag: q1, q2, ...
        if (isset($obj->$tag)) {
            for ($idx = 0; $idx < count($obj->$tag->{'answer'}); $idx++) {  // loop over its answer attribute (array), $idx: index in this paticular question
                $qst = $obj->$tag;
                $rcd = $qst->{'answer'}[$idx];

                $type = gettype($rcd);

                if ($type == 'array') {
                    // if has two+ parts
                    for ($i = 0; $i < count($rcd); $i++) {  // $i: index for (1), (2), ...
                        $q_tag = strval($qidx) . '.' . strval($idx + 1) . '(' . strval($i + 1) . ')';
                        $a_tag = strval($aidx);
                        $answer_cell = $obj->{'answer'}->$a_tag;
                        $answer = strval($answer_cell[$i]);
                        $correct = strval($rcd[$i]);
                        array_push($table, array($q_tag, $answer, $correct));
                    }
                } elseif ($type == 'string') {
                    // if only one part as string
                    $q_tag = strval($qidx) . '.' . strval($idx + 1);
                    $a_tag = strval($aidx);
                    $answer_cell = $obj->{'answer'}->$a_tag;
                    $answer = strval($answer_cell);
                    $correct = strval($rcd);
                    array_push($table, array($q_tag, $answer, $correct));
                } else {
                    // if only one part as number
                    $q_tag = strval($qidx) . '.' . strval($idx + 1);
                    $a_tag = strval($aidx);
                    $answer_cell = $obj->{'answer'}->$a_tag;
                    $answer = strval($answer_cell);
                    $correct = strval($rcd);
                    array_push($table, array($q_tag, $answer, $correct));
                }

                // increase the index in the answer
                $aidx++;
            }

            $qidx++;
        } else {
            break;
        }
    }

    // finally return table
    return $table;
}

// define function to proceed question set
function parseQuestion($obj) {
    $record = array();

    $qidx = 1;
    while (true) {
        $tag = 'q' . strval($qidx);  // question tag: q1, q2, ...

        if (isset($obj->$tag)) {
            array_push($record, array('<strong style="color: red;">Question ' . strval($qidx) . '</strong>', ''));  // question #

            foreach ($obj->$tag as $key => $value) {
                if ($key != 'answer') {
                    $type = gettype($value);

                    if ($type == 'object') {
                        foreach ($value as $k => $v) {
                            array_push($record, array(strval($key) . '/' . strval($k), strval($v)));
                        }
                    } else {
                        array_push($record, array(strval($key), strval($value)));
                    }
                }
            }

            $qidx++;
        } else {
            break;
        }
    }

    return $record;
}

function parseCoefficients($additional) {
    $coeffiencts = array();

    return $coeffiencts;
}

$table = parseObj($obj);
$coeffiencts = parseCoefficients($additional);
$record = parseQuestion($obj);

?>

<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8"/>
        <meta name="description" content="Teaching and learning module"/>
        <meta name="keywords" content=""/>
        <meta name="author" content="Dr Xiaojun Chen"/>
        
        <title>Quiz Result</title>
        <link rel="shortcut icon" href="http://www.lindenbaum.net.au/unsw/util/favicon.ico" type="image/vnd.microsoft.icon"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.0/themes/smoothness/jquery-ui.css"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.0/jquery-ui.min.js"></script>
    </head>
    <style>
        .caption {
            text-align: center;
            font-weight: bold;
        }

        #main-body {
            background: none; 
            border-width: 0px; 
        }

        #main-body .ui-tabs-nav { 
            padding-left: 0px; 
            background: transparent; 
            border-width: 0px 0px 1px 0px; 
            -moz-border-radius: 0px; 
            -webkit-border-radius: 0px; 
            border-radius: 0px; 
        }

        #main-body .ui-tabs-panel { 
            background: white; 
            border-width: 0px 0px 0px 0px; 
        }
    </style>
    <body>
        <div class="container">
            <div class="row">
                <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="h1" style="margin: 20px;">
                        <p align="center"><strong>Quiz 01 Information</strong></p>
                    </div>

                    <div style="font-weight: bold;">
                        <p>If you didn't see your marks here, it could either because</p>
                        <ul>
                            <li>your mark is directly stored in Moodle Gradebook, or</li>
                            <li>you have your mark modified by your course coordinator, so the modified mark will directly goes to Moodle Gradebook</li>
                        </ul>
                        <p>Except for the multiple choices, if your answer is incorrect, it will be in red color</p>
                    </div>
                    
                    <div id="main-body">
                        <ul>
                            <li><a href="#t0" class="bold">Your Submission</a></li>
                            <li><a href="#t1" class="bold">Addtional Coefficicents</a></li>
                            <li><a href="#t2" class="bold">Your Question Set</a></li>
                        </ul>

                        <div id="t0">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Submitted</th>
                                        <th>Correct Answers</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php
                                        foreach ($table as $item) {
                                            echo '<tr>';
                                            foreach ($item as $cell) {
                                                echo '<td>';
                                                echo $cell;
                                                echo '</td>';
                                            }
                                            echo '</tr>';
                                        }
                                    ?>
                                </tbody>
                            </table>
                        </div>

                        <div id="t1">
                            <table class="table table-hover">
                            </table>
                        </div>

                        <div id="t2">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php
                                        foreach ($record as $item) {
                                            echo '<tr>';
                                            foreach ($item as $cell) {
                                                echo '<td>';
                                                echo $cell;
                                                echo '</td>';
                                            }
                                            echo '</tr>';
                                        }
                                    ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
    <script type="text/javascript">
        $(document).ready(function() {
            $("#main-body").tabs();
            toMark();
        });

        function toMark() {
            var $row = $('#t0 tbody tr');
            for (var idx = 3; idx < $row.length; idx++) {
                var $record = $row.eq(idx);
                var $records = $record.find('td');
                var input = $records.eq(1).html();
                var correct = $records.eq(2).html();

                if (input == correct) {
                    
                } else if (Math.abs(Number(input) - Number(correct)) < 0.2) {
                    $records.eq(1).css("color", "red");
                } else {
                    $records.eq(1).css("color", "red");
                }
            }
        }
    </script>
</html>