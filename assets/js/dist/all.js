
$(function(){var mobileBreakpoint=500;$(window).on('resize',function(){if($(window).width()>mobileBreakpoint){$('.js-mainnav').find('.open').removeClass('open');resetChildButtons();}});$('.js-toggle-nav').on('click',function(e){e.preventDefault();$(this).toggleClass('open');$('.js-mainnav li').removeClass('open');$('.js-mainnav').toggleClass('open');resetChildButtons();});$('.js-mainnav li').each(function(idx,elm){var $child=$(this).find('ul').eq(0);if($child.length){$(this).children('a').addClass('children');$(this).children('a').after('<button class="js-toggle-children children-button">&#x25BC;</button>');}});$('.js-mainnav').on('click','.js-toggle-children',function(){$(this).toggleClass('open');setChildButton($(this));$(this).parent().toggleClass('open');});function setChildButton(elm){if($(elm).hasClass('open')){$(elm).html('&#x25B2;');}
else{$(elm).html('&#x25BC;');}}
function resetChildButtons(){$('.children-button').html('&#x25BC;');}
$('.js-mainnav > li').on('mouseover',function(){if($(window).width()<mobileBreakpoint)
return false;$(this).addClass('hover');positionChild(this);});$('.js-mainnav > li').on('mouseout',function(){if($(window).width()<mobileBreakpoint)
return false;$(this).removeClass('hover');var $child=$(this).find('ul').eq(0);$child.removeAttr('style');});if(Modernizr.touch){$('body').on('touchstart',function(e){$('#nav li').removeClass('hover');});$('.js-mainnav > li > a').on('touchstart',function(e){if($(window).width()<mobileBreakpoint||$(this).parent().hasClass('hover')){return true;}
$('#nav li').removeClass('hover');$(this).parent().addClass('hover');positionChild($(this).parent());return false;});$('.js-mainnav > li li a').on('touchstart',function(e){$(this).addClass('hover');window.location=e.target;return false;});}
function positionChild(elm){var $_this=$(elm);var $child=$(elm).find('ul').eq(0);$child.removeAttr('style');if($child.offset()!==undefined&&($child.offset().left+$child.width())>$(window).width()){$child.css({'left':'auto','right':0});}
else if($child.offset()!==undefined){var childWidth=$child.width()+parseInt($child.css('padding-left'))+parseInt($child.css('padding-right'));var diff=(childWidth)-($_this.width());if(diff>0){$child.css({'left':'-'+diff/2+'px'});}
if($child.offset().left<0){$child.removeAttr('style');}}}});