var app = angular.module('azZahraa.controllers', ['azZahraa.services'])

    .controller('AppCtrl', function ($scope, $http, dataService) {
        $scope.currentTime = new moment();

        //Salaat times from SalaatTimes.js - TODO refactor SalaatTimes.js to not be horrible (https://stackoverflow.com/questions/8228281/what-is-the-function-construct-in-javascript)
        $scope.todayImsaac = moment(window.todaysTimeImsaac).add(1900, 'y');
        $scope.todaySunrise = moment(window.todaysTimeRise).add(1900, 'y');
        $scope.todayFajr = moment(window.todaysTimeFajr).add(1900, 'y');
        $scope.todayZuhr = moment(window.todaysTimeZuhr).add(12, 'h').add(1900, 'y');
        $scope.todaySunset = moment(window.todaysTimeSet).add(12, 'h').add(1900, 'y');
        $scope.todayMaghrib = moment(window.todaysTimeMaghrib).add(12, 'h').add(1900, 'y');

        setBooleans($scope);

        //set default nextEvent (title, date, description)
        $scope.nextEvent = {
            title: "Could not fetch next event",
            date: "Could not fetch next event date",
            description: "Could not fetch next event description"
        };

        //set default calendarOffset
        $scope.calendarOffset = 0;

        //getData($scope, $http);
        getData2($scope, dataService);


        //Todays islamic date
        var islamicDateOffset = $scope.calendarOffset - 1;
        $scope.todayIslamicDate = writeIslamicDate(islamicDateOffset);

        $scope.doRefresh = function() {
            //DO REFRESH
            //update to current time!
            $scope.currentTime = new moment();

            setBooleans($scope);

            //GET EVENTS
            //getData($scope, $http);
            getData2($scope, dataService);
            //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');

        }

    });

function getData($scope, $http){
    url = "http://az-zahraa.org/GetEvents.asp"
    $http.get(url)
        .success(function (data) {
            $scope.events = data.events;
            $scope.calendarOffset = data.calendarOffset;

            $scope.eventDates = Date.parse(data.events[0].date);

            //get next event and store in $scope.nextEvent
            for (var i = 0; i < (data.events).length; i++) {

                var eventDateAsString = data.events[i].date;
                var eventDate = moment(eventDateAsString, "D/M/yyyy h:mm:ss A").add(5, 'h');
                if (eventDate.isAfter($scope.currentTime)) {
                    $scope.nextEvent = data.events[i];
                    break;
                }
            }
        });
}

function getData2($scope, dataService){
    var promise = dataService.getJson();
    promise.then(function(json){
        $scope.jsonData = json.data;
        console.log($scope.jsonData);

        $scope.events = $scope.jsonData.events;
        $scope.calendarOffset = $scope.jsonData.calendarOffset;

        $scope.evenDates =  Date.parse($scope.jsonData.events[0].date);

        ////get next event and store in $scope.nextEvent
        for (var i = 0; i < ($scope.jsonData.events).length; i++) {

            var eventDateAsString = $scope.jsonData.events[i].date;
            var eventDate = moment(eventDateAsString, "D/M/yyyy h:mm:ss A").add(5, 'h');
            if (eventDate.isAfter($scope.currentTime)) {
                $scope.nextEvent = $scope.jsonData.events[i];
                break;
            }
        }
    });
}

function setBooleans ($scope)
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

    //Case 1: sunrise -> sunset = show zuhr + sunset
    if ($scope.currentTime.isBetween($scope.todaySunrise , $scope.todaySunset))
    {
        $scope.showZuhr = true;
        $scope.showSunset = true;
    }

    //Case 2: sunset -> midnight = show maghrib
    var tomorrowMidnight = new moment().endOf('day');
    if ($scope.currentTime.isBetween($scope.todaySunset , tomorrowMidnight))
    {
        $scope.showMaghrib = true;
    }
}

//function setBooleans2 ($scope)
//{
//    $scope.showImsaac = true;
//    $scope.showSunrise = true;
//    $scope.showFajr = true;
//    $scope.showZuhr = true;
//    $scope.showSunset = true;
//    $scope.showMaghrib = true;
//}