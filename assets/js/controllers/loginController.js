angular.module('churulickr').controller('loginController', ['$scope', 'user', '$rootScope', function($scope, user, $rootScope) {
	$scope.submit = function() {
		if (!$('#loginDialog form').valid()) {
			return;
		}

		user.login($scope.username, $scope.password).success(function(user_data) {
			$scope.username = $scope.password = '';
			$scope.has_error = false;
			$rootScope.$broadcast('login', user_data);

			$('#loginDialog').modal('hide');
		})
		.error(function(err) {
			$scope.has_error = true;
		});
	}
}])