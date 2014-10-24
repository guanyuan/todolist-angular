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
            templateUrl: 'templates/partials/blog/login.html',
        })
        .state('blog.welcome', {
            url: "/welcome",
            controller: 'blogListCtrl',
            templateUrl: 'templates/partials/blog/welcome.html',
        })

    .state('blog.login.multiple', {
        url: "/todolist",
        views: {
            "todolist": {
                controller: 'gtdCtrl',
                templateUrl: 'templates/todolist.html',
            }
        }
    });

    $stateProvider
        .state('todolist', {
            url: "/todolist",
            controller: 'gtdCtrl',
            templateUrl: 'templates/todolist.html',
        });

    $stateProvider
        .state('demo-angular-directive-jquery-ui-draggable', {
            url: "/demo-angular-directive-jquery-ui-draggable",
            templateUrl: 'templates/demo-angular-directive-jquery-ui-draggable.html'
        });
});
