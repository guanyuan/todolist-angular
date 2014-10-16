'use strict';

/* App Module */

var blogApp = angular.module('blogApp', [
    'ui.router'
]);


blogApp.config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/login");
    //
    // Now set up the states
    $stateProvider
        .state('login', {
            url: "/login",
            controller: 'loginCtrl',
            templateUrl: 'templates/partials/login.html',
        })
        .state('welcome', {
            url: "/welcome",
            controller: 'blogListCtrl',
            templateUrl: 'templates/partials/welcome.html',
        })
        .state('todolist', {
            url: "/todolist",
            controller: 'gtdCtrl',
            templateUrl: 'templates/partials/to_do_list.html',
        })
        .state('welcome.todolist', {
            url: "/todolist",
            controller: 'gtdCtrl',
            templateUrl: 'templates/partials/to_do_list.html',
        });
});
