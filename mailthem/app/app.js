'use strict';

// Declare app level module which depends on views, and components
angular.module('mailthemApp', [
  'ngRoute',
  'mailthemApp.login',
  'mailthemApp.signup',
  'mailthemApp.dashboard'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

  $routeProvider.otherwise({redirectTo: '/login'});

}])

