var app = angular.module('azZahraa.controllers', [])

.filter('castStringToDate', function() {
  return function(stringDate) {
    realDate = Date.parse(stringDate, "d/M/yyyy h:mm:ss PM" );
    return realDate;
  };
})

.controller('AppCtrl', function($scope, $http) {
    $scope.today = new Date();

    // json url = "http://az-zahraa.org/GetEvents.asp"
    url = "http://az-zahraa.org/GetEvents.asp"
    $http.get(url)
    .success(function(data) {
        $scope.events = data.events;
        $scope.calendarOffset = data.calendarOffset;
        });

});

