'use strict';

/* Directives */

blogApp.directive('draggableVertical', function() {
    var linkFn;
    linkFn = function(scope, element, attrs) {
        var drag, box;
        $(element).draggable({axis: "y", containment: ".left-side", scroll: false});
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
        $(element).draggable({axis: "x", containment: ".right-side", scroll: false});
    };
    return {
        restrict: 'ACE',
        link: linkFn
    };
});

blogApp.directive('sortableList', function() {
    var linkFn;
    linkFn = function(scope, element, attrs) {
        $(element).sortable();
    };
    return {
        restrict: 'ACE',
        link: linkFn
    };
});