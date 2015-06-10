


function start_room(){

  var current_datetime;

  function init(){




    ask_datetime_to_start(function(data){

      
      
      var start_date_server = dateFromISO8601(data.start_date_time_to_server);

      var start_date = dateFromISO8601(data.start_date_time_iso_client);


      //Corrigir data de inicio


      countdown(start_date, data.duration);

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

    var now = new Date();
    var end_date = new Date(start_date.setMinutes(start_date.getMinutes() + duration));

    function run_countdown(){

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
    var remainder = new Date(start_date - now);

    console.log(remainder.getMilliseconds());

    setTimeout(run_countdown, remainder.getMilliseconds());

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
