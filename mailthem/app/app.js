'use strict';

// app modules
angular.module('mailthemApp', [
    'ngRoute',
    'mailthemApp.login',
    'mailthemApp.signup',
    'mailthemApp.dashboard',
    'mailthemApp.add_template',
    'mailthemApp.sendTemplate'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

  $routeProvider.otherwise({redirectTo: '/login'});

}])

