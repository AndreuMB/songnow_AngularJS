function read_plan(id,songs){
    for(var i=0;i<songs.length;i++){
        console.log(songs[i].id);
        if (id==songs[i].id){
            return songs[i];
        }
    }
}

function add_cart(id){
    var cart = localStorage.getItem("cart");
    if (cart){
            var cart = JSON.parse(cart);
            console.log("add",cart);
            cart.push(id);
            localStorage.setItem('cart', JSON.stringify(cart));
    }else{
        var cart = [id];
        console.log("create",cart);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}


songnow.controller('shopCtrl', function($scope,services,toastr,plans){
    console.log(plans)
    $scope.plans=plans;
    var modal = document.getElementById("myModal");

    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }
    $scope.read = function (id) {
        console.log(id);
        $scope.song=read_plan(id,plans);
        console.log(read_plan(id,plans));
        modal.style.display = "block";
    }
    $scope.buy = function (id) {
        console.log(id);
        toastr["success"]("Your product has been add to cart");
        add_cart(id);
    }
})