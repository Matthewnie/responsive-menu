$(function(){
	var mobileBreakpoint = 729;

	$('.mobilenav .menu').on('click', function(e){
	    e.preventDefault();
	    $('#nav').toggle().toggleClass('open');
	}); 

	$('#nav li').on('mouseover', function(){
	    if($(window).width()<mobileBreakpoint)
	        return false;
	    
	    $(this).addClass('sfhover');

	    var $_this = $(this);
	    var $child = $(this).find('ul').eq(0);

	    // if($child.offset() != undefined && $child.offset().left + $child.width() > $(window).width()){
	    // 	$child.css({
	    // 		'left': (($_this.width() + $_this.offset().left) - $child.outerWidth())+'px',
	    // 		'top': '44px',
	    // 		'position': 'absolute'
	    // 	});
	    // }
	});
	$('#nav li').on('mouseout', function(){
	    if($(window).width()<mobileBreakpoint)
	        return false;
	    
	    $(this).removeClass('sfhover');
	    // var $child = $(this).find('ul').eq(0);
	    // $child.removeAttr('style');
	});

	$('#nav > li > a').on('click', function(e){
	    if($(window).width()>600)
	        return true;

	    if($(this).parent().hasClass('open') || $(this).parent().children().length==1)
	        return true;
	    else{
	        e.preventDefault();
	        $('#nav').find('.open').removeClass('open');
	        $(this).parent().addClass('open');
	    }
	});
});
