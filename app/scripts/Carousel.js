/*******顶部课程轮播图********/

var $ = require("./jquery");

$(function () {

    var space = $('#carousel').width();
    var value = $('#carousel').find('.imgList').css('left');
    value = parseInt(value);

    function leftMove() {
        if (value == 0) {
            value = -2200;
        } else {
            value = value + space;
        }
        $('#carousel').find('.imgList').css('left', value + 'px');

    }

    function rightMove() {
        if (value == -2200) {
            value = 0;
        } else {
            value = value - space;
        }
        $('#carousel').find('.imgList').css('left', value + 'px')

    }

    //下划线对应图片
    function lineTab() {
        var i = Math.abs(value) / space;
        $('.lineList').find('.on').removeClass('on');
        $('.lineList li').eq(i).addClass('on');
    }

    //点击左右button切图
    $('#carousel').find('.prev').on('click', function () {
        leftMove();
        lineTab();
    });
    $('#carousel').find('.next').on('click', function () {
        rightMove();
        lineTab();
    });

    //hover下划线对应显示图片
    $('.lineList li').each(function (index) {
        $(this).on('click', function () {
            $('.lineList li.on').removeClass('on');
            $(this).addClass('on');
            $('#carousel').find('.imgList').css('left', -(space * index));
        })
    });

    var timer;
    //实现轮播
    function go() {

        timer = setInterval(function () {
            $('#carousel').find('.next').trigger('click');
        }, 3000);

    }

    go();

    //鼠标悬浮时，轮播停止
    $('#carousel').hover(
        function () {
            clearTimeout(timer);
        }, function () {
            go();
        }
    );


});


