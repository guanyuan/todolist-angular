'use strict';

/* Directives */

blogApp.directive('draggableVertical', function() {
    var linkFn;
    linkFn = function(scope, element, attrs) {
        var items = $(element).children();
        $(items).draggable({axis: "y", containment: ".drag-up-down", scroll: false});
    };
    return {
    	restrict: 'A',
    	link: linkFn
    };
});


blogApp.directive('sortableList', function() {
    var linkFn;
    linkFn = function(scope, element, attrs) {
        $(element).sortable();
    };
    return {
        restrict: 'C',
        link: linkFn
    };
});


blogApp.directive('draggableHorizon', function() {
    var linkFn;
    linkFn = function(scope, element, attrs) {
        var boxes = angular.element(element.children());
        $(boxes).draggable({axis: "x", containment: ".drag-left-right", scroll: false});
    };
    return {
        restrict: 'E',
        link: linkFn
    };
});


