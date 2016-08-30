var myApp = angular.module('myApp',[]);

myApp.controller('ServicesCtrl',['$scope','$http',function($scope,$http){
	
	$scope.create = function() {
		console.log($scope.serviceClient);
		$http.post("/serviceClients",$scope.serviceClient).success(function(response){
			$scope.all();
		});
	};
	
	
	$scope.renderServiceClients = function(response){
		$scope.serviceClients = response;
	};
	
	$scope.remove = function(id) {
		$http.delete("/serviceClients/" + id).success(function(response){
			$scope.all();
		});
	};
	
	$scope.select = function(id) {
		$http.get("/serviceClients/" + id).success(function(response){
			$scope.serviceClient = response;
		});
	};
	
	$scope.update = function() {
		$http.put("/serviceClients/" + $scope.serviceClient._id + "/" + $scope.serviceClient.name).success(function (response) {
			$scope.all();
		});
	};
	
	
	//get all of them
	$scope.all = function() {
	$http.get("/serviceClients").success($scope.renderServiceClients);
	};
	
	$scope.all();
}]);

