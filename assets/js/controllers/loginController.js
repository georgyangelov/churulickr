angular.module('churulickr').controller('loginController', ['$scope', 'user', function($scope, user) {
	$scope.submit = function() {
		if (!$('#loginDialog form').valid()) {
			return;
		}

		user.login($scope.username, $scope.password).success(function(user_data) {
			$scope.username = $scope.password = '';
			$scope.has_error = false;
			$scope.$emit('login', user_data);

			$('#loginDialog').modal('hide');
		})
		.error(function(err) {
			$scope.has_error = true;
		});
	};

	$('#loginDialog').on('shown.bs.modal', function() {
		$('#loginUsername').focus();
	});
}])