songnow.factory("loginService", ['$rootScope', 'services',
function ($rootScope, services) {
	var service = {};
	service.menu = menu;
    return service;

    function menu() {
    	var token = localStorage.getItem("token_data");
        if (token) {
            services.post('login', 'menu', token).then(function (response) {
                console.log(response);
                if (response[0].type === "client") {
                    console.log(response[0].avatar);
                    $rootScope.login = false;
                    $rootScope.profile = true;
                    $rootScope.logout = true;
                    $rootScope.profile_img = response[0].avatar;
	            } else {
                    console.log(response[0].avatar);
                    $rootScope.login = false;
                    $rootScope.profile = true;
                    $rootScope.logout = true;
	            }
            });
        } else {
            console.log("not log");
            $rootScope.login = true;
            $rootScope.profile = false;
            $rootScope.logout = false;
        }
    }
}]);