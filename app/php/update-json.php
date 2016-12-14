<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
</head>
<body>
<?php
	$fp = fopen('cities.json', 'w');
	fwrite($fp, json_encode($_GET));
	fclose($fp);
?>
</body>
</html>