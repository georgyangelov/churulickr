angular.module('churulickr').service('user', ['$q', '$http', function($q, $http) {
	return {
		register: function(email, fullname, username, password, avatar) {
			return $http.post('/user/register', {
				email: email,
				fullname: fullname,
				username: username,
				password: password,
				avatar: avatar
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

		info: function(username) {
			return $http.get('/user/info/' + username);
		},

		logged_user_info: function() {
			return $http.get('/user/logged_user_info');
		},

		follow: function(username) {
			return $http.post('/user/follow/' + username);
		},

		unfollow: function(username) {
			return $http.post('/user/unfollow/' + username);
		},

		verify: function(username) {
			return $http.post('/user/verify/' + username);
		},

		unverify: function(username) {
			return $http.post('/user/unverify/' + username);
		},

		remove: function(username) {
			return $http.post('/user/remove/' + username);
		}
	};
}]);