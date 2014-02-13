angular.module('churulickr').service('location', ['$q', '$http', function($q, $http) {
	return {
		locate: function() {
			var deferred = $q.defer();

			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(location) {
					var latlng = location.coords.latitude + ',' + location.coords.longitude;

					// Get address for these coordinates
					$http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latlng + '&sensor=false').then(function(data) {
						address_results = data.data.results;

						if (address_results.length == 0) {
							deferred.reject('Google Maps doesn\'t know this address');
							return;
						}

						// Use just the city and country, no need to be more specific than that
						var address = _.find(address_results, function(address) {
							return _.contains(address.types, 'locality') &&
								   _.contains(address.types, 'political');
						});

						if (address) {
							deferred.resolve(address.formatted_address);
						} else {
							deferred.resolve(address_results[0].formatted_address);
						}
					}, function(error) {
						deferred.reject(error);
					});
				});
			} else {
				deferred.reject('No geolocation support in browser');
			}

			return deferred.promise;
		}
	};
}]);