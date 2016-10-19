<?php
$post07=$_POST;
$param1=$post07["prm1"];
$t26=file("target.txt");
$fileName ="../eee.txt"; //"drawings/".$t26[0];

//if (!file_exists($fileName)) {
//    $fileName="drawings/default.txt";
//}

$handle = fopen($fileName, "r");
$contents = fread($handle, filesize($fileName));
fclose($handle);
die("{\"param1\":\"".$contents."\"}");
//die("{\"param1\":\"111111\",\"param2\":\"2222\",\"param3\":\"333-25\"}");
?>
