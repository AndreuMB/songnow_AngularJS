function initMap() {
    var ontinyent = {lat: 38.8220593, lng: -0.6063927};
    var map = new google.maps.Map(document.getElementById('map2'), {
      zoom: 10,
      center: ontinyent
    });
    var contentString = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h1 id="firstHeading" class="firstHeading">IES ESTACIO</h1>'+
    '<div id="bodyContent">'+
    '<p><b>Ontinyent</b>'+
    '<p><b> IES LESTACIÓ</b>, <a href="http://www.iestacio.com/</a> '+
    '(last visited June 22, 2019).</p>'+
    '</div>'+
    '</div>';
  
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
  
    var marker = new google.maps.Marker({
      position: ontinyent,
      map: map,
      title: 'Ontinyent'
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
}

songnow.controller('contactCtrl', function($scope,services,toastr){
	$scope.contact = {
        inputName: "",
        inputEmail: "",
        inputMessage: ""
    };

    if(document.getElementById("map2") != null){
        var script = document.createElement('script');
        script.src = "https://maps.googleapis.com/maps/api/js?key=" + apikeygmaps + "&callback=initMap";
        script.async;
        script.defer;
        document.getElementsByTagName('script')[0].parentNode.appendChild(script);
      }
    
    $scope.SubmitContact = function () {
        console.log("enter submit");
        var data = {"name": $scope.contact.inputName, "email": $scope.contact.inputEmail, 
        "message": $scope.contact.inputMessage};
        // var contact_form = JSON.stringify(data);
        console.log(data);
        
        services.post('contact', 'send_email', data).then(function (response) {
            console.log(response);
            if (response == 'true') {
                    toastr.success('El mensaje ha sido enviado correctamente', 'Mensaje enviado',{
                    closeButton: true
                });
            } else {
                    toastr.error('El mensaje no se ha enviado', 'Mensaje no enviado',{
                    closeButton: true
                });
            }
        });
      //   services.post('profile', 'c_user', data).then(function (data) {
      //     console.log(data);
      //     location.href =  "#profile";
      // })
    };
});
