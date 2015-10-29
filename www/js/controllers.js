var app = angular.module('azZahraa.controllers', ['azZahraa.services'])

    .controller('AppCtrl', function ($scope, $http, dataService, $interval, $cordovaCalendar, $filter, $ionicPopup) {


        //set default nextEvent (title, date, description)
        $scope.nextEvent = {
            title: "Could not fetch event",
            date: new moment("invalid date"),
            description: "Could not fetch event description, please check your network connection"
        };

        //set default events
        $scope.events = {
            0: $scope.nextEvent
        };

        //set default calendarOffset
        $scope.calendarOffset = 0;

        //get current time
        getCurrentTime($scope);

        getSalaatTimes($scope);

        //Decide what to display on home screen for namaaz times
        setBooleans($scope);

        //update from az-zahraa.org
        getData($scope, dataService);


        //Todays islamic date
        getIslamicDate($scope);



        $scope.confirmAddEvent = function($eventTitle, $eventDate, $eventDescription) {
            //make sure is not invalid event
            $invalidEventTitle = "Could not fetch event";
            if($eventTitle == $invalidEventTitle) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Could not add event',
                        template: 'Something went wrong. Please ensure you have a valid network connection and refresh the app.'
                    });
            }
            //else valid event -> ask user if you want to add
            else {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Add event',
                    template: 'Are you sure you want to add "' + $eventTitle + '" to your calendar?'
                });
                confirmPopup.then(function(res) {
                    if(res) {
                        addEvent($cordovaCalendar, $filter, $eventTitle, $eventDate, $eventDescription);
                    }
                });
            }
        };


        $scope.update = $interval(function() {
            refreshEverything($scope, dataService);
        }, 30000);

        $scope.doRefresh = function() {

            refreshEverything($scope, dataService);

            //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');

        }

    });

function refreshEverything($scope, dataService){
    //get current time
    getCurrentTime($scope);

    getSalaatTimes($scope);

    //Decide what to display on home screen for namaaz times
    setBooleans($scope);

    //update from az-zahraa.org
    getData($scope, dataService);


    //Todays islamic date
    getIslamicDate($scope);
}

function getData($scope, dataService){
    var promise = dataService.getJson();
    promise.then(function(json){
        $scope.jsonData = json.data;

        $scope.events = $scope.jsonData.events;
        $scope.calendarOffset = $scope.jsonData.calendarOffset;

        $scope.evenDates =  Date.parse($scope.jsonData.events[0].date);

        //add 3h to current time so event doesn't disappear whilst event is going on
        $scope.timeForCurrentEvent = $scope.currentTime.add(3, 'h');
        ////get next event and store in $scope.nextEvent
        for (var i = 0; i < ($scope.jsonData.events).length; i++) {

            var eventDateAsString = $scope.jsonData.events[i].date;
            var eventDate = moment(eventDateAsString, "D/M/yyyy h:mm:ss A").add(5, 'h');
            if (eventDate.isAfter($scope.timeForCurrentEvent)) {
                $scope.nextEvent = $scope.jsonData.events[i];
                break;
            }
        }
    });
}

function setBooleans($scope)
{
    //Set default
    $scope.showImsaac = false;
    $scope.showSunrise = false;
    $scope.showFajr = false;
    $scope.showZuhr = false;
    $scope.showSunset = false;
    $scope.showMaghrib = false;

    //Case 0: midnight -> sunrise = show ihtiyat + fajr + sunrise
    var todayMidnight = new moment().startOf('day');
    var now = $scope.currentTime;
    if (now.isBetween( todayMidnight , $scope.todaySunrise))
    {
        $scope.showImsaac = true;
        $scope.showFajr = true;
        $scope.showSunrise = true;
    }

    //Case 1: sunrise -> sunset = show zuhr + sunset + maghrib
    if ($scope.currentTime.isBetween($scope.todaySunrise , $scope.todaySunset))
    {
        $scope.showZuhr = true;
        $scope.showSunset = true;
        $scope.showMaghrib = true;
    }

    //Case 2: sunset -> midnight = show maghrib
    var tomorrowMidnight = new moment().endOf('day');
    if ($scope.currentTime.isBetween($scope.todaySunset , tomorrowMidnight))
    {
        $scope.showMaghrib = true;
    }
}

function getCurrentTime($scope)
{
    $scope.currentTime = new moment();
}

function getIslamicDate ($scope)
{
    var islamicDateOffset = $scope.calendarOffset - 1;
    $scope.todayIslamicDate = writeIslamicDate(islamicDateOffset);
}

function getSalaatTimes($scope)
{
    //Salaat times from SalaatTimes.js - TODO refactor SalaatTimes.js to not be horrible (https://stackoverflow.com/questions/8228281/what-is-the-function-construct-in-javascript)
    $scope.todayImsaac = moment(window.todaysTimeImsaac).add(1900, 'y');
    $scope.todaySunrise = moment(window.todaysTimeRise).add(1900, 'y');
    $scope.todayFajr = moment(window.todaysTimeFajr).add(1900, 'y');
    $scope.todayZuhr = moment(window.todaysTimeZuhr).add(12, 'h').add(1900, 'y');
    $scope.todaySunset = moment(window.todaysTimeSet).add(12, 'h').add(1900, 'y');
    $scope.todayMaghrib = moment(window.todaysTimeMaghrib).add(12, 'h').add(1900, 'y');
}

function addEvent($cordovaCalendar, $filter, $eventTitle, $eventDate, $eventDescription)
{
    console.log("add event");
    $cordovaCalendar.createEventInteractively({
        title: $eventTitle,
        location: '8580 No 5 Rd, Richmond, BC, Canada',
        notes: $filter('formatDescription')($eventDescription),
        startDate: new moment($eventDate, "D/M/yyyy h:mm:ss A").toDate(),
        endDate: new moment($eventDate, "D/M/yyyy h:mm:ss A").add(3,'h').toDate()
    }).then(function (result) {
        console.log("Add successful");
    }, function (err) {
        console.log("Error: "+ err);
    });
}

