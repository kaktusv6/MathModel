# MathModel

Этот проект содержит в себе сборщик проекта gulp.

Чтобы дальше работать необходимо скачать Node.js.(https://nodejs.org/en/)

Далее вам необходимо сделать `Clone` этого репозитория.

После `Clone` необходимо в консоли перейти в папку этого проекта.

После перехода в папку проекта введите следующие команды в консоль:

1. `npm i -g gulp`
2. `npm install`

Послего того как npm выполнит установку всех необходимых плагинов можно начать пользоваться gulp.
Чтобы пользоваться gulp нужно перейти в корень проекта где находится файл `gulpfile.js` и в консоль ввести `gulp`.

Сборщик проекта создаст локальный сервер (адресс сервера `localhost:8080`) и будет ожидать изменения файлов в папке `dist`. При любом изменение файлов в папке `dist` gulp будет пересобирать файлы, которые вы изменили.

Если вы просто укажите в адрессной строке `localhost:8080`, то сервер вам выдаст `404`. Чтобы запустить приложение с того момента где вводятся начальные данные то необходимо ввести `localhost:8080/app/`. Чтобы перейти к главной странице приложения необходимо ввести `localhost:8080/app/app.html`, основное приложение будет работать с начальными данными, которые были введены с последнего полного запуска приложения.

Все файлы с которыми мы будем работать далее будут находится в папке `dist`. В папке `app` будут уже файлы которые обработал Gulp.

Структура проекта:

````c++
app // папка с рабочим кодом
---php // папка с скриптами сервера и json файлом
---css // папка со стилями
---js // папка со скриптами
--- *.html // html файлы
dist // папка с исходным кодом
--jade // верстка написаная на препроцессоре jade
--scss // стили написанные на препроцессоре scss
--js // js скрипты
node_modules // папка с модулями для gulp и для разработки
--...
boser_components // папка с библиотеками
--bootstrap
--jquery
````