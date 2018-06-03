function UsersController($scope, $http, toastr){
    var config = {headers:  {
        'Authorization': 'Basic d2VudHdvcnRobWFuOkNoYW5nZV9tZQ==',
        'Accept': 'application/json;odata=verbose',
        "JWT" : localStorage.getItem('user')
        }
      };

    var get_users = function (){
        $http.get('/rest/v1/users', config).then(function(response){
            $scope.names = response.data;
        });
    };

    get_users();

    $scope.edit_user = function(user){
        $http.put('/rest/v1/user/edit', user, config).then(function(response){
            get_users();
            toastr.success("You have been successfully edited.");
        }, function(error){
          console.log(error);
        });
    }

    $scope.add_user = function(user){
        $http.post('/rest/v1/user/add_user', user, config).then(function(response){
            get_users();
            toastr.success("You have been successfully added.");
        }, function(error){
          console.log(error);
        });
    }

}