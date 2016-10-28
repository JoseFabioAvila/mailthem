'use strict';

angular.module('mailthemApp.dashboard', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/dashboard', {
        templateUrl: 'dashboard/dashboard.html',
        controller: 'DashboardCtrl'
    });
}])

.controller('DashboardCtrl', ['$scope', 'CommonProp', '$firebaseArray', '$firebaseObject', '$location', function($scope, CommonProp, $firebaseArray, $firebaseObject, $location){
    $scope.username = CommonProp.getUser();
    
    if(!$scope.username){
        $location.path('/login');
    }
    
    $scope.logout = function(){
        CommonProp.logoutUser();
    };
    
}]);