function count(cart) {   
    var times = [];
    var cart = localStorage.getItem("cart");
    var cart = JSON.parse(cart);
    cart.sort();

    var current = null;
    var cnt = 0;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i] != current) {
            if (cnt > 0) {
                times.push(current + ":" + cnt);
            }
            current = cart[i];
            cnt = 1;
        } else {
            cnt++;
        }
    }
    if (cnt > 0) {
        times.push(current + ":" + cnt);
    }
    console.log(times);
    return times;
}


songnow.controller('cartCtrl', function($scope,services,toastr,plans){
    console.log("plans", plans);
    $scope.empty=false;
    $scope.full=false;
    function view(){
        var cart = localStorage.getItem("cart");
        var cart = JSON.parse(cart);
        var n_items = 0;
        console.log("cart", cart);
        if (!cart || cart.length==0){
            $scope.empty=true;
            $scope.full=false;
        }else{
            $scope.full=true;
            var times = count(cart);
            var cart_data =[];
            for(var i = 0;plans.length > i;i++){
                for(var x = 0;times.length > x;x++){
                    if (times[x].split(":",1)==plans[i].id){
                        console.log(times[x].split(":",1) + " == " + plans[i].id);
                        item=times[x].split(":",2);
                        total=plans[i].price*item[1];

                        cart_data[n_items]={
                            id : plans[i].id,
                            name : plans[i].name,
                            price : plans[i].price,
                            item : item[1],
                            total : total
                        }
                        n_items++;
                        console.log("cart_data",cart_data);
                        $scope.carts=cart_data;
                    }
                }
            }
        }
    }
    view();

    $scope.delete_pr = function (id) {
        var cart = localStorage.getItem("cart");
        var cart = JSON.parse(cart);
        var i = 0;
        while (i < cart.length) {
            if(cart[i] === id) {
                cart.splice(i, 1);
            } else {
                ++i;
            }
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        view();
    }

    $scope.plus = function (id){
        var cart = localStorage.getItem("cart");
        var cart = JSON.parse(cart);
        cart.push(id)
        localStorage.setItem("cart", JSON.stringify(cart));
        view();
    }
    
    $scope.minus = function (id){
        var cart = localStorage.getItem("cart");
        var cart = JSON.parse(cart);
        var index = cart.indexOf(id);
        cart.splice(index, 1);
        console.log("cart", cart);
        localStorage.setItem("cart", JSON.stringify(cart));
        view();
    }

    $scope.buy = function(){
        //logged?
        token=localStorage.getItem("token_data");
        var cart = localStorage.getItem("cart");
        var cart = JSON.parse(cart);
        var id_purchase=0;
        if (token){
            services.post('login', 'menu', token).then(function (user) {
                // var data = [user[0].username, count(cart)];
                services.post('cart', 'id_purchase', token).then(function (data) {
                    console.log(data)
                    if (data.length == 0){
                        id_purchase=0;
                    }else{
                        var integer = parseInt(data[0].id_purchase, 10);
                        id_purchase=integer+1;
                    }
                    var data = {"id_purchase" : id_purchase, "product" : count(cart), "user" : user[0].username};
                    console.log(data);

                    services.post('cart', 'buy', data).then(function (data) {
                        console.log(data);
                        localStorage.removeItem('cart');
                        toastr.success('Your purchase has been complete successfully', 'Success',{
                            closeButton: true
                        });
                        location.href = "#shop";
                    })
                })
    
            })
    
        }else{
            localStorage.setItem('buy', "true");
            location.href = "#login";
        }
    }

})