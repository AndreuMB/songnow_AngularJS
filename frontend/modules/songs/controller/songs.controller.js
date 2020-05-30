songnow.controller('songsCtrl', function($scope,services,toastr,songs,categories){
    
console.log(songs);
console.log(categories);
$scope.categories=categories;
$scope.songs=songs;
var modal = document.getElementById("myModal");

$scope.modal=function(id){
    for(var i=0;i<songs.length;i++){
    if (id==songs[i].id){
        console.log(songs[i]);
        $scope.song=songs[i];
    }
    var modal = document.getElementById("myModal");

    modal.style.display = "block";

    // $scope.showModal = true;
    }
    // songs.indexOf(id);
}
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    modal.style.display = "none";
  }

// for(var i=0;i<categories.length;i++){
//     console.log(categories[i].id);
//     checkBox = document.getElementById("categories[i].id");
//     if (checkBox.checked == true){
//         categoriesm =  songs.filter(function(category) {
//             songst=songs.playlists == checkBox;
//         });
//       }
// }

  
// document.getElementById("categories[i].id");
// console.log(songst);
// window.onload = function() {
//         //     for(var i=0;i<categories.length;i++){
//         //     console.log(categories[i].id);
//         //     checkBox = document.getElementById(categories[i].id);
//         //     checkBox.onchange = function() {
//         //         console.log(checkBox)
//         //     }
//         //     // if (checkBox.checked == true){
//         //     //     console.log("checkbox")
//         //     //     // categoriesm =  songs.filter(function(category) {
//         //     //         // songst=songs.playlists == checkBox;
//         //     //     // });
//         //     // }
//         // }
//         for(var i=0;i<categories.length;i++){
//             checkBox = document.getElementById(categories[i].id);
//             checkBox.onchange = function() {
//             if (checkBox.checked == true){
//                 console.log("checked")
//             }
//             }
//         }

// }
//             checkBox = document.getElementById("14");
//             checkBox.onchange = function() {
//                 console.log("checkbox")
// };
// }


});