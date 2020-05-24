var songnow = angular.module('songnow', ['ngRoute', 'toastr', 'ui.bootstrap']);
songnow.config(['$routeProvider', '$locationProvider',
function ($routeProvider, $locationProvider) {
        $routeProvider
        .when("/home", {templateUrl: "frontend/modules/home/view/home.view.html", controller: "homeCtrl",
        resolve: {
                img: function (services) {
                    return services.get('home','carousel');
                },
                bbreeds: function (services) {
                    return services.get('home','best_breed');
                }
            }})
        .when("/contact", {templateUrl: "frontend/modules/contact/view/contact.view.html", controller: "contactCtrl"})
        .otherwise("/", {templateUrl: "frontend/modules/home/view/home.view.html", controller: "homeCtrl"});
    }]);
