<?php

	// remove for production

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	// $url='http://api.geonames.org/countryInfoJSON?formatted=true&lang=' . $_REQUEST['lang'] . '&country=' . $_REQUEST['country'] . '&username=flightltd&style=full';
	// $url = 'https://api.ipregistry.co/?key=o4w0tzt8cojlfnl6';
    
    $JsonParser = file_get_contents("../../countryBorders.geo.json");
        // var_dump($JsonParser);


	// $url = 'http://ip-api.com/json';
	// $ch = curl_init();
	// curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	// curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	// curl_setopt($ch, CURLOPT_URL,$url);

	// $result=curl_exec($ch);

	// curl_close($ch);

	$decode = json_decode($JsonParser,true);			
	

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
	$output['data'] = $decode;
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

?>
