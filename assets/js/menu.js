$(function(){
	//Set mobile breakpoint for navigation
	var mobileBreakpoint = 767;

	$('.js-toggle-nav').on('click', function(e){
	    e.preventDefault();
	    $(this).toggleClass('open');
	    $('#nav li').removeClass('open');
	    $('#nav').toggleClass('open');

	    $('.children-button').html('&#x25BC;');
	  
	}); 

	// Find & flag links with children
	$('#nav li').each(function(idx, elm){
	    var $child = $(this).find('ul').eq(0);
	    if($child.length){
	    	$(this).children('a').addClass('children');

	    	$(this).children('a').after('<button class="js-toggle-children children-button">&#x25BC;</button>');
	    }
	});

	// Listen for toggle click on mobile
	$('#nav').on('click', '.js-toggle-children', function(){
		$(this).toggleClass('open');
		if($(this).hasClass('open')){
			$(this).html('&#x25B2;');
		}
		else {
			$(this).html('&#x25BC;');
		}
		$(this).parent().toggleClass('open');
	});

	// Add hover
	// Position dropdown
	$('#nav > li').on('mouseover', function(){
	    if($(window).width()<mobileBreakpoint)
	        return false;
	    
	    $(this).addClass('hover');

	    positionChild(this);
	});

	// Remove hover
	// Remove position
	$('#nav > li').on('mouseout', function(){
	    if($(window).width()<mobileBreakpoint)
	        return false;
	    $(this).removeClass('hover');
	    var $child = $(this).find('ul').eq(0);
	    $child.removeAttr('style');
	});

	// Start touch events
	if(Modernizr.touch){
		// Allows dropdown to close
		// Probably a better way to accomplish, but works for the time being
		$('body').on('touchstart', function(e){
			$('#nav li').removeClass('hover');
		});

		// Open dropdown on tap
		// Position dropdown
		$('#nav > li > a').on('touchstart', function(e){
		    if($(window).width()<mobileBreakpoint || $(this).parent().hasClass('hover')){
		        return true;
		    }
		    
		    $('#nav li').removeClass('hover');
		    $(this).parent().addClass('hover');
		    positionChild($(this).parent());
		    return false;
		});	
		// Allow dropdown links to be clicked
		$('#nav > li li a').on('touchstart', function(e){
			$(this).addClass('hover');
			window.location = e.target;
	        return false;
		});	
	}

	// Position the dropdown
	function positionChild(elm){
		var $_this = $(elm);
		var $child = $(elm).find('ul').eq(0);

		$child.removeAttr('style');

		//Make sure element doesn't go off the right side of the screen
		if($child.offset() !== undefined && $child.offset().left + $child.width() > $(window).width()){
			$child.css({
				'left': 'auto',
				'right': 0
			});
		}
		// center dropdown with parent
		else if($child.offset() !== undefined){
			var diff = ($child.width()+40) - ($_this.width());

			if(diff > 0){
				$child.css({'left': '-'+diff/2 + 'px'});
			}
			//Make sure centering doesn't take element off the left side of screen
			if($child.offset().left < 0){
				$child.removeAttr('style');
			}
		}
	}
});