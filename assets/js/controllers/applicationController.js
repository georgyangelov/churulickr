angular.module('churulickr').controller('applicationController',
	['$scope','$http', 'user', function($scope, $http, user) {

	$scope.logged_in = false;
	$scope.user = {};

	$scope.$on('login', function(user_data) {
		$scope.logged_in = true;
		$scope.user = user_data;
	});

	$scope.logout = function() {
		user.logout().success(function() {
			$scope.logged_in = false;
			$scope.user = {};
		}).error(function() {
			console.error('Cannot logout');
		});
	};

}]);