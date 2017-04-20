angular
  .module('robocombat')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'js/views/static/home.html'
    })
    .state('eventsIndex', {
      url: '/events',
      templateUrl: 'js/views/events/index.html',
      controller: 'EventsIndexCtrl as eventsIndex'
    })
    .state('eventsNew', {
      url: '/events/new',
      templateUrl: 'js/views/events/new.html',
      controller: 'EventsNewCtrl as eventsNew'
    })
    .state('eventsShow', {
      url: '/events/:id',
      templateUrl: 'js/views/events/show.html',
      controller: 'EventsShowCtrl as eventsShow'
    })
    .state('eventsEdit', {
      url: '/events/:id/edit',
      templateUrl: 'js/views/events/edit.html',
      controller: 'EventsEditCtrl as eventsEdit'
    })                      // events routes end
    .state('robotsIndex', {
      url: '/robots',
      templateUrl: 'js/views/robots/index.html',
      controller: 'RobotsIndexCtrl as robotsIndex'
    })
    .state('robotsNew', {
      url: '/robots/new',
      templateUrl: 'js/views/robots/new.html',
      controller: 'RobotsNewCtrl as robotsNew'
    })
    .state('robotsShow', {
      url: '/robots/:id',
      templateUrl: 'js/views/robots/show.html',
      controller: 'RobotsShowCtrl as robotsShow'
    })
    .state('robotsEdit', {
      url: '/robots/:id/edit',
      templateUrl: 'js/views/robots/edit.html',
      controller: 'RobotsEditCtrl as robotsEdit'
    })                  // robots state end
    .state('usersIndex', {
      url: '/users',
      templateUrl: 'js/views/users/index.html',
      controller: 'UsersIndexCtrl as usersIndex'
    })
    .state('usersNew', {
      url: '/users/new',
      templateUrl: 'js/views/users/new.html',
      controller: 'UsersNewCtrl as usersNew'
    })
    .state('usersShow', {
      url: '/users/:id',
      templateUrl: 'js/views/users/show.html',
      controller: 'UsersShowCtrl as usersShow'
    })
    .state('usersEdit', {
      url: '/users/:id/edit',
      templateUrl: 'js/views/users/edit.html',
      controller: 'UsersEditCtrl as usersEdit'
    })          // user states end
    .state('arenasIndex', {
      url: '/arenas',
      templateUrl: 'js/views/arenas/index.html',
      controller: 'ArenasIndexCtrl as arenasIndex'
    })
    .state('arenasNew', {
      url: '/arenas/new',
      templateUrl: 'js/views/arenas/new.html',
      controller: 'ArenasNewCtrl as arenasNew'
    })
    .state('arenasShow', {
      url: '/arenas/:id',
      templateUrl: 'js/views/arenas/show.html',
      controller: 'ArenasShowCtrl as arenasShow'
    })
    .state('arenasEdit', {
      url: '/arenas/:id/edit',
      templateUrl: 'js/views/arenas/edit.html',
      controller: 'ArenasEditCtrl as arenasEdit'
    })               // arenas states end
    .state('login', {
      url: '/login',
      templateUrl: 'js/views/auth/login.html',
      controller: 'AuthCtrl as auth'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'js/views/auth/register.html',
      controller: 'AuthCtrl as auth'
    });

  $urlRouterProvider.otherwise('/');
}
