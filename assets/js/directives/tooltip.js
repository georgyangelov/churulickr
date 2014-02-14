angular.module('churulickr').directive('tooltip', [function() {
	return {
		restrict: 'A',
		scope: false,
		link: function(scope, elm, attrs) {
			$(elm).tooltip({
				title: attrs.tooltip
			});
		}
	};
}]);