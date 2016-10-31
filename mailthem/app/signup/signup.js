'use restrict';

angular.module('mailthemApp.signup',['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/signup', {
        templateUrl: 'signup/signup.html',
        controller: 'SignupCtrl'
    });
}])
//Signup Controller
.controller('SignupCtrl', ['$scope', '$firebaseAuth', '$firebaseArray', 'CommonProp', '$location', function($scope, $firebaseAuth, $firebaseArray, CommonProp, $location){
    
    var username = CommonProp.getUser();
    
    //Register the user in firebase
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
    
    //create the example template for the firs login
    var createUserArray = function(username, password){
        
        //signin first
        var auth = $firebaseAuth();
        auth.$signInWithEmailAndPassword(username, password).then(function(){
            CommonProp.setUser(username);
        }).catch(function(error){
            $scope.errMsg = true;
            $scope.errorMessage = error.message;
        }); 
        
        //create template
        var ref = firebase.database().ref().child('templates');
        $scope.templates = $firebaseArray(ref);
        $scope.templates.$add({
            email: username,
            title: "Title of template.",
            description: "Description of template.",
            content: "<h1>Content of template.</h1>"
        }).then(function(ref){
            console.log("User Array Successfully Created");
            
            //For finish, logout the user
            CommonProp.logoutUser();  
        }, function(error){
            console.log(error);
        });
    };
    
}]);