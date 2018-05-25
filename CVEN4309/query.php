<?php
$dir =  $_SERVER['DOCUMENT_ROOT'];
require($dir . "/unsw/db_config/db_header.php");

if ((!isset($_POST["week"])) || (!isset($_POST["zid"])) || (!isset($_POST["mark"])) || (!isset($_POST["data"]))) {
    echo "0";
} else {

	if ($_POST["zid"][0] !== "z") {
		die("Invalid zid!");
	}

    $table = "cven4309_quiz";
    $week = $_POST["week"];  // be either w1, w2, w3
    $zid = $_POST["zid"];
    $mark = $_POST["mark"];
    $data = $_POST["data"];  // data conent
    $dataName = "d" . $week[1];    // column name: d1, d2, d3

    $textName = "t" . $week[1];
    $text = isset($_POST["text"]) ? $_POST["text"] : "";
    
    $sql1 = "insert into {$table} (zid, {$week}, {$dataName}, {$textName}) values ('{$zid}', {$mark}, '{$data}', '{$text}') on duplicate key update {$week} = {$mark}, {$dataName} = '{$data}', {$textName} = '{$text}'";

    $conn = unsw_connect();

    if ($conn->connect_error) {
        die("Error: " . $conn->connect_error);
    }  

    $result1 = $conn->query($sql1);

    $sql2 = "select {$dataName} from {$table} where zid='{$zid}'";

    $result2 = $conn->query($sql2);

    $conn->close();

    if (($result2 == FALSE) || ($result2->num_rows == 0)) {
        echo "0";
    } else {
        $row = $result2->fetch_row();
        if ($row[0] <> "") {
            echo "1";
        } else {
            echo "0";
        }
    }
}
?>