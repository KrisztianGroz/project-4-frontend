// app.js is the main JS file which you should define your Angular module
angular
.module('robocombat', ['ui.router', 'ngResource', 'satellizer', 'checklist-model','ui.bootstrap', 'ngAnimate'])
.constant('API_URL', 'http://localhost:3000/api');
