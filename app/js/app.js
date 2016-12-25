var objModel = {}, // объект который хранить начальные данные. Данные берутся из cities.json
    charts = new Array(); // массив объектов для работы с диаграммами

google.charts.load('current', {'packages':['corechart']});

google.charts.setOnLoadCallback(drawChart);

var year = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
//инициализация глобальных переменных, используемых по ходу работы модели
var month;

//переменная, в которой хранится название текущего месяца
var outmonth;

var countdown;
var weeks;
//номер текущей недели
var cweek;

window.onload = function() {
  console.log(objModel.cities);
  for (var i = 0; i < objModel.cities.length; i++) {
    objModel.cities[i].cure3 = objModel.cities[i].infected;
  }

  month = year.indexOf(objModel.startMonth) + 1;
  outmonth = year[month];
  countdown = objModel.period*4;
  weeks = year.indexOf(objModel.startMonth)*4 + 1;
  cweek = weeks % 4 == 0 ? 4 : weeks % 4;

  $('#next-step').click(simulationStep);
}
// метод который рисует диаграммы
// запускается когда сайт полностью прогрузился
function drawChart() {
    var tables = new Array(),
        countCities = objModel.countCities;

    for (let city of objModel.cities) {
        var table = new google.visualization.DataTable();

        table.addColumn('string', 'Тип людей');
        table.addColumn('number', 'Кол-во');
        table.addRows([
            ['Обычные люди', city.population - city.infected - city.vacinated],
            ['Зараженные люди', city.infected],
            ['Привитые люди', city.vacinated]
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
    console.log(city);
        var table = new google.visualization.DataTable();

        table.addColumn('string', 'Тип лбдей');
        table.addColumn('number', 'Кол-во');
        table.addRows([
            ['Обычные люди', city.population - city.infected - city.vacinated],
            ['Зараженные люди', city.infected],
            ['Привитые люди', city.vacinated]
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
  let i = objModel.cities.indexOf(getElementById("select-city").value);
  let amount = getElementByClassName("input-count-vacinated form-control").value;
  if (amount <= objModel.cities[i].population - objModel.cities[i].infected - objModel.cities[i].vacinated && amount*objModel.price <= objModel.fund) {
    objModel.cities[i].immune3 += amount;
  }
}
//функция, описывающая переход на следующий шаг симуляции
function simulationStep() {
  if (countdown > 0) {
    weeks++;
    countdown--;
    
    if (weeks > 48) {
      weeks = 1;
    }
    if (weeks % 4 == 0) {
      cweek = 4
    }
    else {
      cweek = weeks % 4;
    }
    if (weeks % 4 == 0) {
      month = Math.trunc((weeks - 1) / 4);
    }
    else {
      month = Math.trunc(weeks / 4);
    }

    for (var i = 0; i < objModel.cities.length; i++) {
      let t = weeks < 13 || weeks > 32 ? 0.9 : 0.1;
      let e = Math.random(0,objModel.cities[i].sSaturation*t*objModel.cities[i].infected/objModel.cities[i].population);
      
      objModel.fund+=(objModel.cities[i].population-objModel.cities[i].infected)*objModel.tax;
      objModel.fund-=objModel.cities[i].infected*objModel.cashPatient;
      
      let getIll;
      let temp;
      
      temp = objModel.cities[i].immune1*e;
      getIll +=temp;
      objModel.cities[i].immune1-=temp;
      
      temp = objModel.cities[i].immune2*e;
      getIll +=temp;
      objModel.cities[i].immune2-=temp;
      
      temp = objModel.cities[i].immune3*e;
      getIll +=temp;
      objModel.cities[i].immune3-=temp;
      getIll += (objModel.cities[i].population - objModel.cities[i].infected - objModel.cities[i].vacinated - objModel.cities[i].immune1 - objModel.cities[i].immune2 - objModel.cities[i].immune3 - getIll)*e;
      
      objModel.cities[i].cure1 = objModel.cities[i].cure2;
      objModel.cities[i].cure2 = objModel.cities[i].cure3;
      objModel.cities[i].cure3 = getIll;
      
      objModel.cities[i].infected = objModel.cities[i].cure1 + objModel.cities[i].cure2 + objModel.cities[i].cure3;
      objModel.cities[i].vacinated += objModel.cities[i].immune1;
      
      objModel.cities[i].immune1 = objModel.cities[i].immune2;
      objModel.cities[i].immune2 = objModel.cities[i].immune3;
    }
  }
  updateCharts();
}
// запрос на данные из json файла
// в любом случае выполняется в конце
$.getJSON('php/cities.json', function(data) {
    objModel = data;

    objModel.period = Number.parseInt(objModel.period);
    objModel.countCities = Number.parseInt(objModel.countCities);
    objModel.price = Number.parseInt(objModel.price);
    objModel.fund = Number.parseInt(objModel.fund);
    objModel.tax = Number.parseInt(objModel.tax);
    objModel.cashPatient = Number.parseInt(objModel.cashPatient);

    for(let i = 0; i < objModel.cities.length; i++) {
      objModel.cities[i].population = Number.parseInt(objModel.cities[i].population);
      objModel.cities[i].infected = Number.parseInt(objModel.cities[i].infected);
      objModel.cities[i].vacinated = Number.parseInt(objModel.cities[i].vacinated);
      objModel.cities[i].tSaturation = Number.parseInt(objModel.cities[i].tSaturation);

      objModel.cities[i].cure1 = Number.parseInt(objModel.cities[i].cure1);
      objModel.cities[i].cure2 = Number.parseInt(objModel.cities[i].cure2);
      objModel.cities[i].cure3 = Number.parseInt(objModel.cities[i].cure3);

      objModel.cities[i].immune1 = Number.parseInt(objModel.cities[i].immune1);
      objModel.cities[i].immune2 = Number.parseInt(objModel.cities[i].immune2);
      objModel.cities[i].immune3 = Number.parseInt(objModel.cities[i].immune3);
    }
    console.log(objModel);
});
