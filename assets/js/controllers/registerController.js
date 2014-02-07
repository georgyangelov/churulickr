angular.module('churulickr').controller('registerController', ['$scope', '$http', function($scope, $http) {
	$scope.submit = function() {
		if (!$('#registerDialog form').valid()) {
			return;
		}

		$http.post('/user/register', _.pick($scope, 'username', 'password', 'email'))
		.success(function(response) {
			console.log('success', response);
		})
		.error(function(err) {
			console.error('error');
		});
	}
}])