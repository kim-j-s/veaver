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

	// 공통 스크롤 표시 설정
	ScrollAreaChk();

	// 스크롤 화살표 표시
	ScrollActive();

	// 우측 메뉴 버튼 display 처리
	if ( $('.floating-btns').length > 0 ) {
		floatBtns();
	}

	// Nav Open Close
	MenuOpenClose()

	// slide
	slideEvent();

	//약관 전체동의
	termAllChk();

	// 약관 개별 체크
	termSingleChk();

	// 탭 스위퍼
	tabSwiper();

	// 더보기
	viewMoreDp();

	// swiper Gallery - 질병정보 상세 - 카드 컨텐츠
	gallerySwiper();

	// swiper Gallery - 병원목록 - 지도보기
	hostSwiper();

//script ready
});

// Nav Open Close
function MenuOpenClose() {
	$('.menu-open').on('click', function(){
		if ( !$(this).hasClass('on') ){
			$(this).addClass('on');
			$('nav').removeClass('off');
		} else {
			$(this).removeClass('on');
			$('nav').addClass('off');
		}
	});
}

// toggle Button
function toggleButton() {
	$(document).on('click', '.btn-s-toggle', function(){
		$(this).toggleClass('on');
	})
}

// input reset
function InputReset() {
	var $InpObj = $('input:text, input:password');
	var $btnRemove = $('.btn-remove');

	$InpObj.off('.InputReset');
	$btnRemove.off('.InputReset');

	// input reset
	$btnRemove.on('click.InputReset',function(){
		$(this).closest('.input-text').find('input').val('');
		$(this).hide();
	});

	// input reset button display
	$InpObj.on('keyup.InputReset', function(e) {
		var $this = $(this);
		if($this.val().length >= 1) {
			$this.closest('.input-text').find('.btn-remove').css('display','block');
		}
		if ( $this.val().length == 0 )
		{
			$this.next('.btn-remove').css('display','none');
		}
	});

	$InpObj.on('focus.InputReset',function(){
		if($(this).val().length >= 1) {
			$(this).closest('.input-text').find('.btn-remove').css('display','block');
		}
	});

	$btnRemove.on('blur.InputReset',function(){
		$(this).closest('.input-text').find('input').last().removeClass('focus');
		$(this).hide();
	});

	$btnRemove.on('focus.InputReset',function(){
		$(this).closest('.input-text').find('input').last().addClass('focus');
	});

	$InpObj.on('blur.InputReset',function(){
		obj = this;
		setTimeout(function(){
			if ( !$(obj).closest('.input-text').find('.btn-remove').is(':focus'))
			{
				$(obj).closest('.input-text').find('.btn-remove').hide();
			}
		}, 10);
	});
}


// 공통 스크롤 표시 설정
function ScrollAreaChk() {
	var sudHeight = $('.scroll-ud').outerHeight();
	//var sudInHiehgt = $('.scroll-ud-inner > *').outerHeight();
	var sudInHiehgt = $('.scroll-ud-inner').outerHeight();
	if ( $('.scroll-ud').length > 0 ) {
	    if (sudInHiehgt > sudHeight) {
	        $('.scroll-ud').addClass('ov-case down-dp');
	        $('.scroll-ud-inner').addClass('on');
	    } else {
	    	$('.scroll-ud').removeClass('ov-case down-dp');
	    	$('.scroll-ud-inner').removeClass('on');
	    }
	}
}

$(window).on('resize', function(){
	$('.scroll-ud-inner').removeClass('on');
	setTimeout(function(){
		ScrollAreaChk();	
	}, 10)
})


// 스크롤 화살표 표시
function ScrollActive() {
	$('.scroll-ud > *').on('scroll', function(){
	    var st = Math.floor($(this).scrollTop());
	    var oh = Math.floor($(this).outerHeight());
	    if ( st <= 0 ) {    // 최상단 도달 시
	        $(this).closest('.scroll-ud').removeClass('up-dp');
	    }
	     else if ( st > 0 && st + oh + 3 < $(this)[0].scrollHeight ) {
	        $(this).closest('.scroll-ud').addClass('up-dp');
	        $(this).closest('.scroll-ud').addClass('down-dp');
	    }
	     else if ( st + oh + 3 >= $(this)[0].scrollHeight) {
	        $(this).closest('.scroll-ud').removeClass('down-dp');
	    }
	});
}


