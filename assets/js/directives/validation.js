angular.module('churulickr').directive('validate', [function() {
	return {
		restrict: 'A',
		scope: false,
		link: function(scope, elm, attrs) {
			if( attrs.validate == 'login') {
				obj = {};
			} else {
				obj = {
					rules: {
						email: {
							remote: {
								url: '/user/email_taken', 
								type: 'get'
							}
						},
						username: {
							remote: {
								url: '/user/username_taken',
								type: 'get'
							}
						}
					}, 
					messages: {
						email: {
							remote: 'You are a scammer!'
						},
						username: {
							remote: 'You are an idiot!'
						}
					}
				};
			}
			$(elm[0]).validate(obj);
		}
	};
}]);