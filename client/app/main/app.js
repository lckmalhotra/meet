/**
 * Created by Rumman on 1/12/2016.
 */


/*$(".program_table li").first().find('.time_detail').css("display","block");
 $(".program_table li").first().find('a').css("width","100%");*/

$(window).scroll(function(){
  var element=$("#speakers");
  var offset=element.offset().top-200;
  var currentScroll=$(window).scrollTop();
  if(currentScroll > offset){

    $( "span.begin").stop().animate({left:0},800);
    $( "span.end").stop().animate({right:"33px"},800);
    setTimeout(function(){
      $("ul.program_table").fadeIn(500);
    }, 500);


  }
  else if(currentScroll < offset){

    $( "span.begin").stop().animate({left:"40%"},800);
    $( "span.end").stop().animate({right:"45%"},800).promise().done(function () {
      $("ul.program_table").css("display","none");
    });


  }
});


$('.program_table li').mouseenter(function(){
  $(this).find('.time_detail').stop().slideDown(500);
}).mouseleave(function(){
  $(this).find('.time_detail').stop().slideUp(500);
})


