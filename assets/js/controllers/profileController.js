angular.module('churulickr').controller('profileController',
['$scope', '$rootScope', '$routeParams', 'user', '$location', function($scope, $rootScope, $routeParams, user, $location) {

	/* Properties */
	$scope.info = {};

	$scope.first_name = function() {
		return $scope.info.fullname.split(' ')[0];
	};

	$scope.is_follower = function() {
		if (!$rootScope.logged_in) {
			return false;
		}

		return $scope.info.following.indexOf($rootScope.user.username) >= 0;
	};

	/* Methods */
	$scope.follow = function() {
		user.follow($scope.info.username).then(function() {
			console.log('success');
			$scope.info.following.push($rootScope.user.username);
		}, function() {
			$rootScope.$broadcast('alert', 'danger', "Couldn't follow user. You don't like him/her anyway...");
		});
	};

	/* Initializer */
	user.info($routeParams.username).then(function(response) {
		$scope.info = response.data;
	}, function() {
		$rootScope.$broadcast('alert', 'danger', "We don't know anything about this user, sorry...");
		$location.path('/');
	});
}]);