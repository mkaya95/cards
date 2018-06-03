app.controller('sidebarCtrl', function($scope, $location, $http, toastr){

    $scope.check_login = function(){
        if(localStorage.getItem('user')){
            return true;
        }
        return false;
    }

    $scope.login = function(credentials){
        $http.post('/login', credentials).then(function(response){
            localStorage.setItem('user',response.data.token);
            toastr.success("You have been successfully logged in");
        }).catch(function(e) {
            toastr.error(e.data.error,e.statusText);
        }) 

    }

    $scope.logout = function(){
        localStorage.clear();
    }

    $scope.getClass = function (path) {
        if (path == '/dashboard' && $location.path() == '/') return 'active';
        return ($location.path() === path) ? 'active' : '';
    },

    $scope.openNavigationDrawer = function(){
        if ($scope.mobileNavigationOpen == 'nav-open'){
            $scope.mobileNavigationOpen = '';
        }else{
            $scope.mobileNavigationOpen = 'nav-open';
        }
    }
    $scope.menuItemClicked = function(){
        $scope.mobileNavigationOpen = '';
    }

});