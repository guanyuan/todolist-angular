;
(function($) {
    $(function() {
        var dim = 6;
        var count = 10;
        var delay = 500;


        generateBoxHtml(".mine-layer", dim);
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
            axis = {"x": parseInt(axis[0]), "y": parseInt(axis[1])};

            if ($(this).next().hasClass("icon-bomb")) {
                $(".box button").hide();
                $(".box div").show();
                setTimeout(function() {
                    alert("Do not be sad, you can do better next time.");
                }, delay);
            } 
            else {
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
    });


    //洗牌后选择前count个元素，随机选择布雷位置
    function generateBombLocation(dim, count) {
        var array = [];
        for (var i = 0; i < dim * dim; i++) {
            array[i] = i;
        }
        array.sort(randomSort);
        return array.slice(0, count);
    };

    //排序函数
    function randomSort() {
        return 0.5 - Math.random();
    }



    //得到一个二维矩阵，雷数分布
    function getMineDistr(dim, bombLocations) {
        var m, n, index;
        //初始化为0
        var mine01Matrix = createMatrix(dim, dim, 0);
        var mineDistArray = [];

        //有雷的位置,mine01Matrix设为1

        for (var i = 0; i < bombLocations.length; i++) {
            m = Math.floor(bombLocations[i] / dim);
            n = bombLocations[i] % dim;
            mine01Matrix[m][n] = 1;
        }
        for (var i = 0; i < dim; i++) {
            for (var j = 0; j < dim; j++) {
                index = i * dim + j;
                mineDistArray[index] = getCurrentSurroundBombNum(dim, i, j, mine01Matrix);
            }
        }
        return mineDistArray;
    }


    //得到每个格子周边的雷数
    function getCurrentSurroundBombNum(dim, i, j, mine01Matrix) {
        var bombNum = 0;
        var arrayI = [i, i, i, i + 1, i + 1, i + 1, i - 1, i - 1, i - 1];
        var arrayJ = [j, j - 1, j + 1, j - 1, j, j + 1, j - 1, j, j + 1];
        for (var k = 0; k < arrayI.length; k++) {
            if (isValidPosition(dim, dim, arrayI[k], arrayJ[k])) {
                bombNum += mine01Matrix[arrayI[k]][arrayJ[k]];
            }
        }
        return bombNum;
    }

    function getCurrentSurroundIndex(dim, boxPos, bombLocations) {
        var i = boxPos.x;
        var j = boxPos.y;
        var indexArray = [],
            index;
        var arrayI = [i, i, i, i + 1, i + 1, i + 1, i - 1, i - 1, i - 1];
        var arrayJ = [j, j - 1, j + 1, j - 1, j, j + 1, j - 1, j, j + 1];
        for (var k = 0; k < arrayI.length; k++) {
            if (isValidPosition(dim, dim, arrayI[k], arrayJ[k])) {
                index = arrayI[k] * dim + arrayJ[k];
                if ($.inArray(index, bombLocations) === -1) {
                    indexArray.push(index);
                }
            }
        }
        return indexArray;
    }



    //判断格子的坐标是否合法
    function isValidPosition(dim, dim, i, j) {
        return (i >= 0 && i < dim && j >= 0 && j < dim);
    }


    //创建m*n的二维矩阵，初始值为initial
    function createMatrix(m, n, initial) {
        var array = [];
        for (var i = 0; i < m; i++) {
            array[i] = [];
            for (var j = 0; j < n; j++) {
                array[i][j] = initial;
            }
        }
        return array;
    }


    //生成格子结构
    function generateBoxHtml(selector, dim) {
        var boxHtmlCode = '<div class="box col-xs-' + (12 / dim) + '">' +
            '<button class = "door" > </button>' +
            '<div> </div> ' +
            '</div>';

        for (var i = 0; i < dim; i++) {
            for (var j = 0; j < dim; j++) {
                $(selector).append(boxHtmlCode);
                $(selector + " .box").last().attr("axis", i + "-" + j);
            };
        };
        var width = $(selector).children().width();
        $(selector).children().css({
            "height": width,
            "font-size": (width / 2),
            "line-height": width + "px"
        });
    }

})(window.jQuery);
