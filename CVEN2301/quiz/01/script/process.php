<?php 

$dir =  $_SERVER['DOCUMENT_ROOT'];
require($dir . "/unsw/db_config/db_header.php");

$table = "cven2301_quiz";
$column_data = "d1, t1";

$zid = (isset($_GET["id"])) ? $_GET["id"] : "";

$sql1 = "select {$column_data} from {$table} where zid='{$zid}'";

$conn = unsw_connect();

if ($conn->connect_error) {
    die("Error: " . $conn->connect_error);
} 

$result = $conn->query($sql1);

$conn->close();

?>

<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8"/>
        <meta name="description" content="Teaching and learning module"/>
        <meta name="keywords" content=""/>
        <meta name="author" content="Dr Xiaojun Chen"/>
        
        <title>Quiz 01 Result</title>
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
                        <p align="center"><strong>Quiz 1 Information</strong></p>
                    </div>
                    
                    <div id="main-body">
                        <ul>
                            <li><a href="#t00" class="bold">Question</a></li>
                            <li><a href="#t0" class="bold">Submission</a></li>
                            <li><a href="#t15" class="bold">Textbox</a></li>
                            <li><a href="#t1" class="bold" style="display: none;">Original Data</a></li>
                        </ul>
                        
                        <div id="t00"><ul id="q-list" style="font-weight: bold; font-family: monospace;"></ul></div>

                        <div id="t0">
                            <table id="table-sum" class="table table-hover">
                                <thead id="sum-head">
                                    <tr>
                                        <th></th>
                                        <th>Submitted</th>
                                        <th>Correct Answers</th>
                                    </tr>
                                </thead>
                                <tbody id="sum-body"></tbody>
                            </table>
                        </div>
                        
                        <div id="t15"><p id="textbox" style="word-wrap: break-word; font-weight: bold; padding-top: 20px;"></p></div>

                        <div id="t1">
                            <div id="original-body">
                                <?php
                                    if ($result->num_rows > 0) {
                                        while($row = $result->fetch_row()) {
                                            foreach ($row as $item) {
                                                echo "<p style='word-wrap: break-word;'>";
                                                echo $item;
                                                echo "</p>";
                                            }
                                        }
                                    } else {

                                    }
                                ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
    <script type="text/javascript">
        var summary;
        $(document).ready(function() {
            $("#main-body").tabs();
            process_sum();
            summary = $("#t0").html();
        });
        
        function process_sum() {
            var cell = $.parseJSON($("#original-body p").first().html());
            
            // first row in #sum-body
            var row1 = $("<tr></tr>").appendTo($("#sum-body"));
            $("<td>zid</td>").appendTo(row1);
            $("<td>" + cell.zid + "</td>").appendTo(row1);
            $("<td></td>").appendTo(row1);
            
            // second row in #sum-body
            var row2 = $("<tr></tr>").appendTo($("#sum-body"));
            $("<td>Score</td>").appendTo(row2);
            $("<td>" + cell.score + "</td>").appendTo(row2);
            $("<td></td>").appendTo(row2);
            
            // rows for part1
            for (key in cell.value.part1) {
                var row = $("<tr></tr>").appendTo($("#sum-body"));
                $("<td>" + key + "</td>").appendTo(row);
                $("<td>" + cell.answer.part1[key] + "</td>").appendTo(row);
                $("<td>" + cell.value.part1[key] + "</td>").appendTo(row);
            }
            
            // rows for part2
            for (key in cell.value.part2) {
                var row = $("<tr></tr>").appendTo($("#sum-body"));
                $("<td>" + key + "</td>").appendTo(row);
                $("<td>" + cell.answer.part2[key] + "</td>").appendTo(row);
                $("<td>" + cell.value.part2[key] + "</td>").appendTo(row);
            }
            
            // rows for part3
            for (key in cell.value.part3) {
                var row = $("<tr></tr>").appendTo($("#sum-body"));
                $("<td>" + key + "</td>").appendTo(row);
                $("<td>" + cell.answer.part3[key] + "</td>").appendTo(row);
                $("<td>" + cell.value.part3[key] + "</td>").appendTo(row);
            }
            
            for (key in cell.value.coordinates) {
                var item = $("<li></li>").appendTo($("#q-list"));
                item.html(key + ": (" + cell.value.coordinates[key][0] + ", " + cell.value.coordinates[key][1] + ")");
            }
            
            $("#textbox").html($("#original-body p").last().html().replace(/(?:\r\n|\r|\n)/g, '<br/>'));
        }
    </script>
</html>