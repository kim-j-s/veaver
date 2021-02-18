(function ($) {
	$.fn.initMap = function(options) {
		const container = this;
		const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
	};
}(jQuery));