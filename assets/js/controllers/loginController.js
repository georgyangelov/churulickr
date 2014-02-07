angular.module('churulickr').controller('loginController', ['$scope','$http', function($scope, $http) {
	$scope.submit = function() {
		if (!$('#loginDialog form').valid()) {
			return;
		}

		$http.post('/user/login', _.pick($scope, 'username', 'password'))
		.success(function(response) {
			console.log('success', response);
		})
		.error(function(err) {
			console.error('error');
		});
	}
}])