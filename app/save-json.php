<!DOCTYPE html>
<html>
<head>
	<meta charset='utf-8'>
	<title></title>
</head>
<body>
<?php
	foreach ($_GET as $key => $value) {
		echo $key;
		echo ': ';
		echo $value;
	}
	$fp = fopen('cities.json', 'w');
	fwrite($fp, json_encode($_GET));
	fclose($fp);

	// header("Location: chat.html")
	// получаем строку через get запрос
	// создаем .json файл который содержит переданную строку
	// переходим на следующую страницу
	
?>
</body>
</html>