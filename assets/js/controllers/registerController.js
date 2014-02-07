angular.module('churulickr').controller('registerController',
	['$scope', '$http', 'user', function($scope, $http, user) {
	$scope.submit = function() {
		if (!$('#registerDialog form').valid()) {
			return;
		}

		user.register($scope.email, $scope.username, $scope.password).then(function() {
			return user.login($scope.username, $scope.password);
		}).success(function(user_data) {
			$scope.username = $scope.password = $scope.email = '';
			$scope.has_error = false;
			$scope.$emit('login', user_data);

			$('#registerDialog').modal('hide');
		}).error(function(err) {
			$scope.has_error = true;
		});
	}
}])