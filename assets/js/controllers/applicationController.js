angular.module('churulickr').controller('applicationController',
	['$scope','$http', 'user', function($scope, $http, user) {

	$scope.logged_in = false;
	$scope.user = {};

	function login_handler(user_data) {
		$scope.logged_in = true;
		$scope.user = user_data;
	}

	$scope.$on('login', login_handler);

	$scope.logout = function() {
		user.logout().success(function() {
			$scope.logged_in = false;
			$scope.user = {};
		}).error(function() {
			console.error('Cannot logout');
		});
	};

	// Check if we are logged in
	user.info().success(login_handler);

}]);