'use strict';

angular.module('mailthemApp.sendTemplate', ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/send', {
        templateUrl: 'send/send.html',
        controller: 'SendTemplateCtrl'
    });
}])

.controller('SendTemplateCtrl', ['$scope', '$location', 'CommonProp', 'TemplateService', function($scope, $location, CommonProp, TemplateService){
    $scope.username = CommonProp.getUser();
    
    $scope.recipients = [];
    $scope.recipient ="";
    $scope.recipientsString = "";
    
    $scope.templateTitle = TemplateService.getTitle();
    $scope.templateDescription = TemplateService.getDescription();
    $scope.templateContent = TemplateService.getContent();
    
    if(!$scope.username){
        $location.path('/login');
    }
    
    $scope.addRecipient = function(){
        $scope.recipients.push($scope.recipient);
        $scope.recipient = "";
        $scope.recipientsString = $scope.recipients.toString();
        
        console.log($scope.recipientsString);
    };
    
}]);