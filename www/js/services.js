angular.module('azZahraa.services', [])


    .service('dataService', function ($http, $q) {

        var deferred = $q.defer();
        var jsonUrl = "http://az-zahraa.org/GetEvents.asp";
        $http.get(jsonUrl).then(function (json){
            deferred.resolve(json);
        });
        this.getJson = function(){
            return deferred.promise;
        };
    });
