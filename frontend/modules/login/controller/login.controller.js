function cfirebase(provider,services,loginService){
    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
        console.log("result",result);
        if (result.additionalUserInfo.providerId=="google.com"){
            var data = {
                user : result.user.displayName,
                email : result.user.email,
                img : result.user.photoURL,
                id : result.user.uid
            };
        }else{
            var data = {
                user : result.additionalUserInfo.username,
                email : result.user.email,
                img : result.user.photoURL,
                id : result.user.uid
            };
        }

        console.log("data",data);
        services.post('login', 'login_a', data).then(function (response) {
            token=response.replace(/"/g, '');
            console.log(token);
            localStorage.setItem('token_data', token);
            loginService.menu();
            location.href="#home"
        });
    })
    .catch(function(error) {
        console.log('Error:', error);
    });
}

songnow.controller('loginCtrl', function($scope,services,toastr,users,loginService,$rootScope){
	if (!$rootScope.cont) {
		$rootScope.cont=0;
	}
	if ($rootScope.cont === 0) {
		loginService.initialize();
		$rootScope.cont=1;
	}

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
                location.href = "#login";
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
                cart=localStorage.getItem("buy");
                if(cart){
                    localStorage.removeItem("buy");
                    location.href="#cart"
                }else{
                    location.href="#home"
                }
            } else {
                    toastr.error(response, 'Error',{
                    closeButton: true
                });
            }
        });
    };

    $scope.loginGmail = function () {
        console.log("gmail");
        provider = new firebase.auth.GoogleAuthProvider();
        cfirebase(provider,services,loginService);
    };

    $scope.loginGitHub = function () {
        console.log("github")
        provider = new firebase.auth.GithubAuthProvider();
        provider.addScope('email');
        cfirebase(provider,services,loginService);
    };

})