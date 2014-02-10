angular.module('churulickr').controller('applicationController',
	['$rootScope', 'user', function($scope, user) {

	$scope.logged_in = false;
	$scope.user = {};

	function set_user_data(user_data) {
		$scope.logged_in = true;
		$scope.user = user_data;
	}

	$scope.$on('login', function(event, user_data) {
		set_user_data(user_data);
	});

	$scope.logout = function() {
		user.logout().success(function() {
			$scope.logged_in = false;
			$scope.user = {};

			$scope.$broadcast('alert', 'success', "Please don't leave me alone... :(");
			$scope.$broadcast('logout');
		}).error(function() {
			$scope.$broadcast('alert', 'danger', "We couldn't log you out. You'll have to stay here, sorry...");
		});
	};

	// Check if we are logged in
	user.logged_user_info().success(function(user_data) {
		$scope.$broadcast('login', user_data);
	});

}]);