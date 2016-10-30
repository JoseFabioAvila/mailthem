'use strict';

angular.module('mailthemApp.sendTemplate', ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/send', {
        templateUrl: 'send/send.html',
        controller: 'SendTemplateCtrl'
    });
}])

.controller('SendTemplateCtrl', ['$scope', '$http', '$location', 'CommonProp', 'TemplateService', 'ValidateService', '$firebaseArray', '$firebaseObject', function($scope, $http, $location, CommonProp, TemplateService, ValidateService, $firebaseArray, $firebaseObject){
    $scope.username = CommonProp.getUser();
    $scope.recipientError = false;
    
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
        $scope.recipientError = false;
        if(ValidateService.validate($scope.recipient)){
            $scope.recipients.push($scope.recipient);
            $scope.recipient = "";
            $scope.recipientsString = $scope.recipients.toString();

            console.log($scope.recipientsString);
        }
        else{
            $scope.recipientError = true;
            console.log("Recipent invalid.");
        }
    };
    
    $scope.sendMail =function(){
        console.log($scope.data.title);
        $http.post('/sendmail', {
            from: 'Mailthem <'+$scope.username+'>',
            to: $scope.recipientsString,
            subject: $scope.data.title,
            text: $scope.data.content,
            html: ""
        }).then(res=>{
            alert('Email sent successfully');
        });
    };
    
    $scope.updateTemplate = function(){
        var ref = firebase.database().ref().child('templates/'+id);
        ref.update({
            email: $scope.username,
            title: $scope.editTemplateData.title,
            description: $scope.editTemplateData.description,
            content: $scope.editTemplateData.content
        }).then(function(ref){
            $location.path('/dashboard');
        },function(error){
            console.log(error); 
            $location.path('/send');
        });
    };
    
}]);