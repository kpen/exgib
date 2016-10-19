<?php
$post07=$_POST;
$param1=$post07["prm1"];
$t27=fopen("../eee_tmp.txt","w"); // w - writing only
fwrite ($t27,$param1);
fclose ($t27);
//die($param1);
die("{\"param1\":\"111\",\"param2\":\"2222\",\"param3\":\"333\"}");

?>
