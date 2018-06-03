function GroupsController($scope, $http, toastr, $window){
    var config = $window.config;

    var get_groups = function (){
        $http.get('/rest/v1/groups', config).then(function(response){
            $scope.groups = response.data;
        });
    };

    get_groups();

    $scope.edit_group = function(group){
        $http.put('/rest/v1/groups/edit', group, config).then(function(response){
            get_groups();
            toastr.success("The group has been successfully edited.");
        }, function(error){
          console.log(error);
        });
    }

    $scope.add_group = function(group){
        $http.post('/rest/v1/groups/add_group', group, config).then(function(response){
            get_groups();
            toastr.success("The group has been successfully added.");
        }, function(error){
          console.log(error);
        });
    }

    $scope.delete_group = function(id){
        $http.delete('/rest/v1/groups/delete/'+id, config).then(function(response){
            get_groups();
            toastr.success("The group has successfully deleted.");
        }, function(error){
          console.log(error);
        });
      }

}