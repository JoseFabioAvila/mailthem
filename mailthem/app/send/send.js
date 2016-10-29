'use strict';

angular.module('mailthemApp.sendTemplate', ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/send', {
        templateUrl: 'send/send.html',
        controller: 'SendTemplateCtrl'
    });
}])

.controller('SendTemplateCtrl', ['$scope', '$location', 'CommonProp', 'TemplateService', '$firebaseArray', '$firebaseObject', function($scope, $location, CommonProp, TemplateService, $firebaseArray, $firebaseObject){
    $scope.username = CommonProp.getUser();
    
    $scope.recipients = [];
    $scope.recipient ="";
    $scope.recipientsString = "";
    
    var id = TemplateService.getTemplateId();
    var ref = firebase.database().ref().child('templates/'+id);
    $scope.data = $firebaseObject(ref);
    
    if(!$scope.username){
        $location.path('/login');
    }
    
    $scope.addRecipient = function(){
        $scope.recipients.push($scope.recipient);
        $scope.recipient = "";
        $scope.recipientsString = $scope.recipients.toString();
        
        console.log($scope.recipientsString);
    };
    
    $scope.sendEmail =function(){
        $location.path('/dashboard');
    };
    
}]);