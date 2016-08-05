
var $=require("./jquery");
require("./NavTab");
require("./Carousel");
require("./Slider");

/*********顶部搜索栏*************/
$('.hd-search-input').on('focus',function(){

    $(this).removeAttr('placeholder');
    $('.hd-search-submit').css({
        'borderColor':'#35b558',
        'background': '#35b558 url(../images/topsearch-icon2.png) center center no-repeat'
    });

});

$('.hd-search-input').on('blur',function(){
    $(this).attr('placeholder','搜索课程，问答或wiki');
    $('.hd-search-submit').css({
        'borderColor':'#e8e8e8',
        'background':'url(../images/topsearch-icon.png) center center no-repeat'
    });
});

/*****end***********/


/*****热门推荐tab切换***********/
$('.re-tab-title li').each(function(index){
    var tabed_box= $('.re-tab-box>ul').eq(index);
    $(this).hover(function(){
        $('.re-tab-title').find('.tab_in').removeClass('tab_in');
        $(this).addClass('tab_in');
        //切换对应标题的内容
        $('.re-tab-box').find('.tab-box_active').removeClass('tab-box_active');
        tabed_box.addClass('tab-box_active');
    });
});

/*****end***********/

/*****问号后面的边框显示***********/

$('.way').hover(function(){
    $('.tip').show();
},function(){
    $('.tip').hide();
});

/*****end***********/


/*****职业路径边框效果***********/
$('.pj-card').each(function(index){
    $(this).hover(function(){
        $(this).css('border-color','#35b558');
        switch (index){
            case 0:
            case 1:
            case 2:
            case 3:
                    $('.pj-card').eq(index+1).css('border-left-color','#35b558');
                    break;
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
                    $('.pj-card').eq(index-5).css('border-bottom-color','#35b558');
                    $('.pj-card').eq(index+1).css('border-left-color','#35b558');
                    break;
        }
    },function(){

        $('.pj-card').css({
            'border':'1px solid #e8e8e8',
            'border-right':'none',
        });
        $('.pj-card').eq(4).css('border-right','1px solid #e8e8e8');
        $('.pj-card').eq(9).css('border-right','1px solid #e8e8e8');
        $('.pj-card').eq(5).css('border-top','none');
        $('.pj-card').eq(6).css('border-top','none');
        $('.pj-card').eq(7).css('border-top','none');
        $('.pj-card').eq(8).css('border-top','none');
        $('.pj-card').eq(9).css('border-top','none');
    });
});

/*****end***********/



/*****wiki边框悬浮效果***********/
$('.wiki-card').each(function(index){
    $(this).hover(function(){
        $(this).css('border-color','#35b558');
        switch (index){
            case 0:
            case 1:
                $('.wiki-card').eq(index+1).css('border-left-color','#35b558');
                break;
        }
    },function(){
        $('.wiki-card').css({
            'border':'1px solid #e8e8e8',
            'border-right':'none',
        });
        $('.wiki-card').eq(2).css('border-right','1px solid #e8e8e8');
    });
});

/*****end***********/

/*****置顶按钮***********/
var timer=null;
var pageHeight=$(window).innerHeight();

$(window).scroll(function(){
    var backtop=$(document).scrollTop();
    if(backtop>=pageHeight){
        $('#gototop').show();
    }else {
        $('#gototop').hide();
    }

});
$('#gototop').on('click',function(){
    timer=setInterval(function(){
        var backtop=$(document).scrollTop();
        var speedtop=backtop/5;
        $(document).scrollTop(backtop-speedtop);
        if(backtop==0){
            clearInterval(timer);
        }
    },30)

});




/*****end***********/

