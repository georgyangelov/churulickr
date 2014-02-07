angular.module('churulickr').service('user', ['$q', '$http', function($q, $http) {
	return {
		register: function(email, username, password) {
			return $http.post('/user/register', {
				email: email,
				username: username,
				password: password
			});
		},

		login: function(username, password) {
			return $http.post('/user/login', {
				username: username,
				password: password
			});
		},

		logout: function() {
			return $http.post('/user/logout');
		},

		info: function() {
			return $http.get('/user/info');
		}
	};
}]);