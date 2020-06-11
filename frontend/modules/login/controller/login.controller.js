songnow.controller('loginCtrl', function($scope,services,toastr,users, loginService){
    console.log("login");

    $scope.register = {
        username: "",
        email: "",
        password: "",
        password2 : ""
    }
    $scope.login = {
        username: "",
        password: ""
    }

    $scope.submitRegister = function () {
        console.log($scope.register['password']);
        $scope.IsMatch=false;
        $scope.found=false;
        if ($scope.register['password'] != $scope.register['password2']) {
            $scope.IsMatch=true;
            return;
        }
        console.log(users);
        var found = users.find(function(element) { 
            return element.idusers === $scope.register.username;
        });
        console.log(found);
        if (found){
            $scope.found=true;
            return;
        }
        var data = {"username": $scope.register.username, "email": $scope.register.email, 
        "psswd": $scope.register.password};
        console.log(data);
        services.post('login', 'register', data).then(function (response) {
            console.log(response);
            if (response == "true") {
                    toastr.success('El mensaje ha sido enviado correctamente', 'Mensaje enviado',{
                    closeButton: true
                });
                window.location.href = "http://localhost/songnow_AngularJS/#/login";
            } else {
                    toastr.error('El mensaje no se ha enviado', 'Mensaje no enviado',{
                    closeButton: true
                });
            }
        });
    };

    $scope.submitLogin = function () {
        console.log("register");
        $scope.found=false;
        var found = users.find(function(element) { 
            return element.idusers === $scope.login.username;
        });
        console.log(found);
        if (!found){
            $scope.found=true;
            return;
        }
        var data = {"username": $scope.login.username, "psswd": $scope.login.password};
        console.log(data);
        services.post('login', 'login', data).then(function (response) {
            console.log(response);
            if (response['work'] == "true") {
                toastr.success('You logged successfully', 'Success',{
                    closeButton: true
                });
                localStorage.setItem("token_data", response['token']);
                loginService.menu();
                location.href="#home"
            } else {
                    toastr.error(response, 'Error',{
                    closeButton: true
                });
            }
        });
    };

})