$(function() {
    var row = 3;
    var col = 3;
    var count = 2;

    var bombLocations = generateBombLocation(row, col, count);
    alert(bombLocations);
    $("body").on("click", ".box", function() {
        var boxPos = $(".box").index($(this));
        if ($.inArray(boxPos, bombLocations) != -1) {
            //add bomb class to all the bomb location
            $.each(bombLocations, function(k, v) {
                $(".box:nth-child(" + (v + 1) + ")").addClass("bomb");
            });
            alert("Game over!");
            //refresh the current page
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

    var bombLocations = array.slice(0, count);

    array.sort();

    return bombLocations;
};


function randomSort() {
    return 0.5 - Math.random();
}
