angular.module('churulickr').controller('profileController',
['$scope', '$rootScope', '$routeParams', 'user', '$location', function($scope, $rootScope, $routeParams, user, $location) {

	/* Properties */
	$scope.info = {};

	$scope.first_name = function() {
		if (!$scope.info.fullname) {
			return '';
		}

		return $scope.info.fullname.split(' ')[0];
	};

	$scope.is_follower = function() {
		if (!$scope.info.followers) {
			return false;
		}

		if (!$rootScope.logged_in) {
			return false;
		}

		return $scope.info.followers.indexOf($rootScope.user.username) >= 0;
	};

	/* Methods */
	$scope.follow = function() {
		user.follow($scope.info.username).then(function() {
			$scope.info.followers.push($rootScope.user.username);
		}, function() {
			$rootScope.$broadcast('alert', 'danger', "Couldn't follow user. You don't like him/her anyway...");
		});
	};

	$scope.unfollow = function() {
		user.unfollow($scope.info.username).then(function() {
			$scope.info.followers.splice(
				$scope.info.followers.indexOf($rootScope.user.username)
			, 1);
		}, function() {
			$rootScope.$broadcast('alert', 'danger', "Couldn't unfollow user. Don't unfollow your friends like that!");
		});
	};

	$scope.verify = function() {
		user.verify($scope.info.username).then(function() {
			$scope.info.verified = true;
		}, function() {
			$rootScope.$broadcast('alert', 'danger', "Couldn't verify user. I'm sure this account is not legit...");
		});
	};

	$scope.unverify = function() {
		user.unverify($scope.info.username).then(function() {
			$scope.info.verified = false;
		}, function() {
			$rootScope.$broadcast('alert', 'danger', "Couldn't unverify user. I'm sure this account is legit...");
		});
	};

	$scope.remove = function() {
		if (!confirm('Are you really sure you want to nuke this account? Once you go to the dark side there is no going back!')) {
			return;
		}

		user.remove($scope.info.username).then(function() {
			$location.path('/');

			$rootScope.$broadcast('alert', 'success', "This user is no more!");
		}, function() {
			$rootScope.$broadcast('alert', 'danger', "Couldn't remove user. I'm sure this account is legit...");
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