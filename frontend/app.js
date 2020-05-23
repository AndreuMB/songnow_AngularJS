var songnow = angular.module('songnow', ['ngRoute', 'toastr', 'ui.bootstrap']);
songnow.config(['$routeProvider', '$locationProvider',
function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/contact", {templateUrl: "frontend/modules/contact/view/contact.view.html", controller: "contactCtrl"})
            // .otherwise("/contact", {templateUrl: "frontend/modules/contact/view/contact.view.html", controller: "contactCtrl"})
            // .otherwise("/", {templateUrl: "frontend/modules/home/view/home.view.html", controller: "mainCtrl"});
    }]);
