$(function() {


    var row = 4;
    var col = 4;
    var count = 3;
    var delay = 500;

    var boxHtmlCode = '<div class="box col-xs-' + (12 / row) + '">' + 
                        '<button class = "door" > </button>' +  
                        '<div> </div> ' + 
                    '</div>';
    for (var i = 0; i < row * row; i++) {
        $(".mine-layer").append(boxHtmlCode);
    }

    var bombLocations = generateBombLocation(row, col, count);
    var mineDistArray = getMineDistr(row, col, bombLocations);
    console.log("Bombs located at: " + bombLocations + '(location begins from 0)');

    //布雷及生成格子周边雷数
    $.each(mineDistArray, function(k, v) {
        var selector = '.box:nth-child(' + (k + 1) + ') div';
        if ($.inArray(k, bombLocations) !== -1) {
            $(selector).addClass("bomb");
        } else {
            if (v !== 0) {
                $(selector).html(v);
            }
        }
    });

    $("body").on("click", '.box button', function() {
        var boxPos = $(".box").index($(this).parent());
        console.log("You clicked the " + boxPos + "th button");
        if ($.inArray(boxPos, bombLocations) != -1) {
            $(".box button").hide();
            $(".box div").show();
            setTimeout(function() {
                alert("Do not be sad, you can do better next time.");
            }, delay);
        } else {

            var indexes = getCurrentSurroundIndex(row, col, boxPos, bombLocations);
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



function generateBombLocation(row, col, count) {
    var array = [];
    for (var i = 0; i < row * col; i++) {
        array[i] = i;
    }
    array.sort(randomSort);
    return array.slice(0, count);
};


function randomSort() {
    return 0.5 - Math.random();
}




function getMineDistr(row, col, bombLocations) {
    var m, n, index;
    //初始化为0
    var mine01Matrix = createMatrix(row, col, 0);
    var mineDistArray = [];

    //有雷的位置,mine01Matrix设为1
    for (var i = 0; i < bombLocations.length; i++) {
        m = Math.floor(bombLocations[i] / col);
        n = bombLocations[i] % col;
        mine01Matrix[m][n] = 1;
    }
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            index = i * col + j;
            mineDistArray[index] = getCurrentSurroundBombNum(row, col, i, j, mine01Matrix);
        }
    }
    return mineDistArray;
}


function getCurrentSurroundBombNum(row, col, i, j, mine01Matrix) {
    var bombNum = 0;
    var arrayI = [i, i, i, i + 1, i + 1, i + 1, i - 1, i - 1, i - 1];
    var arrayJ = [j, j - 1, j + 1, j - 1, j, j + 1, j - 1, j, j + 1];
    for (var k = 0; k < arrayI.length; k++) {
        if (isValidPosition(row, col, arrayI[k], arrayJ[k])) {
            bombNum += mine01Matrix[arrayI[k]][arrayJ[k]];
        }
    }
    return bombNum;
}

function getCurrentSurroundIndex(row, col, boxPos, bombLocations) {
    var i = Math.floor(boxPos / col);
    var j = boxPos % col;
    var indexArray = [],
        index;
    var arrayI = [i, i, i, i + 1, i + 1, i + 1, i - 1, i - 1, i - 1];
    var arrayJ = [j, j - 1, j + 1, j - 1, j, j + 1, j - 1, j, j + 1];
    for (var k = 0; k < arrayI.length; k++) {
        if (isValidPosition(row, col, arrayI[k], arrayJ[k])) {
            index = arrayI[k] * col + arrayJ[k];
            if ($.inArray(index, bombLocations) === -1) {
                indexArray.push(index);
            }
        }
    }
    return indexArray;
}




function isValidPosition(row, col, i, j) {
    if (i >= 0 && i < row && j >= 0 && j < row) {
        return true;
    }
    return false;
}


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
