'use strict';

/* Directives */

blogApp.directive('draggableVertical', function() {
    var linkFn;
    linkFn = function(scope, element, attrs) {
        var drag, box;
        $(element).draggable({axis: "y"});
    };
    return {
    	restrict: 'ACE',
    	link: linkFn
    };
});


blogApp.directive('draggableHorizon', function() {
    var linkFn;
    linkFn = function(scope, element, attrs) {
        var drag, box;
        $(element).draggable({axis: "x"});
    };
    return {
        restrict: 'ACE',
        link: linkFn
    };
});


blogApp.directive('myWidget', function() {
    var linkFn;
    linkFn = function(scope, element, attrs) {
        var animateDown, animateRight, pageOne, pageTwo;
        pageOne = angular.element(element.children()[0]);
        pageTwo = angular.element(element.children()[1]);

        animateDown = function() {
            $(this).animate({
                top: '+=50'
            });
        };

        animateRight = function() {
            $(this).animate({
                left: '+=50'
            });
        };

        $(pageOne).on('click', animateDown);
        $(pageTwo).on('click', animateRight);
    };
    return {
        restrict: 'E',
        link: linkFn
    };
});