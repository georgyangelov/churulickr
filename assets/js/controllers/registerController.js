angular.module('churulickr').controller('registerController',
	['$scope', '$http', 'user', function($scope, $http, user) {
	$scope.submit = function() {
		if (!$('#registerDialog form').valid()) {
			return;
		}

		user.register($scope.email, $scope.fullname, $scope.username, $scope.password).then(function() {
			return user.login($scope.username, $scope.password);
		}).then(function(response) {
			$scope.username = $scope.password = $scope.email = '';
			$scope.has_error = false;
			$scope.$emit('login', response.data);

			$('#registerDialog').modal('hide');
		}, function(err) {
			$scope.has_error = true;
		});
	}
}]);
