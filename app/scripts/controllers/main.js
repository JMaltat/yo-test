'use strict';

var myModule = angular.module('myApp');
myModule.controller('PersonEditCtrl', function($scope, $routeParams, $location, DataObject) {
	if ($routeParams.personId) {
		console.log($routeParams);
		$scope.personToEdit = DataObject.get({
			type : 'persons',
			id : $routeParams.personId
		});
	} else {
		$scope.personToEdit = DataObject.create({type : 'persons'});
	}

	$scope.goHome = function goHome() {
		$location.path('');
	}

	$scope.savePerson = function savePerson() {
		console.log($scope.personToEdit);
		$scope.personToEdit.$save({
			type : 'persons'
		}, $scope.goHome());
	};
});
myModule.controller('PersonViewCtrl', function($scope, $location, DataObject) {
	$scope.tableHeads = ['nom', 'prenom', 'age', 'actions'];
	$scope.orderProp = 'nom';
	$scope.fullPersons = DataObject.query({
		type : 'persons'
	});
	$scope.order = function order(propName) {
		$scope.orderProp = propName;
	}
	$scope.select = function select(selectedPerson) {
		$location.path('/editPerson/' + selectedPerson._id);
	}
	$scope.create = function create() {
		$location.path('/editPerson')
	}
	$scope.del = function del(selectedPerson) {
		selectedPerson.$delete({
			type : 'persons',
			id : selectedPerson._id
		}, function() {
			var index = $scope.fullPersons.indexOf(selectedPerson);
			$scope.fullPersons.splice(index, 1);
		});
	}
});
