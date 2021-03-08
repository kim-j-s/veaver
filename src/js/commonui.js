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

	//script ready
});


$(window).on('load', function () {
	// 공통 스크롤 표시 설정
	ScrollAreaChk();
})

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
function ScrollAreaChk() {
	var sudHeight = $('.scroll-ud').outerHeight();
	var sudInHiehgt = $('.scroll-ud-inner').outerHeight();
	if ($('.scroll-ud').length > 0) {
		if (sudInHiehgt > sudHeight) {
			$('.scroll-ud').addClass('ov-case down-dp');
			$('.scroll-ud-inner').addClass('on');
			console.log("1");
		} else {
			$('.scroll-ud').removeClass('ov-case down-dp');
			$('.scroll-ud-inner').removeClass('on');
			console.log("2");
		}
	}
}

$(window).on('resize', function () {
	$('.scroll-ud-inner').removeClass('on');
	setTimeout(function () {
		ScrollAreaChk();
	}, 10)
})


// 스크롤 화살표 표시
function ScrollActive() {
	$('.scroll-ud > *').on('scroll', function () {
		var st = Math.floor($(this).scrollTop());
		var oh = Math.floor($(this).outerHeight());
		if (st <= 0) {    // 최상단 도달 시
			$(this).closest('.scroll-ud').removeClass('up-dp');
		}
		else if (st > 0 && st + oh + 3 < $(this)[0].scrollHeight) {
			$(this).closest('.scroll-ud').addClass('up-dp');
			$(this).closest('.scroll-ud').addClass('down-dp');
		}
		else if (st + oh + 3 >= $(this)[0].scrollHeight) {
			$(this).closest('.scroll-ud').removeClass('down-dp');
		}
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
		} else if($targetWrap.hasClass('wrap')){
			$targetScroll = $targetWrap.find('.scroll-ud-inner');
		}

		if($targetScroll) {
			$targetScroll.off('scroll.floatingBtn').on('scroll.floatingBtn',function () {
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
				$this.addClass('on').html('닫기').attr('aria-expanded', true);
				$this.closest('li').addClass('on').find('.term-slide-cont').stop(true).slideDown(500);
			} else {
				$this.removeClass('on').html('열기').attr('aria-expanded', false);
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