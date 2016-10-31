'use strict';

angular.module('mailthemApp.sendTemplate', ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/send', {
        templateUrl: 'send/send.html',
        controller: 'SendTemplateCtrl'
    });
}])

//Controller that send templates
.controller('SendTemplateCtrl', ['$scope', '$http', '$location', 'CommonProp', 'TemplateService', 'ValidateService', '$firebaseArray', '$firebaseObject', function($scope, $http, $location, CommonProp, TemplateService, ValidateService, $firebaseArray, $firebaseObject){
    $scope.username = CommonProp.getUser();
    $scope.recipientError = false;
    
    $scope.recipients = [];
    $scope.recipient ="";
    $scope.recipientsString = "";
    
    //get the template from firebase
    var id = TemplateService.getTemplateId();
    var ref = firebase.database().ref().child('templates/'+id);
    $scope.data = $firebaseObject(ref);
    
    //if user not logged, redirect to login page
    if(!$scope.username){
        $location.path('/login');
    }
    
    //Add recipient
    $scope.addRecipient = function(){
        $scope.recipientError = false;
        if(ValidateService.validate($scope.recipient)){
            /*$scope.recipients.push($scope.recipient);
            $scope.recipient = "";
            $scope.recipientsString = $scope.recipients.toString();

            console.log($scope.recipientsString);*/
            if($scope.recipientsString == ""){
                $scope.recipientsString = $scope.recipient;
            } else {
                $scope.recipientsString = $scope.recipientsString+","+$scope.recipient;
            }
        }
        else{
            $scope.recipientError = true;
            console.log("Recipent invalid.");
        }
    };
    
    //Send mail to recipients
    $scope.sendMail =function(){
        console.log($scope.data.title);
        $http.post('/sendmail', {
            from: 'Mailthem <'+$scope.username+'>',
            to: $scope.recipientsString,
            subject: $scope.data.title,
            text: $scope.data.content,
            html: ""
        }).then(res=>{
            $scope.success = true;
            //desabilitar boton de salvar template
            window.setTimeout(function(){
                $scope.$apply(function(){
                    $scope.success = false;
                    $location.path('/dashboard');
                });
            }, 2000);
        });
    };
    
    //Read CSV file for add the recipients
    var fileInput = document.getElementById("csv"), readFile = function () {
        try{
            var reader = new FileReader();
            reader.onload = function () {
                //document.getElementById('out').innerHTML = reader.result.split(',');
                var res = "";
                if($scope.recipientsString == ""){
                    res = reader.result.toString();
                } else {
                    res = $scope.recipientsString+","+reader.result.toString();
                }
                setTimeout(function(){
                    $scope.$apply(function(){
                        $scope.recipientsString = res;
                    });
                },1000);
            };
            // start reading the file. When it is done, calls the onload event defined above.
            reader.readAsBinaryString(fileInput.files[0]);
        } catch(error){
            console.log("error al cargar el archivo.");
        }
    };
    fileInput.addEventListener('change', readFile);
    
    //logout 
    $scope.logout = function(){
        CommonProp.logoutUser();
    };
    
}]);