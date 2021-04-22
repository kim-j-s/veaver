$(function () {

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

	// 스크롤 화살표 표시
	ScrollActive();

	// 우측 메뉴 버튼 display 처리
	if ($('.floating-btns').length > 0) {
		floatBtns();
	}

	// Nav Open Close
	MenuOpenClose()

	// 탭 스위퍼
	tabSwiper();

	// swiper Gallery - 질병정보 상세 - 카드 컨텐츠
	// gallerySwiper();
	// drawui.js 에서 호출로 변경

	// swiper Gallery - 병원목록 - 지도보기
	hostSwiper();

	// 자녀선택
	choiceSwiper();

	// 날짜선택
	datepicker();

	// 크게보기 팝업
	viewSwiper();

	// 지도 보기 하단 리스트 토글
	listToggle();

	// 필터 슬라이드
	slide();

	// 주소 복사
	clipboard()

	//script ready
});


$(window).on('load', function () {
	// 공통 스크롤 표시 설정
	// ScrollAreaChk();
})


function clipboard() {
	var $copyText = $('.btn-copy');
	$copyText.off().on('click', function(){
		clearTimeout(clearToast);
		var $this = $(this);
		var copy = $this.prev().text();
		var $temp = '<input type="text" class="inp-copy">';
		var $toast = '<div class="toast-layer"><div class="toast-cont">주소 정보를 복사하였습니다.</div></div>';
		$('.toast-layer').remove();
		$('body').append($temp, $toast);
		$('.inp-copy').val(copy).select();
		document.execCommand("copy");
		$('.toast-layer').addClass('on');
		$('.inp-copy').remove();
		clearToast();		
	});
}

function clearToast(){
	clearToast = setTimeout(function(){
		$('.toast-layer').remove();
	},4000);
}

