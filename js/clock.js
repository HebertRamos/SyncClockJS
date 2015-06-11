


function start_room(config){


  function init(){

    var timeBefore = new Date();
    ask_datetime_to_start(function(data){

      var timeAfter = new Date();
      var timeRequest = (timeAfter - timeBefore);
      
      var current_gmt_start_date = dateFromISO8601(data.start_date_time_iso_client);

      var current_gmt_server_date = dateFromISO8601(data.current_date_time_to_client);
      current_gmt_server_date = new Date(current_gmt_server_date - timeRequest);

      var server_time_reminder_to_start = current_gmt_start_date - current_gmt_server_date;

      var now = new Date();
      var start_date_ = new Date(now.getTime()+server_time_reminder_to_start);

      countdown(start_date_, data.duration);

    });
  }

  function ask_datetime_to_start(cb){

    var tz = jstz.determine(); // Determines the time zone of the browser client
    var now = new Date();

    $.getJSON(config.server_clock, {time_zone: tz.name(), current_time:now.toISOString()}, function(data){
        cb(data)
    });
  }

  function countdown(start_date, duration){

    function run_countdown(){

      var end_date = new Date(start_date.setMinutes(start_date.getMinutes() + duration));

      var dateString = (end_date.getMonth() + 1) + "/" + end_date.getDate() + "/" + end_date.getFullYear() + " " + end_date.getHours() + ":" + end_date.getMinutes() + ":" + end_date.getSeconds();

      var percent_to_minut = 100/(duration);
      var percent_to_second = 100/(duration*60);
      
      $('#diference_clock').countdown(dateString)
       .on('update.countdown', function(event) {

          var percent_second = event.offset.seconds * percent_to_second;
          var percent_minuts = event.offset.minutes * percent_to_minut;

          
          $(this).width((percent_minuts+percent_second)+"%");
          var format = '%H:%M:%S';
          $(this).html(event.strftime(format));

          //$(this).countdown('stop');

       })
       .on('finish.countdown', function(event) {
          $(this).html('Tempo Encerrado!');
        });

     
    }

    if(start_date > now){
      alert("A sala abre as "+ start_date);  
    }

    
    var now = new Date();
    var remainder = (start_date.getTime() - now.getTime());

    console.log('NOw Date');
    console.log(now);

    console.log('Start Date');
    console.log(start_date);

    console.log('Time to wait');
    console.log((remainder/(1000*60)) + " Minuts");

    
    setTimeout(run_countdown, remainder);

  }

  function dateFromISO8601(isostr) {
    var parts = isostr.match(/\d+/g);
    return new Date(parts[0], (parts[1] - 1), parts[2], parts[3], parts[4], parts[5]);
  }

  init();
}
