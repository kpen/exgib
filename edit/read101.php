<?php
$post07=$_POST;
$param1=$post07["prm1"];


$filename = "../eee.txt";
$handle = fopen($filename, "r");
$contents = fread($handle, filesize($filename));
fclose($handle);
die("{\"param1\":\"".$contents."\"}");
//die("{\"param1\":\"111111\",\"param2\":\"2222\",\"param3\":\"333-25\"}");
?>
