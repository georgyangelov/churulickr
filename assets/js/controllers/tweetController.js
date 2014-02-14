angular.module('churulickr').controller('tweetController',
['$scope', '$http', 'tweet', 'socket', '$rootScope', '$routeParams', function($scope, $http, tweet, socket, $rootScope, $routeParams) {

	$scope.tweets = [];

	var socket_connection = null;

	$scope.loadAllTweets = function() {
		tweet.getAllTweets().then(function(p) {
			$scope.tweets = p.data;
			subscribe('/socket/tweet/all');
		});
	};

	$scope.loadTweets = function() {
		tweet.getTweets().then(function(p) {
			$scope.tweets = p.data;
			subscribe('/socket/tweet');
		});
	};

	$scope.loadUserTweets = function(username) {
		tweet.getUserTweets(username).then(function(p) {
			$scope.tweets = p.data;
			subscribe('/socket/tweet/' + username);
		});
	};

	$scope.loadSearchTweets = function(tag) {
		tweet.searchTweets(tag).then(function(p) {
			$scope.tweets = p.data;
			subscribe('/socket/tweet/tags/' + tag);
		});
	}

	$scope.reply = function(username) {
		$rootScope.$broadcast('reply', username);
	};

	function subscribe(url) {
		socket.connect(url, function(socket) {
			if (socket_connection) {
				socket_connection.close();
			}

			socket_connection = socket;

			$scope.$on('$destroy', function() {
				if (socket_connection) {
					socket_connection.close();
					socket_connection = null;
				}
			});
		}, function(socket, message) {
			$scope.$apply(function() {
				$scope.tweets.unshift(message);
			});
		});
	}

	$scope.initTooltip = function() {
		$('.timeTooltip').tooltip();
	}


	if ($routeParams.username) {
		$scope.loadUserTweets($routeParams.username);
	} else if ($rootScope.logged_in) {
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

	$scope.$on('search', function(event, tag) {
			$scope.loadSearchTweets(tag);
	});



}]);
