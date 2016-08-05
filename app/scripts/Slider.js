var $ = require("./jquery");

$(function () {
    var space = $('#lessonSlider').find('.imgList li').outerWidth();
    var value = $('#lessonSlider').find('.imgList').css('left');
    value = parseInt(value);

    function leftMove() {
        if (value == 0) {
            value = -space * 3;
        } else {
            value = value + space;
        }
        $('#lessonSlider').find('.imgList').css('left', value + 'px');

    }

    function rightMove() {
        if (value == -space * 3) {
            value = 0;
        } else {
            value = value - space;
        }

        $('#lessonSlider').find('.imgList').css('left', value + 'px')

    }

    //点击左右button切图
    $('#lessonSlider').find('.prev').on('click', function () {
        leftMove();
    });
    $('#lessonSlider').find('.next').on('click', function () {
        rightMove();
    });


});

$(function () {
    var space = $('#enterprSlider').find('.imgList li').outerWidth() + 10;
    var value = $('#enterprSlider').find('.imgList').css('left');
    value = parseInt(value);
    function leftMove() {
        if (value == 0) {
            value = -space * 6;
        } else {
            value = value + space;
        }
        $('#enterprSlider').find('.imgList').css('left', value + 'px');

    }

    function rightMove() {
        if (value == -space * 6) {
            value = 0;
        } else {
            value = value - space;
        }

        $('#enterprSlider').find('.imgList').css('left', value + 'px')

    }

    //点击左右button切图
    $('#enterprSlider').find('.prev').on('click', function () {
        leftMove();
    });
    $('#enterprSlider').find('.next').on('click', function () {
        rightMove();
    });


});

$(function () {
    var space = $('#collegeSlider').find('.imgList li').outerWidth() + 30;
    var value = $('#collegeSlider').find('.imgList').css('left');
    value = parseInt(value);
    function leftMove() {
        if (value == 0) {
            value = -space * 7;
        } else {
            value = value + space;
        }
        $('#collegeSlider').find('.imgList').css('left', value + 'px');

    }

    function rightMove() {
        if (value == -space * 7) {
            value = 0;
        } else {
            value = value - space;
        }

        $('#collegeSlider').find('.imgList').css('left', value + 'px')

    }

    //点击左右button切图
    $('#collegeSlider').find('.prev').on('click', function () {
        leftMove();
    });
    $('#collegeSlider').find('.next').on('click', function () {
        rightMove();
    });


});

$(function () {
    var space = $('#mediaSlider').find('.imgList li').outerWidth() + 10;
    var value = $('#mediaSlider').find('.imgList').css('left');
    value = parseInt(value);
    function leftMove() {
        if (value == 0) {
            value = -space * 6;
        } else {
            value = value + space;
        }
        $('#mediaSlider').find('.imgList').css('left', value + 'px');

    }

    function rightMove() {
        if (value == -space * 6) {
            value = 0;
        } else {
            value = value - space;
        }

        $('#mediaSlider').find('.imgList').css('left', value + 'px')

    }

    //点击左右button切图
    $('#mediaSlider').find('.prev').on('click', function () {
        leftMove();
    });
    $('#mediaSlider').find('.next').on('click', function () {
        rightMove();
    });


});
