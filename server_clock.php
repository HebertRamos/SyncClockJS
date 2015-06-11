<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");

//date_default_timezone_set('America/Argentina/Buenos_Aires');

$auction_settings_room = array(
	'start_date_time'=>'2015-06-11T10:50:00-0400',
	'duration_in_minuts'=>30
);


$client_settings_time = array(
	'timezone'=>$_GET['time_zone'],
);


function parsetDateTimeToOtherTimeZone($datetime_iso, $time_zone){

	$date_time_current_time_zone = new DateTime($datetime_iso);

	$time_zone_set = new DateTimeZone($time_zone);
	$date_time_current_time_zone->setTimeZone($time_zone_set);
	
	return $date_time_current_time_zone;
}

$current_date_time_server = new DateTime("NOW");
$current_date_time_to_client = parsetDateTimeToOtherTimeZone($current_date_time_server->format(DateTime::ISO8601), $client_settings_time['timezone']);


$start_date_time_to_client = parsetDateTimeToOtherTimeZone($auction_settings_room['start_date_time'], $client_settings_time['timezone']);



$resp = array(
	'current_date_time_to_client'=>$current_date_time_to_client->format(DateTime::ISO8601),
	
	'start_date_time_iso_client'=>$start_date_time_to_client->format(DateTime::ISO8601), 
	'duration'=>$auction_settings_room['duration_in_minuts']
);

echo json_encode($resp);


