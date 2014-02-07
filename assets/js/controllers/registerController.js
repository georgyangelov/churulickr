angular.module('churulickr').controller('registerController', ['$scope', '$http', function($scope, $http) {
	$scope.submit = function() {
		if (!$('#registerDialog form').valid()) {
			return;
		}

		$http.post('/user/register', _.pick($scope, 'username', 'password', 'email'))
		.success(function(response) {
			$scope.username = $scope.password = $scope.email = '';
			$scope.has_error = false;

			$('#registerDialog').modal('hide');
		})
		.error(function(err) {
			$scope.has_error = true;
		});
	}
}])