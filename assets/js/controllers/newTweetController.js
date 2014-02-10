var MESSAGE_MAX_LENGTH = 140;

angular.module('churulickr').controller('newTweetController',
	['$scope', 'tweet', function($scope, tweet) {

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

		tweet.new($scope.message, '').then(function() {
			$('#newTweetDialog').modal('hide');
		}, function() {
			$scope.has_error = true;
		});
	}
}]);