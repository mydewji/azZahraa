var app = angular.module('azZahraa.controllers', [])

    .filter('castStringToDate', function () {
        return function (stringDate) {
            //realDate = Date.parse(stringDate, "d/M/yyyy h:mm:ss PM" );
            var realDate = moment(stringDate, "D/M/yyyy h:mm:ss A");
            return realDate;
        };
    })

    .filter('formatNextEventDate', function () {
        return function (stringDate) {
            var stringDateFormatted = moment(stringDate, "D/M/yyyy h:mm:ss A").format('dddd MMMM Do h:mm a')
            return stringDateFormatted;
        };
    })

    .filter('getTime', function () {
        return function (momentDate) {
            var stringDateFormatted = momentDate.format("h:mm a");
            return stringDateFormatted;
        };
    })

    .filter('getTime2', function () {
        return function (momentDate) {
            var stringDateFormatted = momentDate.format("MMM Do YYYY h:mm a");
            return stringDateFormatted;
        };
    })

    .filter('formatDescription', function () {
        return function (description) {
            if (description != "Could not fetch next event description") {
                description = unescape(description);
                description = angular.element(description).text();
                description = description.replace(/\+/g, " ");
            }
            return description;
        };
    })

    .filter('htmlToPlainText', function () {
        return function (text) {
            return angular.element(text).text();
        };
    })

    .controller('AppCtrl', function ($scope, $http) {
        $scope.currentTime = new moment();

        //Salaat times from SalaatTimes.js - TODO refactor SalaatTimes.js to not be horrible (https://stackoverflow.com/questions/8228281/what-is-the-function-construct-in-javascript)
        $scope.todayImsaac = moment(window.todaysTimeImsaac).add(1900, 'y');
        $scope.todaySunrise = moment(window.todaysTimeRise).add(1900, 'y');
        $scope.todayFajr = moment(window.todaysTimeFajr).add(1900, 'y');
        $scope.todayZuhr = moment(window.todaysTimeZuhr).add(12, 'h').add(1900, 'y');
        $scope.todaySunset = moment(window.todaysTimeSet).add(12, 'h').add(1900, 'y');
        $scope.todayMaghrib = moment(window.todaysTimeMaghrib).add(12, 'h').add(1900, 'y');

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

        //set default nextEvent (title, date, description)
        $scope.nextEvent = {
            title: "Could not fetch next event",
            date: "Could not fetch next event date",
            description: "Could not fetch next event description"
        };

        //set default calendarOffset
        $scope.calendarOffset = 0;

        // json url = "http://az-zahraa.org/GetEvents.asp"
        url = "http://az-zahraa.org/GetEvents.asp"
        $http.get(url)
            .success(function (data) {
                $scope.events = data.events;
                $scope.calendarOffset = data.calendarOffset;

                $scope.eventDates = Date.parse(data.events[0].date);
                // console.log($scope.eventDates);

                //get next event and store in $scope.nextEvent
                for (var i = 0; i < (data.events).length; i++) {

                    var eventDateAsString = data.events[i].date;
                    var eventDate = moment(eventDateAsString, "D/M/yyyy h:mm:ss A");
                    if (eventDate.isAfter($scope.today)) {
                        $scope.nextEvent = data.events[i];
                        //console.log("Today is: " + moment());
                        //console.log("Event after today is: " + $scope.nextEvent.date);
                        //console.log(data.events[i]);
                        break;
                    }
                }
            });

        //Todays islamic date
        var islamicDateOffset = $scope.calendarOffset - 1;
        $scope.todayIslamicDate = writeIslamicDate(islamicDateOffset);
    });

