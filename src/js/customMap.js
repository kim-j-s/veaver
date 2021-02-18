(function ($) {
	const defaultOption = { //지도를 생성할 때 필요한 기본 옵션
		// center: new kakao.maps.LatLng(37.526715, 126.9173), //기본 동성빌딩
		center: new kakao.maps.LatLng(33.450701, 126.570667),
		level: 3 //지도의 레벨(확대, 축소 정도)
	};

	$.fn.initMap = function (options) {
		if (this.length != 1) return null;

		const container = this[0];

		this[0].innerHTML = ''; // 내부 비우기

		const opt = $.extend({}, defaultOption, options);
		const map = new kakao.maps.Map(container, opt);

		return {
			currentLocation : function () {
				// HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
				if (navigator.geolocation) {

					// GeoLocation을 이용해서 접속 위치를 얻어옵니다
					navigator.geolocation.getCurrentPosition(function (position) {
						var locPosition = new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
						// 지도 중심을 이동 시킵니다
						map.setCenter(locPosition);
					});

				} else {
					console.log('geolocation 을 지원하지 않는 브라우져입니다.');
				}
			},
		};
	};
}(jQuery));