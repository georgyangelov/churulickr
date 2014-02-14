var MESSAGE_MAX_LENGTH = 140;

angular.module('churulickr').controller('newTweetController',
	['$scope', 'tweet', 'location', function($scope, tweet, location) {

	$scope.message = '';
	$scope.location = '';

	$scope.has_error = false;
	$scope.symbols_left = MESSAGE_MAX_LENGTH;
	$scope.message_empty = true;

	$scope.change = function() {
		$scope.symbols_left = MESSAGE_MAX_LENGTH - $.trim($scope.message).length;
		$scope.message_empty = $scope.symbols_left == MESSAGE_MAX_LENGTH;
	};

	$scope.submit = function() {
		if ($scope.message_empty || $scope.symbols_left < 0) {
			return;
		}
		$scope.removeHash = function(str) {
			return str.substring(1);
		}
		$scope.hashtags = ($scope.message.match(/#(\w+)/g) || []).map($scope.removeHash);
		tweet.new($scope.message, $scope.location, $scope.hashtags).then(function() {
			$scope.message = '';
			$scope.has_error = false;
			$('#newTweetDialog').modal('hide');
		}, function() {
			$scope.has_error = true;
		});
	};

	$scope.reply = function(username) {
		$('#newTweetDialog').modal('show');
		$scope.message = '@' + username + ' ';
		$scope.change();
	};

	$scope.$on('reply', function(event, username) {
		$scope.reply(username);
	});

	$('#newTweetDialog').on('shown.bs.modal', function() {
		var $textarea = $('#newTweetDialog #tweetText');

		$textarea.focus();
		$textarea[0].setSelectionRange($scope.message.length, $scope.message.length);
	});

	// Try to get user's location from the browser
	location.locate().then(function(address) {
		$scope.location = address;
	}, function() {
		// Nothing more we can do...
	});
}]);