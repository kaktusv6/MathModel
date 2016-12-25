var objModel = {}, // объект который хранить начальные данные. Данные берутся из cities.json
    charts = new Array(); // массив объектов для работы с диаграммами

google.charts.load('current', {'packages':['corechart']});

google.charts.setOnLoadCallback(drawChart);

//инициализация глобальных переменных, используемых по ходу работы модели
var year = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
var countdown = objModel.period*4;
var weeks = year.indexOf(objModel.startMonth)*4 + 1;

// метод который рисует диаграммы
// запускается когда сайт полностью прогрузился
function drawChart() {
    var tables = new Array(),
        countCities = Number.parseInt(objModel.countCities);

    for (let city of objModel.cities) {
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
        option.text = objModel.cities[i].name;
        select.add(option);

        options.title = objModel.cities[i].name;
        chart.draw(tables[i], options);
        charts.push(chart);
    }

    $('.fund').html(objModel.fund);
    $('.month').html(objModel.startMonth);
}

// метод для перерисовки диаграм
// новые данные берутся из массива cities
function updateCharts() {
    var tables = new Array(),
        countCities = objModel.cities.length;

    for (let city of objModel.cities) {
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
        options.title = objModel.cities[i].name;
        chart.draw(tables[i], options);
        charts.push(chart);
    }
    $('.fund').html(objModel.fund);
}
//функция, которая вызывается при попытке провести вакцинацию в каком-либо городе
function vaccinate() {

}
//функция, описывающая переход на следующий шаг симуляции
function simulationStep() {
  weeks++;
  if (weeks > 48)
  {
    weeks = 1;
  }
  let answer;
  if (weeks % 4 == 0)
  {
    cweek = 4
  }
  else
  {
    cweek = weeks % 4;
  }
  if (weeks % 4 == 0)
  {
    cmonth = Math.trunc((weeks - 1) / 4) + 1;
  }
  else
  {
    cmonth = Math.trunc(weeks / 4) + 1;
  }
  for (var i = 0; i < objModel.cities.length; i++) {
    objModel.cities[i];
  }
}
// запрос на данные из json файла
// в любом случае выполняется в конце
$.getJSON('php/cities.json', function(data) {
    objModel = data;
    console.log(data);
});
