var objModel = {},
	countCities = 0,
	index = 0,
	cities = new Array();

$.getJSON('php/cities.json', function(data) {
	objModel = data;
	countCities = data.countCities*1;
});

$(document).ready(function() {
	var name = $('#name-city-input'),
		type = $('#type-city-input'),
		populationInput = $('#population-input'),
		infected = $('#infected-input'),
		vacinated = $('#vacinated-input'),
		transport = $('#transport-input');

	function clearInputs () {
		name.val('');
		populationInput.val('');
		infected.val('');
		vacinated.val('');
		transport.val('');
	}

	$('.but-submit').click(function () {
		// проверка введенных данных
		
		var nameCity = name.val(),
			typePopulation = type.val(),
			population = populationInput.val(),
			pInfected = infected.val(),
			pVacinated = vacinated.val(),
			tSaturation = transport.val();
		var city = new City(
			nameCity, typePopulation, population,
			pInfected, pVacinated, tSaturation
		);

		cities.push(city);

		if (index === countCities - 1) {
			objModel.cities = cities;
			$.get(	
				'php/update-json.php',
				objModel,
				() => { document.location.replace('http://localhost:8080/app/app.html'); }
			);
			return true;
		}

		index++;
		clearInputs();
		$('.title').html('Задайте параметры ' +
			(index + 1) +
			'-ого города'
		);
	});	
});