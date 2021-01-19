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

	// 우측 메뉴 버튼 display 처리
	if ( $('.floating-btns').length > 0 ) {
		floatBtns();
	}

	
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
	if ( $('.chk-list-cont').length > 0 ) {
		if (trgHiehgt > wrapHeight) {
			$('.chk-list-cont').addClass('ov-case down-dp');
		}
	}
}


// 항목 체크 리스트 스크롤 처리
function chkListScroll() {
	$('.chk-list-wrap').on('scroll', function(){
		var st = Math.floor($(this).scrollTop());
		var oh = Math.floor($(this).outerHeight());
		if ( st <= 0 ) {	// 최상단 도달 시
			$(this).closest('.chk-list-cont').removeClass('up-dp');
		}
		 else if ( st > 0 && st + oh + 3 < $(this)[0].scrollHeight ) {
			$(this).closest('.chk-list-cont').addClass('up-dp');
			$(this).closest('.chk-list-cont').addClass('down-dp');
		}
		 else if ( st + oh + 3 >= $(this)[0].scrollHeight) {
			$(this).closest('.chk-list-cont').removeClass('down-dp');
		}
	});
}


// 우측 메뉴 버튼 display 처리
function floatBtns() {
	var $flb = $('.floating-btns');
	var t;
    $('.layer-content, .chk-list-wrap').scroll(function () {
        $flb.addClass('on');
        setTimeout(function(){
        	$flb.hide();
        }, 500)
        if(t) clearTimeout(t);
        t = setTimeout(function () {
        	$flb.show();
            $flb.removeClass('on');
        }, 500);
    });
}
