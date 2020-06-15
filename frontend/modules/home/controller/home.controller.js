function id_cat(){
  acat=document.getElementsByClassName("categ_img");
  // console.log(acat);
  // if (scroll==true){
  //   clength=acat.length + 3;
  //   if(clength>categories.length){
  //     clength=categories.length;
  //   }
  // }else{
  //   clength=acat.length;
  // }
  // console.log(acat.length);
  for(var i=0;i<acat.length;i++){
    console.log(acat[i].id)
    document.getElementById(acat[i].id).onclick = function press(id){
      console.log(id.path[0].id);
      localStorage.setItem("id_cat", id.path[0].id)
      window.location.href = "#/songs";
    }
  }
}
songnow.controller('homeCtrl', function($scope,services,toastr,img,categories,$window,songs){


  var slides = $scope.slides = [];
  var currIndex = 0;

  $scope.song_modal=function(id){
    localStorage.setItem("id_song", id)
    window.location.href = "#/songs";
  }
  $scope.addSlide = function(i) {
    // console.log(img[i])
    slides.push({
      image: '/songnow_AngularJS/frontend/assets/img/'+ img[i].rute,
      text: songs[i].song_name,
      ids : songs[i].id,
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

  function categ(start, limit){
    // $scope.cats = categories.slice(start, limit);
    // console.log($scope.cats);
      for (var i = start; i < limit; i++) { // n items
      // console.log(categories[i])
      cats.push({
        image: '/songnow_AngularJS/frontend/assets/img/'+ categories[i].rute,
        text: categories[i].name,
        id: categories[i].id

      });
    }
    return cats;

  }
  console.log(songs);
  $scope.songs=songs;
  $scope.cats = categ(start, limit);

  angular.element($window).on('mousewheel', function() {
    // console.log($window.scrollY);
    
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
        $scope.$apply();
        id_cat();
      }
    }
    last=$window.scrollY;
    // console.log("last=" + last + "end=" + end);
  });
  
  // window.onload = function() {
    // console.log(document.getElementsByClassName("categ_img")[0].id)
    id_cat();
  // }


});
songnow.controller('menuCtrl', function(loginService,$scope){
  loginService.menu();
  $scope.logoutf=function(){
    localStorage.removeItem("token_data")
    loginService.menu();
  }
})

songnow.controller('footerCtrl', function($scope, services){
  function lang(lang) {
    // Save preferences
    lang = lang || localStorage.getItem('app-lang') || 'english';
    localStorage.setItem('app-lang', lang);
  
    var allang = document.querySelectorAll('[data-tr]');
  
    services.translate(lang, allang);

    // $.ajax({
    //     // url: '../../../view/langs/' + lang + '.json',
    //     url: '/songnow_framework/view/assets/langs/' + lang + '.json',
    //     type: 'POST',
    //     dataType: 'JSON',
    //     success: function (data) {
    //       console.log(data);
    //       for (var i = 0; i < allang.length; i++) {
    //         allang[i].innerHTML = data.hasOwnProperty(lang)
    //         ? data[lang][allang[i].dataset.tr]
    //         : allang[i].dataset.tr;
    //       }
    //     }
    // });
  }
  lang();
  $scope.spanishl=function(){
    lang('spanish');
  }
  $scope.englishl=function(){
    lang('english');
  }
  $scope.valencianl=function(){
    lang('valencian');
  }
})