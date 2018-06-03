function DashboardController($scope, $rootScope, $http, $window){
    console.log("Hello from dashboard controller");

    var config = $window.config;

    var init = function(){
      console.log($rootScope);
      get_report();
      get_bills();
      get_providers();
      //get_countries_php();
    }
    var get_report = function (){
      $http.get('/rest/v1/report', config).then(function(response){
        $scope.report = response.data;
      }),function(response){
        alert(response.status);
      }
    };
    var get_bills = function (){
      $http.get('/rest/v1/bills', config).then(function(response){
        $scope.bills = response.data;
      }),function(error){
        alert(error.status);
      }
    };
    var get_providers = function (){
      $http.get('/rest/v1/providers', config).then(function(response){
        $scope.providers = response.data;
      }),function(response){
        alert(response.status);
      }
    };

    var get_countries_php = function (){
      $http.get("http://localhost/weblab/data.php").then(function(response){
        $scope.countries = response.data;
      }),function(response){
        alert('ERROR');
      }
    };

    init();

    $scope.delete_provider = function(id){
      $http.delete('/rest/v1/provider/delete/'+id, config).then(function(response){
        get_providers();
      }, function(error){
        console.log(error);
      });
    }
    $scope.edit_provider = function(provider){
      $http.put('/rest/v1/provider/edit', provider,config).then(function(response){
        get_providers();
      }, function(error){
        console.log(error);
      });
    }
    $scope.add_provider = function(){
      $http.post('/rest/v1/provider', $scope.provider, config).then(function(response){
        $scope.provider = null;
        get_providers();
      }, function(error){
        console.log(error);
      });
    }

    $scope.add_bill = function(){
      $http.post('/rest/v1/bill', $scope.bill, config).then(function(response){
        $scope.bill = null;
        get_bills();
        get_report();
      }, function(error){
        console.log(error);
      });
    }
  }
