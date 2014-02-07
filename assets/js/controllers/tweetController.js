angular.module('churulickr').controller('tweetController',
['$scope', '$http', function($scope, $http) {

	function genTweet(next) {
		$http.get('http://www.randomtext.me/api/giberrish/p-1/10-30?' + ~~(Math.random() * 10000))
		.success(function(data) {
			next({
				src: 'http://lorempixel.com/70/70/?' + ~~(Math.random() * 10000),
				text: data.text_out.replace(/<\/?p>/g, ''),
				from: '@stormbreakerbg'
			});
		});
	};

	$scope.tweets = [];

	$scope.add = function add() {
		genTweet(function(tweet) {
			$scope.tweets.unshift(tweet);
		});
	};

	for (var i = 0; i < 20; i++) {
		$scope.add();
	}

	setInterval(function() {
		$scope.add();
	}, 5000);

	// $scope.remove = function remove() {
	// 	$scope.tweets.splice(
	// 		~~(Math.random() * $scope.tweets.length),
	// 		1
	// 	)
	// };

}])