'use strict';

/* App Module */

var blogApp = angular.module('blogApp', [
    'ui.router'
]);


blogApp.config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/");
    //
    // Now set up the states
    $stateProvider
        .state('blog', {
            url: "/blog",
            templateUrl: 'templates/blog.html',
        })
        .state('blog.login', {
            url: "/login",
            controller: 'loginCtrl',
            templateUrl: 'templates/partials/login.html',
        })
        .state('blog.welcome', {
            url: "/welcome",
            controller: 'blogListCtrl',
            templateUrl: 'templates/partials/welcome.html',
        })
        .state('todolist', {
            url: "/todolist",
            controller: 'gtdCtrl',
            templateUrl: 'templates/partials/to_do_list.html',
        })
        .state('blog.login.multiple', {
            url: "/todolist",
            views: {
                "todolist": {
                    controller: 'gtdCtrl',
                    templateUrl: 'templates/partials/to_do_list.html',
                }
            }
        });
});
