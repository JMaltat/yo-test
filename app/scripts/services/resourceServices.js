'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
var serviceModule = angular.module('resourceServices', ['ngResource']);
serviceModule.value('version', '0.1');
serviceModule.factory('DataObject', function($resource, $cacheFactory, UuidGenerator) {
	var cache = $cacheFactory('DataObject');
	var InternDataObject = $resource('http://localhost:port/rest/rest/:type/:id', {
		port : ':8083',
		type : '@persons',
		id : '@id'
	});
	return {
		get : function(key) {
			console.log(key.type + ' / ' + key.id);
			var stringKey = key.type + '/' + key.id;
			var dataObject = cache.get(stringKey);
			console.log('get - cache : ' + dataObject);
			if (!dataObject) {
				dataObject = InternDataObject.get(key);
				console.log('get : ' + dataObject);
				cache.put(stringKey, dataObject);
			}
			return dataObject;
		},
		query : function(type) {
			console.log(type);
			var dataObjects = cache.get('' + type.type);
			console.log('query - cache : ' + dataObjects);
			if (!dataObjects) {
				dataObjects = InternDataObject.query(type, function() {
					for (var dataObject in dataObjects) {
						console.log('query - building cache : ' + dataObjects[dataObject]);
						console.log('type : ' + type.type + ' / id : ' + dataObjects[dataObject]._id);
						cache.put(type.type + '/' + dataObjects[dataObject]._id, dataObjects[dataObject]);
						console.log(cache.info());
					}
					cache.put('' + type.type, dataObjects);
					console.log(cache.info());
				});
			}
			return dataObjects;
		},
		create : function(type) {
			var result = new InternDataObject({
				_id : UuidGenerator.random()
			});
			cache.put(type.type+'/'+result._id, result);
			var results = cache.get(''+type.type);
			if(results){
				results.push(result);
			}else{
				cache.put(''+type.type, result);
			}
			return result;
		},
		$delete : function(key){
			cache.remove(key.type+'/'+key.id);
			return InternDataObject.$delete(key);
		}
	};
});
