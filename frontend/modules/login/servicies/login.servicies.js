songnow.factory("loginService", ['$rootScope', 'services',
function ($rootScope, services) {
	var service = {};
    service.menu = menu;
    service.initialize = initialize;
    return service;

    function menu() {
        var token = localStorage.getItem("token_data");
        console.log("token=" + token)
        if (token) {
            services.post('login', 'menu', token).then(function (response) {
                console.log(response);
                if (response[0].type === "client") {
                    console.log(response[0].avatar);
                    $rootScope.login = false;
                    $rootScope.profile = true;
                    $rootScope.username=response[0].username;
                    $rootScope.logout = true;
                    $rootScope.profile_img = response[0].avatar;
	            } else {
                    console.log(response[0].avatar);
                    $rootScope.login = false;
                    $rootScope.profile = true;
                    $rootScope.logout = true;
                    $rootScope.profile_img = response[0].avatar;
	            }
            });
        } else {
            console.log("not log");
            $rootScope.login = true;
            $rootScope.profile = false;
            $rootScope.logout = false;
        }
    }
    function initialize(){
        var config = {
            apiKey: apikeyfirebase,
            authDomain: "slogin-98ab5.firebaseapp.com",
            databaseURL: "https://slogin-98ab5.firebaseio.com",
            projectId: "slogin-98ab5",
            storageBucket: "",
            messagingSenderId: "896016190332"
          };
         
        firebase.initializeApp(config);
    }
}]);