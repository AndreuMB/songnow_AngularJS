songnow.controller('loginCtrl', function($scope,services,toastr,users){
    console.log("login");

$scope.register = {
    username: "",
    email: "",
    password: "",
    password2 : ""
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
        } else {
                toastr.error('El mensaje no se ha enviado', 'Mensaje no enviado',{
                closeButton: true
            });
        }
    });
};

})