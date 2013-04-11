'use strict';

var myApp = angular.module('myApp', ['resourceServices']);
myApp.config(function($routeProvider) {
	$routeProvider.when('/editPerson', {
		templateUrl : 'views/PersonEdit.html',
		controller : 'PersonEditCtrl'
	});
	$routeProvider.when('/editPerson/:personId', {
		templateUrl : 'views/PersonEdit.html',
		controller : 'PersonEditCtrl'
	});
	$routeProvider.when('/', {
		templateUrl : 'views/PersonView.html',
		controller : 'PersonViewCtrl'
	});
	$routeProvider.otherwise({
		redirectTo : '/'
	});
});
myApp.factory('UuidGenerator', function() {
	return {
		random : function random() {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			});
		}
	};
});
