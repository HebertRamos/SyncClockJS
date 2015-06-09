
var currentServerTimestamp = null;
var timeToReScynClock = 10;
var currentRunClockTimes = 0;

var STATE_LOCK = false;

function run_clock(){

	
	if(!STATE_LOCK){
		var serverDateTime = new Date(currentServerTimestamp);
		
		currentServerTimestamp = currentServerTimestamp + 1000;
		currentRunClockTimes++;

		show_clock(serverDateTime);
			
		if(currentRunClockTimes == timeToReScynClock){

			STATE_LOCK = true;
			currentRunClockTimes = 0;
			askserver(function(serverTimestamp, timeRequest){
				currentServerTimestamp = (serverTimestamp - timeRequest);
				STATE_LOCK = false;
			});
			
		}
	}
}


function start_clock(){
	

	askserver(function(serverTimestamp, timeRequest){

		currentServerTimestamp = (serverTimestamp - timeRequest);
		run_clock();
		setInterval(run_clock, 1000);
	});
	
}


function askserver(cb){

	var timeBeforeRequest = (new Date()).valueOf();
	$.getJSON('http://192.168.25.25:8080/sync/server_clock.php', function(data){

		var timeAfterRequest = (new Date()).valueOf();
		var timeRequest = timeAfterRequest - timeBeforeRequest;


		var startTime = new Date(data.dateTimeString);

		cb(startTime.valueOf(), timeRequest);
	});
}

function show_clock(date){

	$("#clock").html(date.toString());
}