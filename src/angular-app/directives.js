'use strict';

/* Directives */

blogApp.directive('draggableVertical', function() {
    var linkFn;
    linkFn = function(scope, element, attrs) {
        var items = $(element).children();
        $(items).draggable({
            axis: "y",
            containment: ".drag-up-down",
            scroll: false
        });
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
        $(boxes).draggable({
            axis: "x",
            containment: ".drag-left-right",
            scroll: false
        });
    };
    return {
        restrict: 'E',
        link: linkFn
    };
});

///////////////////////扫雷游戏，其中的函数取自 mine-sweeper.js 文件///////////////////////////////
blogApp.directive('mineGame', function() {

    var linkFn;
    linkFn = function(scope, element, attrs) {
        var args = element.attr("args").split('-');
        var dim = parseInt(args[0]);
        var count = parseInt(args[1]);

        generateBoxHtml(element, dim);
        var bombLocations = generateBombLocation(dim, count);
        var mineDistArray = getMineDistr(dim, bombLocations);
        console.log("Bombs located at: " + bombLocations + '(location begins from 0)');

        //布雷及生成格子周边雷数
        $.each(mineDistArray, function(k, v) {
            var selector = '.box:nth-child(' + (k + 1) + ') div';
            if ($.inArray(k, bombLocations) !== -1) {
                $(selector).addClass("icon-bomb");
            } else {
                if (v !== 0) {
                    $(selector).html(v);
                }
            }
        });

        $("body").on("click", '.box button', function() {
            var axis = $(this).parent().attr("axis").split('-');
            axis = {
                "x": parseInt(axis[0]),
                "y": parseInt(axis[1])
            };
            var delay = 500;
            if ($(this).next().hasClass("icon-bomb")) {
                $(".box button").hide();
                $(".box div").show();
                setTimeout(function() {
                    alert("Do not be sad, you can do better next time.");
                }, delay);
            } else {
                var indexes = getCurrentSurroundIndex(dim, axis, bombLocations);
                $.each(indexes, function(k, v) {
                    $(".box:nth-child(" + (v + 1) + ") button").hide();
                    $(".box:nth-child(" + (v + 1) + ") div").show();
                });
                if ($(".box div:hidden").parent().size() === count) {
                    setTimeout(function() {
                        alert("Congratulations, you win!");
                    }, delay);

                }
            }
        });

    };
    return {
        restrict: 'C',
        link: linkFn
    };
});
