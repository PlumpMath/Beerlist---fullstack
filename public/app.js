var app = angular.module('beerlist', []);

app.controller('MainCtrl', function ($scope, $http) {

  $scope.beers = [];

  $http.get('/beers').success(function(data) {
    angular.copy(data, $scope.beers);
  });

  $scope.addBeer = function () {
    var beer = { 
      name: $scope.name,
      style: $scope.style,
      image_url: $scope.image_url,
      abv: $scope.abv
    };

    // console.log(index)
    
    $scope.name = '';
    $scope.style = '';
    $scope.abv = '';
    $scope.image_url = '';

   $http.post('/beers', beer).success(function (response) {
      // console.log (response)
      $scope.beers.push(response);
    });
};

  $scope.removeBeer = function (index) {
  var beer = $scope.beers[index]

    $http.delete('/beers/' + beer._id).success(function(data) {
      $scope.beers.splice(index, 1);
      //can also be the $http.get here
    });
  };
});