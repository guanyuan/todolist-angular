'use strict';

/* App Module */

var blogApp = angular.module('blogApp', [
    'ngRoute'
]);

blogApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/login', {
            controller: 'loginCtrl',
            templateUrl: 'partials/login.html',
        }).
        when('/welcome', {
            controller: 'blogListCtrl',
            templateUrl: 'partials/welcome.html',
        }).
        when('/todoList', {
            controller:'gtdCtrl',
            templateUrl: 'partials/to_do_list.html',
        }).
        otherwise({
            controller: 'loginCtrl',
            redirectTo: '/login'
        });
    }
]);
