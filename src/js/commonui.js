$(function(){
	
	/* ==============================
	 * common
	 * ============================== */


	 /* ==============================
	 * content
	 * ============================== */
	// toggle Button
	toggleButton();

	// input reset
	InputReset();
	
//script ready
});


// toggle Button
function toggleButton() {
	$(document).on('click', '.btn-s-toggle', function(){
		$(this).toggleClass('on');
	})
}

// input reset
function InputReset() {
	// input reset
	$('.btn-remove').click(function(){
		$(this).closest('.input-text').find('input').val('');
		$(this).hide();
	});

	// input reset button display
	var InpObj = $('input:text, input:password');
	$(InpObj).on('keyup', function(e) {
		if($(this).val().length >= 1) {
			$(this).closest('.input-text').find('.btn-remove').css('display','block');
		}
		if ( $(this).val().length == 0 )
		{
			$(this).next('.btn-remove').css('display','none');
		}
	});

	$(InpObj).unbind('focusin').focusin(function(){
		if($(this).val().length >= 1) {
			$(this).closest('.input-text').find('.btn-remove').css('display','block');
		}
	});

	$('.btn-remove').unbind('focusout').focusout(function(){
		$(this).closest('.input-text').find('input').last().removeClass('focus');
		$(this).hide();
	});

	$('.btn-remove').unbind('focusin').focusin(function(){
		$(this).closest('.input-text').find('input').last().addClass('focus');
	});

	$(InpObj).unbind('focusout').focusout(function(){
		obj = this;
		setTimeout(function(){
			if ( !$(obj).closest('.input-text').find('.btn-remove').is(':focus'))
			{
				$(obj).closest('.input-text').find('.btn-remove').hide();
			}
		}, 10);
	});
}