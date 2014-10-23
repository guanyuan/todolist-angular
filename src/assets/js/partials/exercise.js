$(document).ready(function() {

	//元素不存在于index.html中所以失效
    $(".demo-ng-directive .left-side .box").draggable({
        axis: "y"
    });
    $(".demo-ng-directive .right-side .box").draggable({
        axis: "x"
    });

    //通过on来绑定未来出现元素的点击事件，可行！然而将body换成#hello，将失效，这是为何呢？
    $("body").on('click', "#one", function() {
        $(this).animate({
            top: '+=50'
        });
    });
});
