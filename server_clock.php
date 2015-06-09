<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");

date_default_timezone_set('UTC');


$serverTimestamp = round(microtime(true)); // (new DateTime())->getTimestamp();

$resp = array(

	'day' => date('d', $serverTimestamp),
	'month' => date('m', $serverTimestamp),
	'year' => date('y', $serverTimestamp),

	'hour' => date('H', $serverTimestamp),
	'minute' => date('i', $serverTimestamp),
	'second' => date('s', $serverTimestamp) 

);


echo json_encode(array('dateTimeString'=>date('d/m/Y H:i:s')));