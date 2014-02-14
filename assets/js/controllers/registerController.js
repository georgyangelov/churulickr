angular.module('churulickr').controller('registerController',
	['$q', '$scope', '$http', 'user', '$rootScope', function($q, $scope, $http, user, $rootScope) {

	$scope.has_error = false;

	$('#registerDialog form').fileupload({
		dataType: 'json',
		acceptFileTypes: /(\.|\/)(jpe?g|png)$/i,
		maxFileSize: 1024 * 1024, // 1MB

		autoUpload: false,
		replaceFileInput: false,

		url: '/user/register',

		add: function(e, data) {
			$scope.fileDataHandle = data;
		}
	});

	$scope.submit = function() {
		if (!$('#registerDialog form').valid()) {
			return;
		}

		if (!$scope.fileDataHandle) {
			return;
		}

		$q.when($scope.fileDataHandle.submit()).then(function() {
			return user.login($scope.username, $scope.password);
		}).then(function(response) {
			$scope.username = $scope.password = $scope.email = '';
			$scope.has_error = false;
			$rootScope.$broadcast('login', response.data);

			$('#registerDialog').modal('hide');
		}, function() {
			$scope.has_error = true;
		});
	};

	$('#registerDialog').on('shown.bs.modal', function() {
		$('#email').focus();
	});
}]);
