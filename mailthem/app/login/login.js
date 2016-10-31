'use strict';

angular.module('mailthemApp.login',['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/login', {
        templateUrl: 'login/login.html',
        controller: 'LoginCtrl'
    });
}])

//Controller for login
.controller('LoginCtrl', ['$scope', '$firebaseAuth','$location', 'CommonProp', function($scope, $firebaseAuth, $location, CommonProp){
    
    $scope.username = CommonProp.getUser();
    
    if(!$scope.username){
        $location.path('/login');
    }
    
    //User login
    $scope.signIn = function(){
        var username = $scope.user.email;
        var password = $scope.user.password;
        var auth = $firebaseAuth();

        auth.$signInWithEmailAndPassword(username, password).then(function(){
            console.log("User Login Successful");
            CommonProp.setUser($scope.user.email);
            $location.path('/dashboard');
        }).catch(function(error){
            //console.log(error);
            $scope.errMsg = true;
            $scope.errorMessage = error.message;
        });
    };
    
    //User logout
    $scope.logout = function(){
        CommonProp.logoutUser();
    };
    
}]);





