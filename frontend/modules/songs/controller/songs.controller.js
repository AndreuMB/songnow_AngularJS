function filter(songs,checks,fsongs){
    for(var i=0;i<songs.length;i++){
        for(var x=0;x<checks.length;x++){
            if(songs[i].playlists===checks[x].id){
                fsongs.push(songs[i]);
            }
        }
    }
    if(fsongs.length==0){
        fsongs=songs;
    }
    // console.log(fsongs);
    return fsongs;
}

songnow.controller('songsCtrl', function($scope,services,toastr,songs,categories){
    
console.log(songs);
console.log(categories);
$scope.categories=categories;
$scope.songs=songs;
var fsongs = [];

var modal = document.getElementById("myModal");

$scope.modal=function(id){
    for(var i=0;i<songs.length;i++){
    if (id==songs[i].id){
        console.log(songs[i]);
        $scope.song=songs[i];
    }
    var modal = document.getElementById("myModal");

    modal.style.display = "block";
    }

}
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    modal.style.display = "none";
}


window.onload = function() {
    var checkBox=[];
    var checks=[];
    var chk="";

    for(var i=0;i<categories.length;i++){
        checkBox[i]=document.getElementById(categories[i].id);
    }
    
    for(var i=0;i<categories.length;i++){
        console.log(checkBox[i]);
        checkBox[i].onclick= function click(id) {
            // console.log(id.path[0].attributes[1].nodeValue);
            fsongs=[];
            var idc=id.path[0].attributes[1].nodeValue;
            chk=document.getElementById(idc);
            if (chk.checked == true){

                var found = categories.find(function(element) { 
                return element.id === idc;
                }); 

                checks.push(found);
                $scope.songs=filter(songs,checks,fsongs);
                $scope.$apply();

            }else{
                for(var i=0;i<checks.length;i++){
                    if(checks[i].id===idc){
                        console.log("enter");
                        checks.splice(i, 1);
                        $scope.songs=filter(songs,checks,fsongs);
                        $scope.$apply();
                    }
                }
            }
            console.log(checks);
        }
    }
}



});