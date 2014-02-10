angular.module('churulickr').controller('tweetController',
['$scope', '$http', 'tweet', '$rootScope', function($scope, $http, tweet, $rootScope) {

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

	$scope.reply = function(username) {
		$rootScope.$broadcast('reply', username);
	};

	if($rootScope.logged_in) {
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