// angular.module is a global place for creating, registering and retrieving Angular modules
// 'azZahraa' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'azZahraa.controllers' is found in controllers.js
angular.module('azZahraa', ['ionic', 'azZahraa.controllers', 'ionic.contrib.drawer', 'azZahraa.filters', 'templates', 'ngIOS9UIWebViewPatch', 'ngCordova'])


    .run(function ($ionicPlatform, $cordovaSplashscreen) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }

            //app ready -> remove splashscreen
            setTimeout(function() {
                    $cordovaSplashscreen.hide();
            }, 500);

        });


    })

    //Native scrolling on android (disable during dev or ionic lab breaks)
    .config(function($ionicConfigProvider) {
        if(!ionic.Platform.isIOS())$ionicConfigProvider.scrolling.jsScrolling(false);
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        //code to allow for ios/android menu switch
        var isAndroid = ionic.Platform.isAndroid();
        var menuTemplateUrl = (isAndroid) ? 'templates/menu-android.html' : 'templates/menu-ios.html';

        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: menuTemplateUrl,
                controller: 'AppCtrl'
            })

            .state('app.home', {
                url: '/home',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/home.html'
                    },
                    'ios-tab-home': {
                        templateUrl: 'templates/home.html'
                    }
                }
            })

            .state('app.events', {
                url: '/events',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/events.html'
                    },
                    'ios-tab-events': {
                        templateUrl: 'templates/events.html'
                    }
                }
            })

            .state('app.namaaz', {
                url: '/namaaz',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/namaaz.html'
                    },
                    'ios-tab-namaaz': {
                        templateUrl: 'templates/namaaz.html'
                    }
                }
            })

            .state('app.about', {
                url: '/about',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/about.html'
                    },
                    'ios-tab-about': {
                        templateUrl: 'templates/about.html'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/home');
    });
