angular.module('churulickr').controller('applicationController',
	['$rootScope', 'user', function($rootScope, user) {

	$rootScope.logged_in = false;
	$rootScope.user = {};

	function set_user_data(user_data) {
		$rootScope.logged_in = true;
		$rootScope.user = user_data;
	}

	$rootScope.$on('login', function(event, user_data) {
		set_user_data(user_data);
	});

	$rootScope.logout = function() {
		user.logout().success(function() {
			$rootScope.logged_in = false;
			$rootScope.user = {};

			$rootScope.$broadcast('alert', 'success', "Please don't leave me alone... :(");
			$rootScope.$broadcast('logout');
		}).error(function() {
			$rootScope.$broadcast('alert', 'danger', "We couldn't log you out. You'll have to stay here, sorry...");
		});
	};

	$rootScope.reply = function(username) {
		$rootScope.$broadcast('reply', username);
	};

	$rootScope.search = function(tag) {
		$rootScope.$broadcast('search', tag);
	};

	// Check if we are logged in
	user.logged_user_info().success(function(user_data) {
		$rootScope.$broadcast('login', user_data);
	});

}]);