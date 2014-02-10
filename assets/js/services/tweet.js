angular.module('churulickr').service('tweet', ['$q', '$http', function($q, $http) {
	return {
		new: function(message, location) {
			return $http.post('/tweet', {
				message: message,
				location: location
			});
		}
	};
}]);