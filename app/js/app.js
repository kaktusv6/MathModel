var objModel = {}, // объект который хранить начальные данные. Данные берутся из cities.json
    charts = new Array(), // массив объектов для работы с диаграммами
    cities; // массив городов где будут изменятся значения городов во время работы приложения

google.charts.load('current', {'packages':['corechart']});

google.charts.setOnLoadCallback(drawChart);

// метод который рисует диаграммы
// запускается когда сайт полностью прогрузился
function drawChart() {
    var tables = new Array(),
        countCities = Number.parseInt(objModel.countCities);

    cities = objModel.cities;

    for (let city of cities) {
        var table = new google.visualization.DataTable();
        
        table.addColumn('string', 'Тип лбдей');
        table.addColumn('number', 'Кол-во');
        table.addRows([
            ['Обычные люди', Number.parseInt(city.population) - Number.parseInt(city.infected) - Number.parseInt(city.vacinated)],
            ['Зараженные люди', Number.parseInt(city.infected)],
            ['Привитые люди', Number.parseInt(city.vacinated)]
        ]);
        tables.push(table);
    }
    
    var sizeChart = 180;
    var options = {
            legend: 'none',
            width: sizeChart,
            height: sizeChart
        },
        pieCharts = document.getElementsByClassName('pie-chart'),
        select = document.getElementById('select-city');

    for (var i = 0; i < countCities; i++) {
        var chart = new google.visualization.PieChart(pieCharts[i]),
            option = document.createElement('option');

        // Добавление названий городов в select
        option.text = cities[i].name;
        select.add(option);

        options.title = cities[i].name;
        chart.draw(tables[i], options);
        charts.push(chart);
    }

    $('.fund').html(objModel.fund);
}

// метод для перерисовки диаграм
// новые данные берутся из массива cities
function updateCharts() {
    var tables = new Array(),
        countCities = cities.length;

    for (let city of cities) {
        var table = new google.visualization.DataTable();
        
        table.addColumn('string', 'Тип лбдей');
        table.addColumn('number', 'Кол-во');
        table.addRows([
            ['Обычные люди', Number.parseInt(city.population) - Number.parseInt(city.infected) - Number.parseInt(city.vacinated)],
            ['Зараженные люди', Number.parseInt(city.infected)],
            ['Привитые люди', Number.parseInt(city.vacinated)]
        ]);
        tables.push(table);
    }
    
    var sizeChart = 180;
    var options = {
            legend: 'none',
            width: sizeChart,
            height: sizeChart
        },
        pieCharts = document.getElementsByClassName('pie-chart');

    for (var i = 0; i < countCities; i++) {
        var chart = new google.visualization.PieChart(pieCharts[i]);
        options.title = cities[i].name;
        chart.draw(tables[i], options);
        charts.push(chart);
    }
    $('.fund').html(objModel.fund);
}

// запрос на данные из json файла
// в любом случае выполняется в конце
$.getJSON('php/cities.json', function(data) {
    objModel = data;
    console.log(data);
});