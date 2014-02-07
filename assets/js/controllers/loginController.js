angular.module('churulickr').controller('loginController', ['$scope','$http', function($scope, $http) {
	$scope.submit = function() {
		if (!$('#loginDialog form').valid()) {
			return;
		}

		$http.post('/user/login', _.pick($scope, 'username', 'password'))
		.success(function(response) {
			$scope.username = $scope.password = '';
			$scope.has_error = false;

			$('#loginDialog').modal('hide');
		})
		.error(function(err) {
			$scope.has_error = true;
		});
	}
}])