angular.module('azZahraa.filters', [])

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
            var stringDateFormatted = momentDate.format("h:mm");
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
            if (description != "Could not fetch event description, please check your network connection") {
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
    });

