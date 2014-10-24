$(function() {
    var row = 3;
    var col = 3;
    var count = 2;

    var bombLocations = generateBombLocation(row, col, count);
    console.log("Bombs located at: " + bombLocations + '(location begins from 0)');

    $.each(bombLocations, function(k, v) {
        var selector = '.box:nth-child(' + (v + 1) + ') div';
        $(selector).addClass("bomb");
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
