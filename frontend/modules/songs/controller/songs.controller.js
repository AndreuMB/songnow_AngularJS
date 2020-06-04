function filter(songs,checks){
    var fsongs=[];
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

function modal_song(id,songs){
    for(var i=0;i<songs.length;i++){
        console.log(songs[i].id);
        if (id==songs[i].id){
            return songs[i];
        }
    }

}

songnow.controller('songsCtrl', function($scope,services,toastr,songs,categories){
    
    console.log(songs);
    console.log(categories);
    $scope.categories=categories;
    var checks=[];
    var id_cat=localStorage.getItem("id_cat");
    var id_song=localStorage.getItem("id_song");
    console.log("idsong=" + id_song)

    if(id_cat){
        console.log("local storage set");
        $scope.songs=songs;
        var found = categories.find(function(element) { 
            return element.id === id_cat;
        });
        checks.push(found);
        $scope.songs=filter(songs,checks);
        localStorage.removeItem("id_cat");
    }else if(id_song){
        console.log("enter song");
        $scope.songs=songs;
        $scope.song=modal_song(id_song,songs);
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
        localStorage.removeItem("id_song");
    }else{
        console.log("local storage not set")
        $scope.songs=songs;
    }
        // $scope.songs=songs;

    var modal = document.getElementById("myModal");

    $scope.modal=function modal(id){
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
                var idc=id.path[0].attributes[1].nodeValue;
                chk=document.getElementById(idc);
                if (chk.checked == true){

                    var found = categories.find(function(element) { 
                    return element.id === idc;
                    }); 

                    checks.push(found);
                    $scope.songs=filter(songs,checks);
                    $scope.$apply();

                }else{
                    for(var i=0;i<checks.length;i++){
                        if(checks[i].id===idc){
                            checks.splice(i, 1);
                            $scope.songs=filter(songs,checks);
                            $scope.$apply();
                        }
                    }
                }
                console.log(checks);
            }
        }
    }



});