'use strict';

angular.module('mailthemApp.dashboard', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/dashboard', {
        templateUrl: 'dashboard/dashboard.html',
        controller: 'DashboardCtrl'
    });
}])

//controller for dashboard
.controller('DashboardCtrl', ['$scope', 'CommonProp', 'TemplateService', '$firebaseArray', '$firebaseObject', '$location', function($scope, CommonProp, TemplateService, $firebaseArray, $firebaseObject, $location){
    $scope.username = CommonProp.getUser();
    
    //if user not logged, redirect to login page
    if(!$scope.username){
        $location.path('/login');
    }
    
    //get the templates from firebase
    var ref = firebase.database().ref().child('templates');
    $scope.templates = $firebaseArray(ref);
    
    //get the complete data for edit the template by id
    $scope.editTemplate = function(id){
        var ref = firebase.database().ref().child('templates/'+id);
        $scope.editTemplateData = $firebaseObject(ref);
    };
    
    //edit the template with the given id
    $scope.updateTemplate = function(id){
        var ref = firebase.database().ref().child('templates/'+id);
        ref.update({
            email: $scope.username,
            title: $scope.editTemplateData.title,
            description: $scope.editTemplateData.description,
            content: $scope.editTemplateData.content
        }).then(function(ref){
            $("#editModal").modal('hide');
        },function(error){
           console.log(error); 
        });
    };
    
    //function for select the template to delete
    $scope.delete = function(template){
        $scope.delete_template = template;
    };
    
    //delete from firebase
    $scope.deleteTemplate = function(delete_template){
        $scope.templates.$remove(delete_template);
        $("#deleteModal").modal('hide');
    };
    
    //user logout
    $scope.logout = function(){
        CommonProp.logoutUser();
    };
    
    //function for go to send.html and send the selected template
    $scope.sendTemplate = function(id){
        var ref = firebase.database().ref().child('templates/'+id);
        $scope.data = $firebaseObject(ref);
        
        TemplateService.setTemplateId(id);
        
        $location.path('/send');
    };
    
}]);