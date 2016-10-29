'use restrict';

angular.module('mailthemApp.signup',['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/signup', {
        templateUrl: 'signup/signup.html',
        controller: 'SignupCtrl'
    });
}])

.controller('SignupCtrl', ['$scope', '$firebaseAuth', '$firebaseArray', 'CommonProp', '$location', function($scope, $firebaseAuth, $firebaseArray, CommonProp, $location){
    

    var username = CommonProp.getUser();
    
    
    $scope.signUp = function(){
        //$scope.errMsg = false;
        var username = $scope.user.email;
        var password = $scope.user.password;
        
        if(username && password){
            var auth = $firebaseAuth();
            auth.$createUserWithEmailAndPassword(username, password).then(function(){
                console.log("User Successfully Created");
                createUserArray(username,password);
            }).catch(function(error){
               $scope.errMsg = true;
               $scope.errorMessage = error.message;
            });
        }
    };
    
    var createUserArray = function(username, password){
        
        
        
        //sign in
        var auth = $firebaseAuth();
        auth.$signInWithEmailAndPassword(username, password).then(function(){
            CommonProp.setUser(username);
        }).catch(function(error){
            $scope.errMsg = true;
            $scope.errorMessage = error.message;
        }); 
        
        
        
        //create
        var ref = firebase.database().ref().child('templates');
        $scope.templates = $firebaseArray(ref);
        $scope.templates.$add({
            email: username,
            title: "Title of template.",
            description: "Description of template.",
            content: "<h1>Content of template.</h1>"
        }).then(function(ref){
            console.log("User Array Successfully Created");
            logout();
        }, function(error){
            console.log(error);
        });
    };
    
    
    var logout = function(){
        CommonProp.logoutUser();
    };
    
}]);