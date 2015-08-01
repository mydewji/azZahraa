var app = angular.module('azZahraa.controllers', [])

.filter('castStringToDate', function() {
  return function(stringDate) {
    //realDate = Date.parse(stringDate, "d/M/yyyy h:mm:ss PM" );
    var realDate = moment(stringDate,"D/M/yyyy h:mm:ss A");
    return realDate;
  };
})

.filter('formatDate', function() {
  return function(stringDate) {
    var stringDateFormatted = stringDate.format("D/M/YYYY");
    return stringDateFormatted;
  };
})

.filter('getTime', function() {
  return function(stringDate) {
    var stringDateFormatted = stringDate.format("h:mm a");
    return stringDateFormatted;
  };
})

.filter('formatDescription', function() {
  return function(description) {
    description = unescape(description);
    description = angular.element(description).text();
    description = description.replace(/\+/g, " ");
    return description ;
  };
})

.filter('htmlToPlainText', function() {
  return function(text) {
    return angular.element(text).text();
  };
})

.controller('AppCtrl', function($scope, $http) {
    $scope.today = new moment();
    
    //Salaat times from SalaatTimes.js - TODO refactor SalaatTimes.js to not be horrible
    $scope.todaySunrise = moment(window.todaysTimeRise);
    $scope.todayFajr = moment(window.todaysTimeFajr);
    $scope.todayZuhr = moment(window.todaysTimeZuhr);
    $scope.todaySunset = moment(window.todaysTimeSet);
    $scope.todayMaghrib = moment(window.todaysTimeMaghrib);
    
    
    
    //Salaat times helper TODO
    
 
   

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
          var eventDate = moment(eventDateAsString,"D/M/yyyy h:mm:ss A");
          if(eventDate.isAfter($scope.today)) { 
             $scope.nextEvent= data.events[i];
             //console.log("Today is: " + moment());
             //console.log("Event after today is: " + $scope.nextEvent.date);
             //console.log(data.events[i]);
             break;
          }       
        }
        
       //Todays islamic date
       $scope.todayIslamicDate = writeIslamicDate(-1);
     });
});

