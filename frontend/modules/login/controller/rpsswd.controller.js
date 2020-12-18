songnow.controller('rpsswdCtrl', function($scope,services,toastr, users, $route){
    console.log("rpsswd");
    console.log($route.current.params.token)

    $scope.rpsswd = {
        username: ""
    }

    $scope.cpsswd = {
        password: "",
        password2: ""
    }

    $scope.submitRpsswd = function () {
        console.log($scope.rpsswd.username);
        console.log(users);
        $scope.found=false;
        var found = users.find(function(element) { 
            return element.idusers === $scope.rpsswd.username;
        });
        console.log(found);
        if (!found || found.active == 0){
            $scope.found=true;
            return;
        }
        services.post('login', 'epsswd', found).then(function (response) {
            console.log(response);
        });
    };

    $scope.submitCpsswd = function () {
        console.log("cpsswd");
        console.log($scope.cpsswd.password);
        $scope.IsMatch=false;
        if ($scope.cpsswd.password != $scope.cpsswd.password2) {
            $scope.IsMatch=true;
            return;
        }
        data={
            psswd : $scope.cpsswd.password,
            token : $route.current.params.token
        };
        console.log(data);
        services.post('login', 'rpsswd', data).then(function (response) {
            console.log(response);
            toastr.success('You change your password successfully', 'Success',{
                closeButton: true
            });
            profile_psswd=localStorage.getItem("c_psswd");
            if(profile_psswd){
                localStorage.removeItem("c_psswd");
                location.href="#profile"
            }else{
                location.href="#login"
            }
        })
    };
})