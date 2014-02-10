angular.module('churulickr').controller('tweetController',
['$scope', '$http', 'tweet', '$rootScope', '$routeParams', function($scope, $http, tweet, $rootScope, $routeParams) {

	$scope.loadAllTweets = function() {
		tweet.getAllTweets().then(function(p) {
			$scope.tweets = p.data;
		});
	};
	$scope.loadTweets = function() {
		tweet.getTweets().then(function(p) {
			$scope.tweets = p.data;
		})
	};
	$scope.loadUserTweets = function() {
		tweet.getUserTweets($routeParams.username).then(function(p) {
			$scope.tweets = p.data;
		});
	};

	if ($routeParams.username) {
		$scope.loadUserTweets();
	}
	else if ($rootScope.logged_in) {
		$scope.loadTweets();
	} else {
		$scope.loadAllTweets();
	}

	$scope.$on('login', function() {
		$scope.loadTweets();
	});

	$scope.$on('logout', function() {
		$scope.loadAllTweets();
	});

}])