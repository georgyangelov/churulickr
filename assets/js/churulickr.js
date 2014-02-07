angular.module('churulickr', ['ngRoute']).config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/index.html'
      })
  }
]);