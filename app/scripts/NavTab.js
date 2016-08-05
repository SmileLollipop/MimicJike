

/*******顶部导航切换***********/
var $=require("./jquery");

$('.topNav-box .tn-first').each(function(index){
    var tabed_ul= $('.tn-sub-ul').eq(index-1);
    if(index!=0){
        $(this).hover(function(){
            tabed_ul.addClass('tabClass');
            tabed_ul.find('.ul-arrow').show();
            tabed_ul.find('.ul-arrow-outer').show();
        },function(){
            tabed_ul.removeClass('tabClass');
            tabed_ul.find('.ul-arrow').hide();
            tabed_ul.find('.ul-arrow-outer').hide();
        });
    }
});

$('.tn-sub-ul').each(function(index){
    var tabed_ul= $('.tn-sub-ul').eq(index);
    $(this).hover(function(){
        tabed_ul.addClass('tabClass');
        tabed_ul.find('.ul-arrow').show();
        tabed_ul.find('.ul-arrow-outer').show();
        $('.tn-first').eq(index+1).css('color','#35b558')
    },function(){
        tabed_ul.removeClass('tabClass');
        tabed_ul.find('.ul-arrow').hide();
        tabed_ul.find('.ul-arrow-outer').hide();
        $('.tn-first').eq(index+1).css('color','#666')
    });

});

/*******end**********/