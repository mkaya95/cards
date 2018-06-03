function DashboardController($scope, $rootScope, $http, $window){
    console.log("Hello from dashboard controller");

    var config = $window.config;

    var init = function(){
      groups_count();
      user_count();
    }
    var user_count = function (){
      $http.get('/rest/v1/users_count', config).then(function(response){
          $scope.user_count = response.data.user_count;
          console.log($scope.user_count);
      });
    };

    var groups_count = function (){
      $http.get('/rest/v1/groups_count', config).then(function(response){
          $scope.groups_count = response.data.groups_count;
          console.log($scope.groups_count);
      });
    };

    init();


  }
