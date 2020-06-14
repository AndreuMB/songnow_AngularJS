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
                },
                songs: function (services) {
                    return services.post('songs','songs');
                }
            }})
        .when("/songs", {templateUrl: "frontend/modules/songs/view/songs.view.html", controller: "songsCtrl",
            resolve: {
                songs: function (services) {
                    return services.post('songs','songs');
                },
                categories: function (services){
                    return services.post('songs','categories')
                }
                
        }})
        .when("/shop", {templateUrl: "frontend/modules/shop/view/shop.view.html", controller: "shopCtrl",
        resolve: {
            plans: function (services) {
                return services.post('shop','products');
            }            
        }})
        .when("/login", {templateUrl: "frontend/modules/login/view/login.view.html", controller: "loginCtrl",
            resolve: {
                users: function (services) {
                    return services.post('login','data_user');
                }
            }
        })
        .when("/register", {templateUrl: "frontend/modules/login/view/register.view.html", controller: "loginCtrl",
            resolve: {
                    users: function (services) {
                        return services.post('login','data_user');
                    }
                }
        })
        .when("/activate/:token", {templateUrl: "frontend/modules/login/view/activate.view.html", controller: "activateCtrl",
            resolve: {
                    activate: function (services, $route) {
                        return services.post('login','activate', $route.current.params.token);
                    }
                }
        })
        .when("/urpsswd", {templateUrl: "frontend/modules/login/view/urpsswd.view.html", controller: "rpsswdCtrl",
            resolve: {
                users: function (services) {
                    return services.post('login','data_user');
                }
            }
        })
        .when("/rpsswd/:token", {templateUrl: "frontend/modules/login/view/rpsswd.view.html", controller: "rpsswdCtrl",
            resolve: {
                users: function (services) {
                    return services.post('login','data_user');
                }
            }
            // resolve: {
            //     rpsswd: function (services, $route) {
            //         return services.post('login','activate', $route.current.params.token);
            //     }
            // }
        })
        .when("/contact", {templateUrl: "frontend/modules/contact/view/contact.view.html", controller: "contactCtrl"})
        .otherwise("/home", {templateUrl: "frontend/modules/home/view/home.view.html", controller: "homeCtrl",
        resolve: {
                img: function (services) {
                    return services.get('home','carousel');
                },
                categories: function (services) {
                    return services.post('home','categories', 1);
                },
                songs: function (services) {
                    return services.post('songs','songs');
                }
            }})
    }]);
