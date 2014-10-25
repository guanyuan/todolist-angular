$(function() {
    var row = 3;
    var col = 3;
    var count = 2;
    var delay = 500;
    var mineDistr = [],
        mineDistr2;

    var bombLocations = generateBombLocation(row, col, count);
    console.log("Bombs located at: " + bombLocations + '(location begins from 0)');

    mineDistr2 = getMineDistr(row, col, bombLocations);
    var index;
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            index = i * col + j;
            mineDistr[index] = mineDistr2[i][j];
        }
    }
    $.each(mineDistr, function(k, v) {
        var selector = '.box:nth-child(' + (k + 1) + ') div';
        if($.inArray(k, bombLocations) !== -1) {
            $(selector).addClass("bomb");
        }
        else {
            $(selector).html(v);
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
            var i = Math.floor(boxPos / col);
            var j = boxPos % col;
            var indexes = getCurrentSurroundIndex(row, col, i, j, bombLocations);
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
    var m, n;
    //初始化为0
    var bombArray2 = [],
        surroundArray2 = [];
    for (var i = 0; i < row; i++) {
        bombArray2[i] = [];
        surroundArray2[i] = [];
        for (var j = 0; j < col; j++) {
            bombArray2[i][j] = 0;
            surroundArray2[i][j] = -1;
        }
    }
    //有雷的位置,bombArray2设为1
    for (var i = 0; i < bombLocations.length; i++) {
        m = Math.floor(bombLocations[i] / col);
        n = bombLocations[i] % col;
        bombArray2[m][n] = 1;
    }

    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            surroundArray2[i][j] = getCurrentSurroundBombNum(row, col, i, j, bombArray2);
        }
    }

    return surroundArray2;
}


function getCurrentSurroundBombNum(row, col, i, j, bombArray2) {
    var bombNum = 0;
    var arrayI = [i, i, i, i + 1, i + 1, i + 1, i - 1, i - 1, i - 1];
    var arrayJ = [j, j - 1, j + 1, j - 1, j, j + 1, j - 1, j, j + 1];
    for (var k = 0; k < arrayI.length; k++) {
        if (isValidPosition(row, col, arrayI[k], arrayJ[k])) {
            bombNum += bombArray2[arrayI[k]][arrayJ[k]];
        }
    }
    return bombNum;
}

function getCurrentSurroundIndex(row, col, i, j, bombLocations) {
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