// 우측 메뉴 버튼 display 처리
function floatBtns() {
	var $flb = $('.floating-btns');
	var t;
    $('.layer-content, .chk-list-wrap, .rst-list-wrap').scroll(function () {
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

//slide
function slideEvent() {
    $('.btn-slide-i').on('click', function(){
        var $this = $(this);
        if ( !$this.hasClass('on') ){
            $this.closest('.terms-wrap').find('.on').removeClass('on').find('.term-slide-cont').stop(true).slideUp(500);
            $this.addClass('on').html('닫기').attr('aria-expanded',true);
            $this.closest('li').addClass('on').find('.term-slide-cont').stop(true).slideDown(500);
        } else {
            $this.removeClass('on').html('열기').attr('aria-expanded',false);
            $this.closest('li').removeClass('on').find('.term-slide-cont').stop(true).slideUp(500);
        }
    })
}

//약관 전체동의
function termAllChk() {
	var chkAll = $('.chk-all');
	chkAll.on('click', function(){
	    if ( $(this).prop('checked') ) {
	        $('.terms-list').find("input[type='checkbox']").prop('checked',true);
	        $("[data-confirm='confirm']").prop('disabled',false);
	    } else {
	        $('.terms-list').find("input[type='checkbox']").prop('checked',false);
	        $("[data-confirm='confirm']").prop('disabled',true);
	    }
	});
}

// 약관 개별 체크
function termSingleChk() {
    var chkItem = $('.terms-list').find("input[type='checkbox']");
    var chkAllLng = $('.terms-list').find("input[type='checkbox']").length;
    var chkLng = $('.terms-list').find("input[type='checkbox']").not("input[type='checkbox'].exception").length;
    chkItem.on('click', function(){
        var allChked = $('.terms-list').find("input[type='checkbox']:checked").length;
        var chked = $('.terms-list').find("input[type='checkbox']:checked").not("input[type='checkbox'].exception").length;
        if ( $(this).prop('checked') ) {
            if ( chkLng == chked){
                $("[data-confirm='confirm']").prop('disabled',false);
            }
            if ( chkAllLng == allChked){
                $('.chk-all').prop('checked',true);
            }
        } else {
            if ( chkLng != chked){
                $('.chk-all').prop('checked',false);
                $("[data-confirm='confirm']").prop('disabled',true);
            }
            if (chkAllLng != allChked) {
                $('.chk-all').prop('checked',false);
            }
        }
    });
}

// tab swiper
function tabSwiper() {
	if ( $('.tab-menu-wrap').length > 0 ){
		var tabSwiper = new Swiper('.tab-menu-wrap', {
	        slidesPerView: 'auto',
	        observer: true,
	        observeParents: true,
	        speed: 500,
	    });
    }
}

// flaoting button 더보기 기능
function viewMoreDp() {
	$('.btn-view-more').click(function(){
	    if ( !$('.floating-btns').hasClass('fix') ) {
	        $(this).addClass('on');
	        $('.floating-btns').removeClass('out').addClass('fix');
	        setTimeout(function(){
	            $('.more-view-btns').addClass('on');
	        },10);
	    } else {
	        $(this).removeClass('on');
	        $('.more-view-btns').removeClass('on');
	        $('.floating-btns').addClass('out').removeClass('fix');
	    }
	})
}

// swiper Gallery - 질병정보 상세 - 카드 컨텐츠
function gallerySwiper() {
	if ( $('.gallery-swiper').find('.swiper-slide').length > 1 ){
        var gallerySwiper = new Swiper('.gallery-swiper', {
            observer: true,
            observeParents: true,
            speed: 500,
            spaceBetween: 20,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
            },
        });
    }
}

// swiper Gallery - 병원목록 - 지도보기
function hostSwiper() {
    if ( $('.hos-swiper').find('.swiper-slide').length > 1 ){
        var hostSwiper = new Swiper('.hos-swiper', {
            observer: true,
            observeParents: true,
            speed: 500,
            spaceBetween: 20,
            loop: true,
        });
    }
}


var $arrPop = [];
$.fn.openPop = function() {
	if($(this).length > 1) {
		return $(this);
	} else {
		return $(this).each(function(){
			var $this = $(this);
			$this.addClass('on');
			if($this.hasClass('on')) {
				$this.removeClass('on');
			} else {
				$this.addClass('on');
			}
		});
	}
};

// 로딩 보이기
function showLoading(txt) {
	$('.loading').remove();

	if(typeof txt == 'string') {
		// type 01
		$('body').append(
			`<div class="loading">
				<span></span>
				<span></span>
				<span></span>
				<div></div>
				<p>${txt}</p>
			</div>`
		);
	} else {
		// type 02
		$('body').append(
			`<div class="loading">
				<div></div>
			</div>`
		);
	}
}

// 로딩 숨기기
function hideLoading() {
	$('.loading').remove();
}