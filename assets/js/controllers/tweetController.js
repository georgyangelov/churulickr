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

	$scope.loadUserTweets = function(username) {
		tweet.getUserTweets(username).then(function(p) {
			$scope.tweets = p.data;
		});
	};

	$scope.reply = function(username) {
		$rootScope.$broadcast('reply', username);
	};

	if ($routeParams.username) {
		$scope.loadUserTweets($routeParams.username);
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

}]);
