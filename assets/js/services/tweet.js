angular.module('churulickr').service('tweet', ['$q', '$http', '$routeParams', function($q, $http, $routeParams) {
	return {
		new: function(message, location) {
			return $http.post('/tweet', {
				message: message,
				location: location
			});
		},

		getAllTweets: function() {
			return $http.get('/tweet/all');
		},

		getTweets: function() {
			return $http.get('/tweet');
		},

		getUserTweets: function(user_id) {
			return $http.get('/tweet/' + $routeParams.username)
		}
	};
}]);