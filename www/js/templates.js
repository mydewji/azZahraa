angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("templates/about.html","<ion-view view-title=About><ion-content><div class=card><div class=\"item item-divider\">Az-Zahraa Islamic Centre</div><a href=# class=\"item item-text-wrap\" onclick=\"window.open(\'https://www.google.ca/maps/place/8580+No+5+Rd,+Richmond,+BC+V6Y+2V4\', \'_system\', \'location=yes\'); return false;\"><i class=\"icon ion-android-mail\"></i> 8580 No. 5 Road, Richmond, BC V6V 1Z3</a></div><div class=card><div class=\"item item-divider\">Website</div><a href=# class=\"item item-text-wrap\" onclick=\"window.open(\'http://www.az-zahraa.org\', \'_system\', \'location=yes\'); return false;\"><i class=\"icon ion-link\"></i> az-zahraa.org</a></div><div class=card><div class=\"item item-divider\">Majlis/Event Information</div><a href=# class=\"item item-text-wrap\" onclick=\"window.open(\'tel:+1-604-279-1535\', \'_system\', \'location=yes\'); return false;\"><i class=\"icon ion-android-call\"></i> 604-279-1535</a></div><div class=card><div class=\"item item-divider\">Keeping Connected</div><a href=# class=\"item item-text-wrap\" onclick=\"window.open(\'https://visitor.r20.constantcontact.com/manage/optin/ea?v=001hDXaORE2PUTEy5xqXa4bnw==\', \'_system\', \'location=yes\'); return false;\"><i class=\"icon ion-android-mail\"></i> Subscribe to our email newsletter</a></div></ion-content></ion-view>");
$templateCache.put("templates/events.html","<ion-view view-title=Events><ion-content><ion-refresher pulling-text=\"Pull to refresh...\" refreshing-text=Refreshing! on-refresh=doRefresh()></ion-refresher><div ng-repeat=\"event in events\"><div class=\"list card\"><div class=\"item item-divider\">{{event.title}}</div><div class=\"item item-icon-left\"><i class=\"icon ion-ios-clock-outline\"></i> {{event.date | formatNextEventDate }}</div><div class=\"item item-icon-left item-text-wrap\"><i class=\"icon ion-edit\"></i> {{event.description | formatDescription}}</div></div></div></ion-content></ion-view>");
$templateCache.put("templates/home.html","<ion-view view-title=Home><ion-content><ion-refresher pulling-text=\"Pull to refresh...\" refreshing-text=Refreshing! on-refresh=doRefresh()></ion-refresher><div class=card><div class=\"item item-divider\">Today\'s Islamic Date</div><div class=\"item item-text-wrap\"><i class=\"icon ion-ios-clock-outline\"></i> {{todayIslamicDate}}</div></div><div class=\"list card\"><div class=\"item item-divider\">Namaaz</div><div class=\"item item-icon-left\" ng-show=showImsaac><i class=\"icon ion-ios-moon-outline\"></i> Ihtiyat : {{todayImsaac | getTime}}</div><div class=\"item item-icon-left\" ng-show=showFajr><i class=\"icon icon-prayer\"></i> Fajr: {{todayFajr | getTime}}</div><div class=\"item item-icon-left\" ng-show=showSunrise><i class=\"icon ion-android-sunny\"></i> Sunrise: {{todaySunrise | getTime}}</div><div class=\"item item-icon-left\" ng-show=showZuhr><i class=\"icon icon-prayer\"></i> Zuhr: {{todayZuhr | getTime}}</div><div class=\"item item-icon-left\" ng-show=showSunset><i class=\"icon ion-android-sunny\"></i> Sunset: {{todaySunset | getTime}}</div><div class=\"item item-icon-left\" ng-show=showMaghrib><i class=\"icon icon-prayer\"></i> Maghrib: {{todayMaghrib | getTime}}</div></div><div class=\"list card\"><div class=\"item item-divider\">Next Event</div><div class=\"item item-icon-left\"><i class=\"icon ion-ios-calendar-outline\"></i> {{nextEvent.title}}</div><div class=\"item item-icon-left\"><i class=\"icon ion-ios-clock-outline\"></i> {{nextEvent.date | formatNextEventDate }}</div><div class=\"item item-icon-left item-text-wrap\"><i class=\"icon ion-edit\"></i> {{nextEvent.description | formatDescription}}</div><div class=\"item item-icon-left item-text-wrap\" ng-click=\"confirmAddEvent( nextEvent.title, nextEvent.date, nextEvent.description )\"><i class=\"icon ion-android-add-circle\"></i> Add to Calendar</div></div></ion-content></ion-view>");
$templateCache.put("templates/menu-android.html","<ion-side-menus enable-menu-with-back-views=false><ion-side-menu-content><ion-nav-bar class=bar-positive><ion-nav-back-button></ion-nav-back-button><ion-nav-buttons side=left><button class=\"button button-icon button-clear ion-android-menu\" menu-toggle=left ng-click=toggleDrawer()></button></ion-nav-buttons></ion-nav-bar><ion-nav-view name=menuContent></ion-nav-view></ion-side-menu-content><drawer side=left><ion-content><ion-list><div class=header-image><img src=img/headerImage.png style=width:100%;height:175px;></div><ion-item menu-close nav-state ng-click=closeDrawer() ui-sref=app.home><i class=\"icon ion-android-home\"></i> Home</ion-item><ion-item menu-close nav-state ng-click=closeDrawer() ui-sref=app.events><i class=\"icon ion-android-calendar\"></i> Events</ion-item><ion-item menu-close nav-state ng-click=closeDrawer() ui-sref=app.namaaz><i class=\"icon icon-prayer\"></i> Namaaz</ion-item><ion-item menu-close nav-state ng-click=closeDrawer() ui-sref=app.about><i class=\"icon ion-information-circled\"></i> About</ion-item></ion-list></ion-content></drawer></ion-side-menus>");
$templateCache.put("templates/menu-ios.html","<ion-nav-bar class=\"bar bar-positive\"><ion-nav-back-button></ion-nav-back-button></ion-nav-bar><ion-tabs class=\"tabs-icon-top tabs-color-active-positive\"><ion-tab title=Home icon-off=ion-ios-home-outline icon-on=ion-ios-home ui-sref=app.home><ion-nav-view name=ios-tab-home></ion-nav-view></ion-tab><ion-tab title=Events icon-off=ion-ios-calendar-outline icon-on=ion-ios-calendar ui-sref=app.events><ion-nav-view name=ios-tab-events></ion-nav-view></ion-tab><ion-tab title=Namaaz icon-off=icon-prayer icon-on=icon-prayer ui-sref=app.namaaz><ion-nav-view name=ios-tab-namaaz></ion-nav-view></ion-tab><ion-tab title=About icon-off=ion-ios-information-outline icon-on=ion-ios-information ui-sref=app.about><ion-nav-view name=ios-tab-about></ion-nav-view></ion-tab></ion-tabs>");
$templateCache.put("templates/namaaz.html","<ion-view view-title=Namaaz><ion-content><div class=\"list card\"><div class=\"item item-divider\">Today\'s Namaaz timings</div><div class=\"item item-icon-left\"><i class=\"icon ion-ios-moon-outline\"></i> Ihtiyat : {{todayImsaac | getTime}}</div><div class=\"item item-icon-left\"><i class=\"icon icon-prayer\"></i> Fajr: {{todayFajr | getTime}}</div><div class=\"item item-icon-left\"><i class=\"icon ion-android-sunny\"></i> Sunrise: {{todaySunrise | getTime}}</div><div class=\"item item-icon-left\"><i class=\"icon icon-prayer\"></i> Zuhr: {{todayZuhr | getTime}}</div><div class=\"item item-icon-left\"><i class=\"icon ion-android-sunny\"></i> Sunset: {{todaySunset | getTime}}</div><div class=\"item item-icon-left\"><i class=\"icon icon-prayer\"></i> Maghrib: {{todayMaghrib | getTime}}</div></div><div class=card><div class=\"item item-divider\">Monthly Namaaz Timings</div><a href=# class=\"item item-text-wrap\" onclick=\"window.open(\'http://az-zahraa.org/salaat_timings.asp\', \'_system\', \'location=yes\'); return false;\"><i class=\"icon ion-link\"></i>View full timings</a></div></ion-content></ion-view>");}]);