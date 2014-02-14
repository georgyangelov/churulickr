angular.module('churulickr').service('tweet', ['$q', '$http', function($q, $http) {
	return {
		new: function(message, location, hashtags) {
			return $http.post('/tweet', {
				message: message,
				location: location,
				hashtags: hashtags
			});
		},

		getAllTweets: function() {
			return $http.get('/tweet/all');
		},

		getTweets: function() {
			return $http.get('/tweet');
		},

		getUserTweets: function(username) {
			return $http.get('/tweet/' + username);
		},

		searchTweets: function(query) {
			return $http.get('/tweet/search/' + query);
		}
	};
}]);