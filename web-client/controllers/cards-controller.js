function cardsController($scope, $http, toastr, $window, $rootScope, $uibModal){
    var config = $window.config;
    
    var get_cards = function (id){
        $http.get('/rest/v1/cards/'+id, config).then(function(response){
            $scope.user_cards = response.data;
        });
    };
    $scope.edit_card = function(card){
        $http.put('/rest/v1/cards/edit', card, config).then(function(response){
            $scope.get_cards();
            toastr.success("The card has been successfully edited.");
        }, function(error){
          console.log(error);
        });
    }

    $scope.add_card = function(card){
        $http.post('/rest/v1/cards/add_card', card, config).then(function(response){
            toastr.success("The card has been successfully added.");
        }, function(error){
          console.log(error);
        });
    }

    $scope.delete_card = function(id){
        $http.delete('/rest/v1/cards/delete/'+id, config).then(function(response){
            toastr.success("The card has successfully deleted.");
        }, function(error){
          console.log(error);
        });
      }

    this.open = function () {
        modalInstance = $uibModal.open({
            templateUrl: 'myModalContent.html',
            controller: 'cardsController',
            controllerAs: '$ctrl',
        });

        $rootScope.modalInstance = modalInstance;
    };

    this.ok = function(){
        var data = {
            "csn" : $scope.model.csn, 
            "user_id" : $window.selected_user,
            "date" : new Date()
        }
        $scope.add_card(data);

        get_cards($window.selected_user);


        $rootScope.modalInstance.close();
    };

    this.cancel = function(){
        console.log('CANCEL');
        $rootScope.modalInstance.dismiss();
    };

}