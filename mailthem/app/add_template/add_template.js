'use strict';

angular.module('mailthemApp.add_template', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/add_template', {
        templateUrl: 'add_template/add_template.html',
        controller: 'AddTemplateCtrl'
    });
}])

.controller('AddTemplateCtrl', ['$scope', '$firebaseArray', '$location', 'CommonProp', function($scope, $firebaseArray, $location, CommonProp){
    $scope.username = CommonProp.getUser();
    
    if(!$scope.username){
        $location.path('/login');
    }
    
    var ref = firebase.database().ref().child('templates');
    $scope.templates = $firebaseArray(ref);
    
    $scope.createTemplate = function(){
        var title = $scope.template.title;
        var description = $scope.template.description;
        var content = $scope.template.content;
        var username = $scope.username;
        
        console.log($scope.templates);
        
        $scope.templates.$add({
            email: username,
            title: title,
            description: description,
            content: content
        }).then(function(ref){
            console.log(ref);
            $scope.success = true;
            //desabilitar boton de salvar template
            window.setTimeout(function(){
                $scope.$apply(function(){
                    $scope.success = false;
                    $location.path('/dashboard');
                });
            }, 2000);
        }, function(error){
            console.log(error);
        });
    };
    
}]);