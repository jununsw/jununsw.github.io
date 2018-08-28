<?php
$dir =  $_SERVER['DOCUMENT_ROOT'];
require($dir . "/unsw/db_config/db_header.php");
$conn = unsw_connect();

if (isset($_POST['zid']) && isset($_POST['d1'])) {
    $zid = $_POST['zid'];
    $d1 = $_POST['d1'];
    
    $sql1 = "insert into cven3304 (zid, quiz1) values ('{$zid}', '{$d1}') on duplicate key update quiz1 = '{$d1}'";
    
    $result1 = $conn->query($sql1);

    if ($result1) {
        echo "1";
    } else {
        try {
            $myfile = fopen("record.txt", "a+");
            $myrecord = $_POST['data'] . "\n\n"; 
            fwrite($myfile, $myrecord);
            fclose($myfile);

            echo "1";
        } catch (Exception $e) {
            echo ("DB error, " . $sql1);
        }
    }
} else {
    echo "data lost";
}

$conn->close();

?>