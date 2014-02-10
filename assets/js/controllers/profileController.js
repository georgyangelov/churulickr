angular.module('churulickr').controller('profileController',
['$scope', '$rootScope', '$routeParams', 'user', '$location', function($scope, $rootScope, $routeParams, user, $location) {
	$scope.info = {};

	$scope.first_name = function() {
		if (!$scope.info.fullname) {
			return '';
		}

		return $scope.info.fullname.split(' ')[0];
	};

	user.info($routeParams.username).then(function(response) {
		$scope.info = response.data;
	}, function() {
		$rootScope.$broadcast('alert', 'danger', "We don't know anything about this user, sorry...");
		$location.path('/');
	});
}]);