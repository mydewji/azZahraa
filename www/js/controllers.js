var app = angular.module('starter.controllers', []) 



.controller('AppCtrl', function($scope, $http) { 
    $scope.date = new Date();

    // json url = "http://az-zahraa.org/GetEvents.asp"
    url = "http://az-zahraa.org/GetEvents.asp"
    // $http.get(url)
    // .success(function(data) {console.log(data)});
    
    $http.get(url)
    .success(function(data) {$scope.events = data.events;});
    
});







