angular.module('churulickr').controller('registerController',
	['$scope', '$http', 'user', '$rootScope', function($scope, $http, user, $rootScope) {
	$scope.submit = function() {
		if (!$('#registerDialog form').valid()) {
			return;
		}

		alert($scope.avatar);
		user.register($scope.email, $scope.fullname, $scope.username, $scope.password, $scope.avatar).then(function() {
			return user.login($scope.username, $scope.password);
		}).then(function(response) {
			$scope.username = $scope.password = $scope.email = '';
			$scope.has_error = false;
			$rootScope.$broadcast('login', response.data);

			$('#registerDialog').modal('hide');
		}, function(err) {
			$scope.has_error = true;
		});
	};

	$('#registerDialog').on('shown.bs.modal', function() {
		$('#email').focus();
	});
}]);
