$(function() {
    var row = 3;
    var col = 3;
    var count = 2;
    var mineDistr = [],
        mineDistr2;

    var bombLocations = generateBombLocation(row, col, count);
    console.log("Bombs located at: " + bombLocations + '(location begins from 0)');

    $.each(bombLocations, function(k, v) {
        var selector = '.box:nth-child(' + (v + 1) + ') div';
        $(selector).addClass("bomb");
    });

    mineDistr2 = getMineDistr(row, col, bombLocations);
    var index;
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            index = i * col + j;
            mineDistr[index] = mineDistr2[i][j];
        }
    }
    $.each(mineDistr, function(k, v) {
        if (v !== -1) {
            $(".box:nth-child(" + (k + 1) + ") div").html(v);
        }
    });

    $("body").on("click", '.box button', function() {
        var boxPos = $(".box").index($(this).parent());
        console.log("You clicked the " + boxPos + "th button");
        if ($.inArray(boxPos, bombLocations) != -1) {
            $(".bomb").show();
            $(".bomb").siblings().hide();

            //refresh the current page
            alert("Game over!");
            location.reload();

        } else {

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
    var bombArray = [],
        surroundArray = [];
    for (var i = 0; i < row; i++) {
        bombArray[i] = [];
        surroundArray[i] = [];
        for (var j = 0; j < col; j++) {
            bombArray[i][j] = 0;
            surroundArray[i][j] = -1;
        }
    }
    //有雷的位置,bombArray设为-1
    for (var i = 0; i < bombLocations.length; i++) {
        m = Math.floor(bombLocations[i] / col);
        n = bombLocations[i] % col;
        bombArray[m][n] = 1;
    }


    //The top-left-corner
    var i = 0,
        j = 0;
    if (bombArray[i][j] !== 1) {
        surroundArray[i][j] = bombArray[i][j + 1] + bombArray[i + 1][j] + bombArray[i + 1][j + 1];
    }

    //The top-right-corner
    i = 0, j = col - 1;
    if (bombArray[i][j] !== 1) {
        surroundArray[i][j] = bombArray[i][j - 1] + bombArray[i + 1][j] + bombArray[i + 1][j - 1];
    }

    //The bottom-left-corner
    i = row - 1, j = 0;
    if (bombArray[i][j] !== 1) {
        surroundArray[i][j] = bombArray[i][j + 1] + bombArray[i - 1][j + 1] + bombArray[i - 1][j];
    }

    //The bottom-left-corner
    i = row - 1, j = col - 1;
    if (bombArray[i][j] !== 1) {
        surroundArray[i][j] = bombArray[i][j - 1] + bombArray[i - 1][j - 1] + bombArray[i - 1][j];
    }


    //the first row
    i = 0;
    for (j = 1; j < col - 1; j++) {
        if (bombArray[i][j] !== 1) {
            surroundArray[i][j] = bombArray[i][j + 1] + bombArray[i + 1][j] + bombArray[i][j - 1] + bombArray[i + 1][j - 1] + bombArray[i + 1][j + 1];
        }
    }

    //the last row
    i = row - 1;
    for (j = 1; j < col - 1; j++) {
        if (bombArray[i][j] !== 1) {
            surroundArray[i][j] = bombArray[i - 1][j] + bombArray[i][j - 1] + bombArray[i - 1][j - 1] + bombArray[i - 1][j + 1] + bombArray[i][j + 1];
        }
    }

    //the left side
    j = 0;
    for (i = 1; i < row - 1; i++) {
        if (bombArray[i][j] !== 1) {
            surroundArray[i][j] = bombArray[i - 1][j] + bombArray[i - 1][j + 1] + bombArray[i][j + 1] + bombArray[i + 1][j] + bombArray[i + 1][j + 1];
        }
    }

    //the right side
    j = col - 1;
    for (i = 1; i < row - 1; i++) {
        if (bombArray[i][j] !== 1) {
            surroundArray[i][j] = bombArray[i][j - 1] + bombArray[i + 1][j - 1] + bombArray[i - 1][j - 1] + bombArray[i - 1][j] + bombArray[i + 1][j];
        }
    }
    //general case
    for (i = 1; i < row - 1; i++) {
        for (j = 1; j < col - 1; j++) {
            if (bombArray[i][j] !== 1) {
                surroundArray[i][j] = bombArray[i][j - 1] + bombArray[i + 1][j - 1] + bombArray[i - 1][j - 1] + bombArray[i - 1][j] + bombArray[i + 1][j] + bombArray[i + 1][j + 1] + bombArray[i - 1][j + 1] + bombArray[i][j + 1];
            }
        }
    }

    return surroundArray;


