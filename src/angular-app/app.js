'use strict';

/* App Module */

var blogApp = angular.module('blogApp', [
    'ngRoute'
]);
var islogin = false;

blogApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/login', {
            controller: 'loginCtrl',
            templateUrl: 'templates/partials/login.html',
        }).
        when('/welcome', {
            controller: 'blogListCtrl',
            templateUrl: 'templates/partials/welcome.html',
        }).
        when('/todoList', {
            controller:'gtdCtrl',
            templateUrl: 'templates/partials/to_do_list.html',
        }).
        otherwise({
            controller: 'loginCtrl',
            redirectTo: '/login'
        });
    }
]);
