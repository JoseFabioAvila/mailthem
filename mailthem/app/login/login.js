'use strict';

angular.module('mailthemApp.login',['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/login', {
        templateUrl: 'login/login.html',
        controller: 'LoginCtrl'
    });
}])

.controller('LoginCtrl', ['$scope', '$firebaseAuth','$location', 'CommonProp', function($scope, $firebaseAuth, $location, CommonProp){
    
    $scope.username = CommonProp.getUser();
    
    if(!$scope.username){
        $location.path('/login');
    }
    
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
    
    
}]);

/*.service('CommonProp', ['$location', '$firebaseAuth', function($location, $firebaseAuth){
    var user = "";
    var auth = $firebaseAuth();
    
    return {
        getUser: function(){
            if(user == ""){
                user = localStorage.getItem("userEmail");
            }
            return user;
        },
        setUser: function(value){
            localStorage.setItem("userEmail",value);
            user = value;
        },
        logoutUser: function(){
            auth.$signOut();
            console.log("Logged Out Succesfully");
            user = "";
            localStorage.removeItem('userEmail');
            $location.path('/login');
        }
    };
}]);*/





