<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");


$auction_settings_room = array(
	'start_date_time'=>'2015-06-10T15:00:00-0600',
	'duration_in_minuts'=>60
);


$client_settings_time = array(
	'timezone'=>$_GET['time_zone'],
	'current_time'=>$_GET['current_time']

);


function parsetDateTimeToOtherTimeZone($datetime_iso, $time_zone){

	$date_time_current_time_zone = new DateTime($datetime_iso);

	$time_zone_set = new DateTimeZone($time_zone);
	$date_time_current_time_zone->setTimeZone($time_zone_set);
	
	return $date_time_current_time_zone;
}

$current_date_time_server = new DateTime("NOW");
$current_date_time_to_client = parsetDateTimeToOtherTimeZone($current_date_time_server->format(DateTime::ISO8601), $client_settings_time['timezone']);
$current_date_time_client = new DateTime($client_settings_time['current_time']);


$start_date_time_to_server = new DateTime($auction_settings_room['start_date_time']);
$start_date_time_to_client = parsetDateTimeToOtherTimeZone($auction_settings_room['start_date_time'], $client_settings_time['timezone']);



$resp = array(
	'current_date_time_to_client'=>$current_date_time_to_client->format(DateTime::ISO8601),
	'current_date_time_client'=>$current_date_time_to_client->format(DateTime::ISO8601),

	'start_date_time_to_server'=>$start_date_time_to_server->format(DateTime::ISO8601), 
	'start_date_time_iso_client'=>$start_date_time_to_client->format(DateTime::ISO8601), 
	'duration'=>$auction_settings_room['duration_in_minuts']
);
print_r($resp);die();
echo json_encode($resp);


