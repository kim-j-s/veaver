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

	// check-list
	chkListWrap();

	// 항목 체크 리스트 스크롤 처리
	chkListScroll();
	
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


// check-list
function chkListWrap() {
	var wrapHeight = $('.chk-list-cont').outerHeight();
	var trgHiehgt = $('.chk-list-wrap > .inner').outerHeight();
	//console.log(wrapHeight);
	//console.log(trgHiehgt);

	if ( $('.chk-list-cont').length > 0 ) {
		if (trgHiehgt > wrapHeight) {
			$('.chk-list-cont').addClass('ov-case down-dp');
		}
	}
}


// 항목 체크 리스트 스크롤 처리
function chkListScroll() {
	$('.chk-list-wrap').on('scroll', function(){
		if ( $(this).scrollTop() == 0 ) {	// 최상단 도달 시
			console.log('start');
			$(this).closest('.chk-list-cont').removeClass('up-dp');
		}
		/*
		 else if ( $(this).scrollTop() > 0 && $(this).scrollTop() + $(this).outerHeight() + 3 >= $(this)[0].scrollHeight ) {		// 지나가는 중
			console.log('middle');
			$(this).closest('.chk-list-cont').addClass('up-dp');
			$(this).closest('.chk-list-cont').addClass('down-dp');
		}
		*/

		 else if ( $(this).scrollTop() + $(this).outerHeight() >= $(this)[0].scrollHeight) {	// 바닥 도달 시
			console.log('end + ' + $(this).scrollTop());
			console.log('end + ' + $(this).outerHeight());
			console.log('end + ' + $(this)[0].scrollHeight);
			console.log('fin');
			$(this).closest('.chk-list-cont').removeClass('down-dp');
		}
		else if ( $(this).scrollTop() > 0 ) {		// 지나가는 중
			console.log('middle');
			$(this).closest('.chk-list-cont').addClass('up-dp');
			$(this).closest('.chk-list-cont').addClass('down-dp');
		}
	});



// up-dp.up-fin


}