// Nav Open Close
function MenuOpenClose() {
	$('.menu-open').on('click', function () {
		if (!$(this).hasClass('on')) {
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
	$(document).on('click', '.btn-s-toggle', function () {
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
	$btnRemove.on('click.InputReset', function () {
		$(this).closest('.input-text').find('input').val('');
		$(this).hide();
	});

	// input reset button display
	$InpObj.on('keyup.InputReset', function (e) {
		var $this = $(this);
		if ($this.val().length >= 1) {
			$this.closest('.input-text').find('.btn-remove').css('display', 'block');
		}
		if ($this.val().length == 0) {
			$this.next('.btn-remove').css('display', 'none');
		}
	});

	$InpObj.on('focus.InputReset', function () {
		if ($(this).val().length >= 1) {
			$(this).closest('.input-text').find('.btn-remove').css('display', 'block');
		}
	});

	$btnRemove.on('blur.InputReset', function () {
		$(this).closest('.input-text').find('input').last().removeClass('focus');
		$(this).hide();
	});

	$btnRemove.on('focus.InputReset', function () {
		$(this).closest('.input-text').find('input').last().addClass('focus');
	});

	$InpObj.on('blur.InputReset', function () {
		obj = this;
		setTimeout(function () {
			if (!$(obj).closest('.input-text').find('.btn-remove').is(':focus')) {
				$(obj).closest('.input-text').find('.btn-remove').hide();
			}
		}, 10);
	});
}

// 공통 스크롤 표시 설정
// function ScrollAreaChk() {
// 	var sudHeight = $('.scroll-ud').outerHeight();
// 	var sudInHiehgt = $('.scroll-ud-inner').outerHeight();
// 	if ($('.scroll-ud').length > 0) {
// 		if (sudInHiehgt > sudHeight) {
// 			$('.scroll-ud').addClass('ov-case down-dp');
// 			$('.scroll-ud-inner').addClass('on');
// 			console.log("1");
// 		} else {
// 			$('.scroll-ud').removeClass('ov-case down-dp');
// 			$('.scroll-ud-inner').removeClass('on');
// 			console.log("2");
// 		}
// 	}
// }

// $(window).on('resize', function () {
// 	$('.scroll-ud-inner').removeClass('on');
// 	setTimeout(function () {
// 		ScrollAreaChk();
// 	}, 10)
// })


// 스크롤 화살표 표시
// function ScrollActive() {
// 	$('.scroll-ud > *').on('scroll', function () {
// 		var st = Math.floor($(this).scrollTop());
// 		var oh = Math.floor($(this).outerHeight());
// 		if (st <= 0) {    // 최상단 도달 시
// 			$(this).closest('.scroll-ud').removeClass('up-dp');
// 		}
// 		else if (st > 0 && st + oh + 3 < $(this)[0].scrollHeight) {
// 			$(this).closest('.scroll-ud').addClass('up-dp');
// 			$(this).closest('.scroll-ud').addClass('down-dp');
// 		}
// 		else if (st + oh + 3 >= $(this)[0].scrollHeight) {
// 			$(this).closest('.scroll-ud').removeClass('down-dp');
// 		}
// 	});
// }

// scroll 화살표
function ScrollActive() {
	$('.scroll-ud').each(function () {
		var $wrap = $('.scroll-ud');
		var $inner = $wrap.children('.scroll-ud-inner');

		if ($wrap.length != 1 || $inner.length != 1) {
			$wrap.removeClass('ov-case');
			return true;
		} else {
			$wrap.addClass('ov-case');
		}


		$inner.off('scroll.scrollud').on('scroll.scrollud', function (e) {
			var sct = $inner.scrollTop();
			var h = $inner.outerHeight();

			if (sct <= 0) {
				$wrap.removeClass('up-dp');
			} else {
				$wrap.addClass('up-dp');
			}

			if (sct >= this.scrollHeight - h) {
				$wrap.removeClass('down-dp');
			} else {
				$wrap.addClass('down-dp');
			}
		});

		$inner.trigger('scroll');
	});
}


// 우측 메뉴 버튼 display 처리
function floatBtns() {
	$('.floating-btns').each(function () {
		var $target = $(this);
		var $targetWrap = $target.parent();
		var $targetScroll = null;
		var t;
		if ($targetWrap.hasClass('bottom-pop')) {
			$targetScroll = $targetWrap.find('.bottom-pop-cont');
		} else if ($targetWrap.hasClass('wrap')) {
			$targetScroll = $targetWrap.find('.scroll-ud-inner');
		}

		if ($targetScroll) {
			$targetScroll.off('scroll.floatingBtn').on('scroll.floatingBtn', function () {
				$target.addClass('on');
				setTimeout(function () {
					$target.hide();
				}, 500)
				if (t) clearTimeout(t);
				t = setTimeout(function () {
					$target.show();
					$target.removeClass('on');
				}, 500);
			});
		}
	});

	// flaoting button 더보기 기능
	$('.btn-view-more').off('click.floatingBtn').on('click.floatingBtn', function () {
		var $this = $(this);
		var $wrap = $this.parent();
		if (!$wrap.hasClass('fix')) {
			$this.addClass('on');
			$wrap.removeClass('out').addClass('fix');
			setTimeout(function () {
				$wrap.find('.more-view-btns').addClass('on');
			}, 10);
		} else {
			$this.removeClass('on');
			$wrap.find('.more-view-btns').removeClass('on');
			$wrap.addClass('out').removeClass('fix');
			setTimeout(function () {
				$wrap.removeClass('out');
			}, 800);
		}
	})
}

// 약관 리스트
function termsWrap() {
	$('.terms-wrap').each(function () {
		const $target = $(this);

		$target.off('.termsWrap');

		$target.on('click.termsWrap', '.btn-slide-i', function () {
			var $this = $(this);

			if (!$this.hasClass('on')) {
				$this.closest('.terms-list').find('.on').removeClass('on').find('.term-slide-cont').stop(true).slideUp(500);
				$this.addClass('on');
				$this.closest('li').addClass('on').find('.term-slide-cont').stop(true).slideDown(500);
			} else {
				$this.removeClass('on');
				$this.closest('li').removeClass('on').find('.term-slide-cont').stop(true).slideUp(500);
			}
		}).on('input.termsWrap', 'input[type=checkbox]', function () {
			var $this = $(this);

			if ($this.hasClass('chk-all')) {
				// all check
				if ($this.prop('checked')) {
					$target.find('input[type=checkbox]').prop('checked', true);
				} else {
					$target.find('input[type=checkbox]').prop('checked', false);
				}
			}

			var $defaultCheck = $target.find('.terms-list input[type=checkbox]:not(.exception)');

			if ($defaultCheck.length == $defaultCheck.filter(':checked').length) {
				$target.closest('.layer-full-wrap, .wrap').find('.btn-bottom-area .btn-pu').prop('disabled', false);
			} else {
				$target.closest('.layer-full-wrap, .wrap').find('.btn-bottom-area .btn-pu').prop('disabled', true);
			}
		});
	});
}

// tab swiper
function tabSwiper() {
	if ($('.tab-menu-wrap').length > 0) {
		var tabSwiper = new Swiper('.tab-menu-wrap', {
			slidesPerView: 'auto',
			observer: true,
			observeParents: true,
			speed: 500,
		});
	}
}

// swiper Gallery - 질병정보 상세 - 카드 컨텐츠
function gallerySwiper($target) {
	$target.find('.gallery-swiper.swiper-container').each(function () {
		var $this = $(this);
		if ($this.find('.swiper-slide').length > 1) {
			new Swiper(this, {
				observer: true,
				observeParents: true,
				speed: 500,
				spaceBetween: 20,
				loop: true,
				pagination: {
					el: $this.find('.swiper-pagination')[0],
				},
			});
		}
	});
}

// swiper Gallery - 병원목록 - 지도보기
function hostSwiper() {
	if ($('.hos-swiper').find('.swiper-slide').length > 1) {
		var hostSwiper = new Swiper('.hos-swiper', {
			observer: true,
			observeParents: true,
			speed: 500,
			spaceBetween: 20,
			loop: true,
		});
	}
}

// 자녀선택
function choiceSwiper() {
	if ($('.choice-wrap').find('.swiper-slide').length > 1) {
		var childSwiper = new Swiper('.choice', {
			slidesPerView: 2,
			observer: true,
			observeParents: true,
			speed: 500,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
	}
}

// 날짜 선택
function datepicker() {
	$('.datepicker').pickadate({
		monthsShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		weekdaysShort: ['일', '월', '화', '수', '목', '금', '토'],
		showMonthsShort: true,
		today: '',
		clear: '',
		close: '닫기',
		format: 'yyyy/mm/dd',
		formatSubmit: 'yyyy/mm/dd',
		onRender: function () {
			var year = $('.datepicker').pickadate('picker').get('highlight', 'yyyy');
			var month = $('.datepicker').pickadate('picker').get('highlight', 'mm');
			//console.log(year, month);
			$('.picker__header').prepend(
				'<div class="picker__date-display">' +
				'<span class="picker__year-display">' + year + '년</span>' +
				'<span class="picker__month-display">' + month + '월</span>' +
				'</div>'
			);
		},
		// 달력 활성화 콜백
		onOpen: function () {
			$('.layer-full-wrap').css('display', 'block');
		},
		// 달력 비활성화 콜백
		onClose: function () {
			$('.layer-full-wrap').css('display', 'flex');
		},
	});
}


// 크게보기 슬라이드
function viewSwiper() {
	if ($('.view-img').find('.swiper-slide').length > 1) {
		var imgswiper = new Swiper('.view-img', {
			pagination: {
				el: '.view-swiper-pagination',
				type: 'fraction',
			}
		})

		// 슬라이드 안에 포함된 이미지의 src를 페이지 상단 다운로드쪽 경로로 교체
		imgswiper.on('slideChange', function () {
			var src = $('.swiper-slide').eq(imgswiper.realIndex).children('img').attr('src');
			$('.btn-black-download').attr('href', src);

		});
	} else {
		// 하단 페이징 display 처리용
		$('.btn-bottom-area.view').hide();
	}
}


// 필터 슬라이드
function slide() {
    var $this = $('[data-slide]');
    var time = 500;
    $this.on('click', function(){
        var $this = $(this);
        var data = $this.data('slide');
        var $cont = $('[data-slidecont="'+ data +'"]');
        console.log(data);

        if ( $cont.css('display') == 'block' ) {
            $this.removeClass('on');
            $cont.stop(true).slideUp(500);
        } else {
            $('[data-slide]').removeClass('on');
            $('[data-slidecont]').stop(true).slideUp(500);
            $this.addClass('on');
            $cont.stop(true).slideDown(500);
        }
    });
}

// 지도 보기 하단 리스트 토글
function listToggle() {
	$('.btn-ro-arrow').on('click', function () {
		$(this).toggleClass('on');
		$('.bottom-list-cont').toggleClass('on');
	})
}

var $arrPop = [];
// 팝업 열기
$.fn.openPop = function () {
	return $(this).addClass('opened');
};

// 팝업닫기
$.fn.closePop = function () {
	return $(this).removeClass('opened');
};

// 로딩 보이기
function showLoading(txt) {
	$('.loading').remove();

	if (typeof txt == 'string') {
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

// 오디오 플레이 스탑 버튼
$.fn.audioBtn = function (url) {
	if (!url) return;

	$(this).each(function () {
		const $target = $(this);
		$target.after(`<audio classs="hidden" src="${url}"></audio>`);

		const $audio = $target.next('audio');

		$audio.on('ended', function () {
			$target.removeClass('on');
		});

		$target.click(function (e) {
			if ($target.hasClass('on')) {
				$target.removeClass('on');
				$audio[0].pause();
				$audio[0].currentTime = 0;

			} else {
				$target.addClass('on');
				$audio[0].play();
			}
		});
	});
}

$.fn.wwsInit = function (params) {
	var $this = $(this);

	if ($this.length != 1) returnss;

	var $inner = $this.children('.wws-inner');

	if(params) {
		$inner.empty();
		params.forEach(function(v) {
			$inner.append(`<span class="wws-item">${v}</span>`);
		});
	}

	var $items = $inner.children('.wws-item');
	var lth = $items.length;
	var orgLth = lth;

	$this.addClass('no-motion');

	if (lth < 6 && lth > 2) {
		$items.each(function () {
			$inner.append($(this).clone());
		});
	} else if (lth == 2) {
		$items.each(function () {
			$inner.append($(this).clone());
		});
		$items.each(function () {
			$inner.append($(this).clone());
		});
	} else if (lth == 1) {
		for (var i = 0; i < 5; i++) $inner.append($items.eq(0).clone());
	}

	$items = $inner.children('.wws-item');
	lth = $items.length;

	$items.eq(0).addClass('crt');
	$items.eq(1).addClass('r1');
	$items.eq(2).addClass('r2');
	$items.eq(lth - 1).addClass('l1');
	$items.eq(lth - 2).addClass('l2');
	$items.eq(lth - 3).addClass('lst');

	var _moveToRight = function () {
		var l1Idx = $items.filter('.crt').index();

		var l2Idx = l1Idx - 1 < 0 ? lth - 1 : l1Idx - 1;
		var nxtIdx = l1Idx + 1 == lth ? 0 : l1Idx + 1;
		var r1Idx = nxtIdx + 1 == lth ? 0 : nxtIdx + 1;
		var r2Idx = r1Idx + 1 == lth ? 0 : r1Idx + 1;

		var lstIdx = $items.filter('.l2').index();

		$items.attr('class', 'wws-item');

		$items.eq(l2Idx).addClass('l2');
		$items.eq(l1Idx).addClass('l1');
		$items.eq(nxtIdx).addClass('crt');
		$items.eq(r1Idx).addClass('r1');
		$items.eq(r2Idx).addClass('r2');

		$items.eq(lstIdx).addClass('lst');

		$this.trigger('tabChange');
	};

	var _moveToLeft = function () {
		var r1Idx = $items.filter('.crt').index();

		var r2Idx = r1Idx + 1 == lth ? 0 : r1Idx + 1;
		var nxtIdx = r1Idx - 1 < 0 ? lth - 1 : r1Idx - 1;
		var l1Idx = nxtIdx - 1 < 0 ? lth - 1 : nxtIdx - 1;
		var l2Idx = l1Idx - 1 < 0 ? lth - 1 : l1Idx - 1;

		var lstIdx = $items.filter('.r2').index();

		$items.attr('class', 'wws-item');

		$items.eq(l2Idx).addClass('l2');
		$items.eq(l1Idx).addClass('l1');
		$items.eq(nxtIdx).addClass('crt');
		$items.eq(r1Idx).addClass('r1');
		$items.eq(r2Idx).addClass('r2');

		$items.eq(lstIdx).addClass('lst');

		$this.trigger('tabChange');
	};

	if (orgLth > 1) {
		$this.on('click', '.l1, .r1', function () {
			var $this = $(this);

			if ($this.hasClass('l1')) {
				_moveToLeft();
			} else if ($this.hasClass('r1')) {
				_moveToRight();
			}
		});

		var touchstartY = 0
			, touchstartX = 0
			, touchendX = 0
			, touchendY = 0
			, touchoffsetX = 0
			, touchoffsetY = 0;

		$this.on('touchstart', function (e) {
			var touch = e.touches[0];
			touchstartX = touch.clientX;
			touchstartY = touch.clientY;
		});

		$this.on('touchend', function (e) {
			if (e.touches.length == 0) {
				var touch = e.changedTouches[e.changedTouches.length - 1];
				touchendX = touch.clientX;
				touchendY = touch.clientY;

				touchoffsetX = touchendX - touchstartX;
				touchoffsetY = touchendY - touchstartY;

				if (Math.abs(touchoffsetX) >= 80 && Math.abs(touchoffsetY) <= 30) {
					if (touchoffsetX < 0) {
						// swipe left
						_moveToRight();
					}
					else {
						// swipe right
						_moveToLeft();
					}
				}
			}
		});
	}

	setTimeout(function () {
		$this.removeClass('no-motion');
	}, 0);
};