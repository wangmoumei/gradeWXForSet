var selectScroller = null;
$('#selectBox').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
	if($(this).hasClass('fadeIn')){
		var scroller = $('#selectScroller');
		if(scroller.find('.select-list').get(0).clientHeight>=250) {
			scroller.height(250);
			if(selectScroller)
				selectScroller.refresh();
			else 
				selectScroller = new fz.Scroll('#selectScroller', {
					scrollY: true
				});	
		}
		else{
			scroller.height(scroller.find('.select-list').get(0).clientHeight);
			selectScroller = new fz.Scroll('#selectScroller', {
				scrollY: true
			});	
		}
	}
})
$('#selectBoxClose').click(function(){
	$('#selectBox').removeClass('show fadeIn').addClass('fadeOut');
})