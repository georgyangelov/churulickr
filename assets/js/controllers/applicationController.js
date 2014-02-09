angular.module('churulickr').controller('applicationController',
	['$scope', 'user', function($scope, user) {

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
		}).error(function() {
			$scope.$broadcast('alert', 'danger', "We couldn't log you out. You'll have to stay here, sorry...");
		});
	};

	// Check if we are logged in
	user.info().success(set_user_data);

}]);