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
        
        $scope.eventDates = Date.parse(data.events[0].date);
       // console.log($scope.eventDates);
       
       //get next event and store in $scope.nextEvent 
        for (var i = 0; i < (data.events).length; i++) {
       
          var eventDateAsString = data.events[i].date; 
          var eventDate = Date.parse(eventDateAsString, "d/M/yyyy h:mm:ss PM" );
          if(eventDate >= $scope.today) { 
             $scope.nextEvent= data.events[i];
             console.log("Today is: " + Date.today());
             console.log("Event after today is: " + $scope.nextEvent.date);
             console.log(data.events[i]);
             break;
          }       
        }
     });
});

