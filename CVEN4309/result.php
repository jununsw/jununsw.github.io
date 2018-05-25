<?php
$dir =  $_SERVER['DOCUMENT_ROOT'];
require($dir .  "/unsw/db_config/db_header.php");


$conn = unsw_connect();

if ($conn->connect_error) {
    die("Error: " . $conn->connect_error);
}

$sql1 = "select zid, w1, w2, w3 from cven4309_2017s2";

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
        
        <title>Quiz Result</title>
        <link rel="shortcut icon" href="http://www.lindenbaum.net.au/unsw/util/favicon.ico" type="image/vnd.microsoft.icon"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    </head>
    <body>
        <div style="width: 80%; margin: 30px auto 0 auto;">
            <table id="myTable" class="table table-hover table-bordered table-striped">
                <thead>
                    <tr>
                        <th>zID</th>
                        <th>Quiz 01</th>
                        <th>Quiz 02</th>
                        <th>Quiz 03</th>
                    </tr>
                </thead>
                <tbody>
<?php
                if ($result->num_rows > 0) {
                    while($row = $result->fetch_row()) {
                        echo "<tr>";
                        foreach ($row as $item) {
                            echo "<td>";
                            echo $item;
                            echo " </td>";
                        }
                        echo " </tr>";
                    }
                } else {

                }
?>
                </tbody>
            </table>
        </div>
    </body>
    <script>
        function table2json(tableID) {
            var array = [];
            var headers = [];
            var tableTh = "#" + tableID + " th";
            var tableTr = "#" + tableID + " tr";
            $(tableTh).each(function(index, item) {
                headers[index] = $(item).html();
            });

            $(tableTr).has('td').each(function() {
                var arrayItem = {};
                $('td', $(this)).each(function(index, item) {
                    arrayItem[headers[index]] = $(item).html();
                });
                array.push(arrayItem);
            });

            return array;
        }
    </script>
</html>