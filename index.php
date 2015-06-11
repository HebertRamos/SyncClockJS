<?php header("Access-Control-Allow-Origin: *"); ?>
<!DOCTYPE html>
<html lang="en">

<head>

    <title>Sync Test</title>


    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    

    <!-- Bootstrap Core JavaScript -->
    <script src="js/jquery.js"></script>
    <script src="js/clock.js"></script>
    <script src="js/jstz.min.js" type="text/javascript"></script>
    <script src="js/jquery.countdown.min.js" type="text/javascript" charset="utf-8"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>

</head>

<body>


<div class="container">
	<div class="row">

		Server:<div id="server_clock" > </div>
        Local:<div id="local_clock" > </div>

        TempoRestante:

       <div class="progress">
          <div id="diference_clock" class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40"
          aria-valuemin="0" aria-valuemax="100" style="width:100%"></div>
        </div>

	</div>
</div>

<script type="text/javascript">
    start_room({server_clock:'server_clock.php'});
</script>
</body>

</html>
