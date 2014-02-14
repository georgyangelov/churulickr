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

	$scope.loadSearchTweets = function(query) {
		tags = query.split(' ');
		tweet.searchTweets(query).then(function(p) {
			$scope.tweets = p.data;
			for(var i = 0; i < tags.length; ++i) {
				if(tags[i] != '') {
					subscribe('/socket/tweet/tags/' + tags[i]);
				}
			}
		});
	};

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
				if($scope.tweets.indexOf(message) == -1) {
					$scope.tweets.unshift(message);
				}
			});
		});
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
		if (tag) {
			$scope.loadSearchTweets(tag);
		} else if ($routeParams.username) {
			$scope.loadUserTweets($routeParams.username);
		} else if ($rootScope.logged_in) {
			$scope.loadTweets();
		} else {
			$scope.loadAllTweets();
		}
	});
}]);
