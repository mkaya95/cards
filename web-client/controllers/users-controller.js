function UsersController($scope, $http, toastr, $window){
    var config = $window.config;

    var get_users = function (){
        $http.get('/rest/v1/users', config).then(function(response){
            $scope.names = response.data;
        });
    };

    get_users();

    $scope.edit_user = function(user){
        $http.put('/rest/v1/user/edit', user, config).then(function(response){
            get_users();
            toastr.success("The user has been successfully edited.");
        }, function(error){
          console.log(error);
        });
    }

    $scope.add_user = function(user){
        $http.post('/rest/v1/user/add_user', user, config).then(function(response){
            get_users();
            toastr.success("The user has been successfully added.");
        }, function(error){
          console.log(error);
        });
    }

    $scope.delete_user = function(id){
        $http.delete('/rest/v1/user/delete/'+id, config).then(function(response){
            get_users();
            toastr.success("The user has successfully deleted.");
        }, function(error){
          console.log(error);
        });
      }

}