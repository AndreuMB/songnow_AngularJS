songnow.controller('profileCtrl', function($scope,services,toastr,user){
    console.log(user);
    $scope.profile=true;
    $scope.c_user=false;

    $scope.cuser = {
        username: ""
    }

    $scope.user=user;

    $scope.c_psswd = function (){
        console.log(user[0].token);
        location.href =  "#rpsswd/" + user[0].token;
    }

    $scope.c_username = function (){
        $scope.profile=false;
        $scope.c_user=true;    
        console.log(user[0].token);
        // location.href =  "#rpsswd/" + user[0].token;
    }

    $scope.submitUser = function () {
            // if(validationC() != 0){
            console.log("enter");
            console.log($scope.cuser.username);
            data = {
                idusers : user[0].idusers,
                username : $scope.cuser.username
            }
            console.log(data);
            services.post('profile', 'c_user', data).then(function (data) {
                console.log(data);
                location.href =  "#profile";
            })
    }

})