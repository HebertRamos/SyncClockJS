


function start_room(){

  var current_datetime;

  function init(){



    var timeBefore = new Date();
    ask_datetime_to_start(function(data){

      var timeAfter = new Date();
      
      var start_date_server = dateFromISO8601(data.start_date_time_to_server);

      var start_date = dateFromISO8601(data.start_date_time_iso_client);

      var current_gmt_server_date = dateFromISO8601(data.current_date_time_to_client);
      current_gmt_server_date = new Date(current_gmt_server_date - (timeAfter - timeBefore));

      var server_time_reminder_to_start = start_date - current_gmt_server_date;

      var now = new Date();

      
      console.log(server_time_reminder_to_start);
      console.log((server_time_reminder_to_start/(1000*60)) + " Minuts");
      var start_date_ = new Date(now.getTime()+server_time_reminder_to_start);

      countdown(start_date_, data.duration);

    });
  }

  function ask_datetime_to_start(cb){

    var tz = jstz.determine(); // Determines the time zone of the browser client
    var now = new Date();

    $.getJSON('server_clock.php', {time_zone: tz.name(), current_time:now.toISOString()}, function(data){

        cb(data)
    });
  }

  function countdown(start_date, duration){

    function run_countdown(){

      var end_date = new Date(start_date.setMinutes(start_date.getMinutes() + duration));

      var dateString = (end_date.getMonth() + 1) + "/" + end_date.getDate() + "/" + end_date.getFullYear() + " " + end_date.getHours() + ":" + end_date.getMinutes() + ":" + end_date.getSeconds();

      console.log(dateString);

      $('#diference_clock').countdown(dateString)
       .on('update.countdown', function(event) {
          var format = '%H:%M:%S';
            $(this).html(event.strftime(format));
       })
       .on('finish.countdown', function(event) {
          $(this).html('Tempo Encerrado!');
        });

     
    }

    
    var now = new Date();
    var remainder = (start_date.getTime() - now.getTime());

    console.log('NOw Date');
    console.log(now);

    console.log('Start Date');
    console.log(start_date);

    console.log('Time to wait');
    console.log((remainder/(1000*60)) + " Minuts");

    alert("A sala abrir as "+ start_date);



    setTimeout(run_countdown, remainder);

  }

  function GetStartTime() {
                        var dateNow = new Date();
                        var dateNowElapsedTime = dateNow.getTime() / 1000;
                        
                        var dateDeparture = new Date(2015,2-1,3,10,30,0);//Date of 03 fev 2012 (notice the "minus one" for the month...)
                        var dateDepartureElapsedTime = dateDeparture.getTime() / 1000;
                        
                        var timeStampInSec = dateDepartureElapsedTime - dateNowElapsedTime;
                        
                        var minutesTmp = timeStampInSec / 60;
                        var seconds = Math.floor(timeStampInSec % 60);
                        var hoursTmp = minutesTmp / 60;
                        var minutes = Math.floor(minutesTmp % 60);
                        var days = Math.floor(hoursTmp / 24);
                        var hours = Math.floor(hoursTmp % 24);
                        
                        return days + ":" + hours + ":" + minutes + ":" + seconds;
                }

  init();
}


function dateFromISO8601(isostr) {
    var parts = isostr.match(/\d+/g);
    return new Date(parts[0], (parts[1] - 1), parts[2], parts[3], parts[4], parts[5]);
}
