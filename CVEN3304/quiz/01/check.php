<?php

header('Expires: Sun, 01 Jan 2014 00:00:00 GMT');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('Cache-Control: post-check=0, pre-check=0', FALSE);
header('Pragma: no-cache');

$dir =  $_SERVER['DOCUMENT_ROOT'];
require($dir .  "/unsw/db_config/db_header.php");

$conn = unsw_connect();

if ($conn->connect_error) {
    die("Error: " . $conn->connect_error);
}

$sql1 = "select quiz1 from cven3304";

$result = $conn->query($sql1);
$conn->close();

?>

<!doctype html>
<html>
    <head>
        <meta charset="utf-8"/>
        <meta name="description" content="Teaching and learning module"/>
        <meta name="keywords" content=""/>
        <meta name="author" content="Dr Xiaojun Chen"/>
        
        <title>Quiz 01 Grade</title>
        <link rel="shortcut icon" href="http://www.lindenbaum.net.au/unsw/util/favicon.ico" type="image/vnd.microsoft.icon"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.0/themes/smoothness/jquery-ui.css"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.0/jquery-ui.min.js"></script>
        <script src="https://use.fontawesome.com/582f5b6b01.js"></script>
        <script src="https://unpkg.com/vue"></script>
        <script src="https://jununsw.github.io/res/util.js"></script>
    </head>
    <body onload="check();">
        <div class='container'>
            <div class='row'>
                <table id="myTable" class="table table-hover table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>zID</th>
                            <th>Mark</th>
                            <th class='data'>Data</th>
                        </tr>
                    </thead>
                    <tbody>
    <?php
                    if ($result->num_rows > 0) {
                        while($row = $result->fetch_row()) {
                            echo "<tr>";
                            echo "<td class='zid'></td><td class='mark'></td>";
                            foreach ($row as $item) {
                                echo "<td class='data'>";
                                echo $item;
                                echo "</td>";
                            }
                            echo "</tr>";
                        }
                    } else {

                    }
    ?>
                    </tbody>
                </table>
            </div>
        </div>
    </body>
    <script>
        var p1idx = 27;
        var p2 = [
            ['yes', 'yes', 'no', 'no', 'yes'],
            ['yes', 'no', 'yes', 'no', 'no'],
            ['no', 'yes', 'no', 'no', 'yes']
        ];

        var p3 = [
            ['no', 'no', 'yes', 'no', 'yes'],
            ['yes', 'yes', 'no', 'yes', 'yes']
        ];
        
        function check() {
            var $rows = $("#myTable tbody tr");
            for (let idx = 0; idx < $rows.length; idx++) {
                let $td = $rows.eq(idx).find(".data");
                let record = JSON.parse($td.html());
                
                $rows.eq(idx).find(".zid").html(record.id);
                
                let mark = 0
                // mark
                // q1
                let q1 = record.q1;
                for (let jdx = 0; jdx < 5; jdx++) {
                    if (q1[jdx][0] == p1idx) {
                        mark += 2;
                    } else if (q1[jdx][1] == q1[jdx][2]) {
                        mark += 2;
                    } else {
                        mark += 0;
                    }
                }
                
                //q2
                let q2 = record.q2;
                let q2idx = q2[0] - 1;
                let correct2 = p2[q2idx];
                let q2mark = 5;
                for (let jdx = 0; jdx < 5; jdx++) {
                    if (q2[1][jdx] !== correct2[jdx]) {
                        q2mark = 0
                    } else {
                        
                    }
                }
                mark += q2mark;
                
                //q3
                let q3 = record.q3;
                let q3idx = q3[0] - 1;
                let correct3 = p3[q3idx];
                let q3mark = 5;
                for (let jdx = 0; jdx < 5; jdx++) {
                    if (q3[1][jdx] !== correct3[jdx]) {
                        q3mark = 0
                    } else {
                        
                    }
                }
                mark += q3mark;
                
                //q4
                if (Number(record.q4[1]) == Number(record.q4[2])) {
                    mark += 5;
                }
                
                //q5
                let diff = Math.abs(Number(record.q5[1]) - Number(record.q5[2]));
                if (diff <= 10) {
                    mark += 5;
                }
                
                //q6
                if (Number(record.q6[1][0]) == Number(record.q6[2][0])) {
                    mark += 3;
                }
                
                if (Number(record.q6[1][1]) == Number(record.q6[2][1])) {
                    mark += 2;
                }
                
                // show mark
                $rows.eq(idx).find(".mark").html(mark.toString());
                $(".data").hide();
            }
        }
    </script>
</html>