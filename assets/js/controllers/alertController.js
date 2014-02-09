angular.module('churulickr').controller('alertController',
	['$scope', function($scope) {

	$scope.default_timeout = 4000;
	$scope.alerts = [];

	function create_alert(event, type, message, timeout) {
		var alert = {
			type: 'alert-' + type,
			message: message
		};

		if (typeof timeout === 'undefined') {
			timeout = $scope.default_timeout;
		}

		$scope.alerts.unshift(alert);

		if (timeout > 0) {
			setTimeout(function() {
				var index = $scope.alerts.indexOf(alert);

				if (index >= 0) {
					$scope.alerts.splice(index, 1);
				}
			}, timeout);
		}
	}

	function clear_alerts(event) {
		$scope.alerts = [];
	}

	$scope.$on('alert', create_alert);
	$scope.$on('clear_alerts', clear_alerts);
}]);