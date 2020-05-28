songnow.controller('homeCtrl', function($scope,services,toastr,img,categories, $window){
  var slides = $scope.slides = [];
  var currIndex = 0;

  $scope.addSlide = function(i) {
    // console.log(img[i])
    slides.push({
      image: '/songnow_AngularJS/frontend/assets/img/'+ img[i].rute,
      text: img[i].song_name,
      id: currIndex++
    });

  };

  for (var i = 0; i < img.length; i++) { // n items
    $scope.addSlide(i);
  }

console.log(categories);

var cats = $scope.cats = [];
currIndex = 0;

limit=3
start=0;
end=false;

// function categ(limit){
//   console.log("limit=", limit)
//   for (var i = 0; i < limit; i++) { // n items
//     // console.log(categories[i])
//     cats.push({
//       image: '/songnow_AngularJS/frontend/assets/img/'+ categories[i].rute,
//       text: categories[i].name,
//       id: i

//     });
//   }
//   return cats;
// }
// var end=false;
// myEl = angular.element( document.querySelector( '#categories' ) ); 

// $scope.cats = categ(limit);
// angular.element($window).on('mousewheel', function() {
//   console.log($window.scrollY);
//   if(typeof last !== 'undefined' && end == false){
//     if ($window.scrollY==last && last!=0){
//       limit = limit + 3;
//       if (limit>categories.length){
//         myEl.empty();
//         end=true;
//         $scope.cats = categ(categories.length)
//       }else{
//         myEl.empty();
//         $scope.cats = categ(limit)
//       }
//     }
//     $scope.$apply();
//   }
//   last=$window.scrollY;
// });
// categories.slice(1, limit);

function categ(start, limit){
  // $scope.cats = categories.slice(start, limit);
  // console.log($scope.cats);
    for (var i = start; i < limit; i++) { // n items
    // console.log(categories[i])
    cats.push({
      image: '/songnow_AngularJS/frontend/assets/img/'+ categories[i].rute,
      text: categories[i].name,
      id: i

    });
  }
  return cats;

}
$scope.cats = categ(start, limit);

angular.element($window).on('mousewheel', function() {
  console.log($window.scrollY);
  if(typeof last !== 'undefined' && end == false){
    if ($window.scrollY==last && last!=0){
      limit = limit + 3;
      start = start + 3;
      if (limit>categories.length){
        end=true;
        $scope.cats = categ(start, categories.length)
      }else{
        $scope.cats = categ(start,limit)
      }
    }
    $scope.$apply();
  }
  last=$window.scrollY;
});
});