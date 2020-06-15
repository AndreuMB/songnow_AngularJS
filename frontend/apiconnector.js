songnow.factory("services", ['$http','$q', function ($http, $q) {
    var serviceBase = '/songnow_AngularJS/backend/index.php?module=';
    var obj = {};

        obj.get = function (module, functi) {
            var defered=$q.defer();
            var promise=defered.promise;
            $http({
                  method: 'GET',
                  url: serviceBase + module + '&function=' + functi
              }).success(function(data, status, headers, config) {
                 defered.resolve(data);
              }).error(function(data, status, headers, config) {
                 defered.reject(data);
              });
            return promise;
        };

        obj.get = function (module, functi, dada) {
            var defered=$q.defer();
            var promise=defered.promise;
            $http({
                  method: 'GET',
                  url: serviceBase + module + '&function=' + functi + '&param=' + dada
              }).success(function(data, status, headers, config) {
                 console.log(data);
                 defered.resolve(data);
              }).error(function(data, status, headers, config) {
                 defered.reject(data);
              });
            return promise;
        };

        obj.get = function (module, functi, dada, dada2) {
            var defered=$q.defer();
            var promise=defered.promise;
            $http({
                  method: 'GET',
                  url: serviceBase + module + '&function=' + functi + '&param=' + dada + '&param2=' + dada2
              }).success(function(data, status, headers, config) {
                 //console.log(data);
                 defered.resolve(data);
              }).error(function(data, status, headers, config) {
                 defered.reject(data);
              });
            return promise;
        };

        obj.post = function (module, functi, p_data) {
          var defered=$q.defer();
          var promise=defered.promise;
          $http({
                method: 'POST',
                url: serviceBase + module + '&function=' + functi,
                data: {p_data}
            }).success(function(data, status, headers, config) {
      	       console.log(serviceBase + module + '&function=' + functi);
              //debugger;
               defered.resolve(data);
            }).error(function(data, status, headers, config) {
               defered.reject(data);
            });
          return promise;
        };

        obj.translate = function (lang,allang){
         var defered=$q.defer();
         var promise=defered.promise;
         $http({
            method: 'POST',
            dataType: 'JSON',
            url: 'frontend/assets/langs/' + lang + '.json',
        }).success(function(data, status, headers, config) {
            console.log(data);
            for (var i = 0; i < allang.length; i++) {
               allang[i].innerHTML = data.hasOwnProperty(lang)
               ? data[lang][allang[i].dataset.tr]
               : allang[i].dataset.tr;
            }
          //debugger;
           defered.resolve(data);
        }).error(function(data, status, headers, config) {
           defered.reject(data);
        });
         // url: '/songnow_framework/view/assets/langs/' + lang + '.json',
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
        }

        obj.put = function (module, functi, dada) {
          var defered=$q.defer();
          var promise=defered.promise;
          $http({
                method: 'PUT',
                url: serviceBase + module + '&function=' + functi,
                data: dada
            }).success(function(data, status, headers, config) {
      	       defered.resolve(data);
            }).error(function(data, status, headers, config) {
               defered.reject(data);
            });
          return promise;
        };

        obj.delete = function (module, functi, dada) {
            var defered=$q.defer();
            var promise=defered.promise;
            $http({
                  method: 'DELETE',
                  url: serviceBase + module + '&function=' + functi + '&param=' + dada
              }).success(function(data, status, headers, config) {
                 //console.log(data);
                 defered.resolve(data);
              }).error(function(data, status, headers, config) {
                 defered.reject(data);
              });
            return promise;
        };
        
    return obj;
}]);
