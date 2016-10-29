'use strict';

angular.module('mailthemApp.dashboard', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/dashboard', {
        templateUrl: 'dashboard/dashboard.html',
        controller: 'DashboardCtrl'
    });
}])

.controller('DashboardCtrl', ['$scope', 'CommonProp', 'TemplateService', '$firebaseArray', '$firebaseObject', '$location', function($scope, CommonProp, TemplateService, $firebaseArray, $firebaseObject, $location){
    $scope.username = CommonProp.getUser();
    
    if(!$scope.username){
        $location.path('/login');
    }
    
    var ref = firebase.database().ref().child('templates');
    $scope.templates = $firebaseArray(ref);
    
    $scope.editTemplate = function(id){
        var ref = firebase.database().ref().child('templates/'+id);
        $scope.editTemplateData = $firebaseObject(ref);
        console.log($scope.editTemplateData);
    };
    
    $scope.updateTemplate = function(id){
        var ref = firebase.database().ref().child('templates/'+id);
        ref.update({
            email: username,
            title: $scope.editTemplateData.title,
            description: $scope.editTemplateData.description,
            content: $scope.editTemplateData.content
        }).then(function(ref){
            $("#editModal").modal('hide');
        },function(error){
           console.log(error); 
        });
    };
    
    $scope.deleteCnf = function(template){
        $scope.delete_template = template;
    };
    
    $scope.deleteTemplate = function(delete_template){
        $scope.templates.$remove(delete_template);
        $("#deleteModal").modal('hide');
    };
    
    
    $scope.logout = function(){
        CommonProp.logoutUser();
    };
    
    $scope.sendTemplate = function(id){
        var ref = firebase.database().ref().child('templates/'+id);
        $scope.data = $firebaseObject(ref);
        
        TemplateService.setTitle($scope.data.title);
        TemplateService.setDescription($scope.data.description);
        TemplateService.setContent($scope.data.content);
        
        console.log(TemplateService.getTitle());
        console.log(TemplateService.getDescription());
        console.log(TemplateService.getContent());
        
        $location.path('/send');
    }
    
}]);