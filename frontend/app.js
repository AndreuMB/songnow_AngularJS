var songnow = angular.module('songnow', ['ngRoute', 'toastr', 'ui.bootstrap', 'angularUtils.directives.dirPagination']);
songnow.config(['$routeProvider', '$locationProvider',
function ($routeProvider, $locationProvider) {
        $routeProvider
        .when("/home", {templateUrl: "frontend/modules/home/view/home.view.html", controller: "homeCtrl",
        resolve: {
                img: function (services) {
                    return services.get('home','carousel');
                },
                categories: function (services) {
                    return services.post('home','categories', 1);
                }
            }})
        .when("/songs", {templateUrl: "frontend/modules/songs/view/songs.view.html", controller: "songsCtrl",
            resolve: {
                songs: function (services) {
                    return services.post('songs','songs');
                }
        }})
        .when("/contact", {templateUrl: "frontend/modules/contact/view/contact.view.html", controller: "contactCtrl"})
        .otherwise("/home", {templateUrl: "frontend/modules/home/view/home.view.html", controller: "homeCtrl"});
    }]);
