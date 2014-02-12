angular.module('churulickr').service('socket', [function() {
	return {
		connect: function(url, onopen, onmessage, onclose) {
			var socket = new WebSocket('ws://' + window.location.host + '/' + url);

			socket.onopen = function() {
				if (onopen) {
					onopen(socket);
				}
			};

			socket.onmessage = function(message) {
				if (onmessage) {
					onmessage(socket, JSON.parse(message.data), message);
				}
			};

			socket.onclose = function() {
				if (onclose) {
					onclose(socket);
				}
			};
		}
	};
}]);