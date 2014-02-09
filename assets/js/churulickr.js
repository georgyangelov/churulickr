angular.module('churulickr', ['ngRoute', 'wu.masonry']).config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/index.html'
      }).
      when('/:username', {
      	templateUrl: 'partials/profile.html',
      	controller: 'profileController'
      });
  }
]);