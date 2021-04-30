(function ($) {
	const defaultOption = { //지도를 생성할 때 필요한 기본 옵션
		// center: new kakao.maps.LatLng(37.526715, 126.9173), //기본 동성빌딩
		center: new kakao.maps.LatLng(33.450701, 126.570667),
		level: 3 //지도의 레벨(확대, 축소 정도)
	};

	// 두 좌표(위도,경도) 사이 거리
	function getDistanceFromLatLonInKm(array) {
		var lat1 = array[0].getLat();
		var lng1 = array[0].getLng();
		var lat2 = array[1].getLat();
		var lng2 = array[1].getLng();

		function deg2rad(deg) {
			return deg * (Math.PI / 180)
		}
		var r = 6371; //지구의 반지름(km)
		var dLat = deg2rad(lat2 - lat1);
		var dLon = deg2rad(lng2 - lng1);
		var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = r * c; // Distance in km
		return Math.round(d * 1000);
	}

	// 현재 위치 마커
	var curImgSrc = '../img/ic-my-location.png', // 마커이미지의 주소입니다
		curImgSize = new kakao.maps.Size(14, 22), // 마커이미지의 크기입니다
		curImgOption = { offset: new kakao.maps.Point(7, 22) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

	var curImgImage = new kakao.maps.MarkerImage(curImgSrc, curImgSize, curImgOption);

	// 병원 기본 마커
	var hosImgSrc = '../img/ic-location-hospital-nor.png', // 마커이미지의 주소입니다
		hosImgSize = new kakao.maps.Size(32, 32), // 마커이미지의 크기입니다
		hosImgOption = { offset: new kakao.maps.Point(16, 16) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

	var hosImgImage = new kakao.maps.MarkerImage(hosImgSrc, hosImgSize, hosImgOption);

	// 병원 기본 선택 마커
	var sltHosImgSrc = '../img/ic-location-hospital-sel.png', // 마커이미지의 주소입니다
		sltHosImgSize = new kakao.maps.Size(44, 56), // 마커이미지의 크기입니다
		sltHosImgOption = { offset: new kakao.maps.Point(22, 50) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

	var sltHosImgImage = new kakao.maps.MarkerImage(sltHosImgSrc, sltHosImgSize, sltHosImgOption);

	// 병원 추천 마커
	var hosRecImgSrc = '../img/ic-location-hospital-rec-nor.png', // 마커이미지의 주소입니다
		hosRecImgSize = new kakao.maps.Size(30, 48), // 마커이미지의 크기입니다
		hosRecImgOption = { offset: new kakao.maps.Point(15, 20) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

	var hosRecImgImage = new kakao.maps.MarkerImage(hosRecImgSrc, hosRecImgSize, hosRecImgOption);

	// 병원 추천 선택 마커
	var sltHosRecImgSrc = '../img/ic-location-hospital-rec-sel.png', // 마커이미지의 주소입니다
		sltHosRecImgSize = new kakao.maps.Size(44, 74), // 마커이미지의 크기입니다
		sltHosRecImgOption = { offset: new kakao.maps.Point(22, 54) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

	var sltHosRecImgImage = new kakao.maps.MarkerImage(sltHosRecImgSrc, sltHosRecImgSize, sltHosRecImgOption);

	// 약국 기본 마커
	var phaImgSrc = '../img/ic-location-pharmacy-nor.png', // 마커이미지의 주소입니다
		phaImgSize = new kakao.maps.Size(32, 32), // 마커이미지의 크기입니다
		phaImgOption = { offset: new kakao.maps.Point(16, 16) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

	var phaImgImage = new kakao.maps.MarkerImage(phaImgSrc, phaImgSize, phaImgOption);

	// 약국 기본 선택 마커
	var sltPhaImgSrc = '../img/ic-location-pharmacy-sel.png', // 마커이미지의 주소입니다
		sltPhaImgSize = new kakao.maps.Size(44, 56), // 마커이미지의 크기입니다
		sltPhaImgOption = { offset: new kakao.maps.Point(22, 48) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

	var sltPhaImgImage = new kakao.maps.MarkerImage(sltPhaImgSrc, sltPhaImgSize, sltPhaImgOption);

	// 약국 기본 마커(영업X)
	var phaCloseImgSrc = '../img/ic-location-pharmacy-nor-off.png', // 마커이미지의 주소입니다
		phaCloseImgSize = new kakao.maps.Size(40, 40), // 마커이미지의 크기입니다
		phaCloseImgOption = { offset: new kakao.maps.Point(20, 20) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

	var phaCloseImgImage = new kakao.maps.MarkerImage(phaCloseImgSrc, phaCloseImgSize, phaCloseImgOption);

	// 약국 기본 선택 마커(영업X)
	var sltPhaCloseImgSrc = '../img/ic-location-pharmacy-sel-off.png', // 마커이미지의 주소입니다
		sltPhaCloseImgSize = new kakao.maps.Size(58, 70), // 마커이미지의 크기입니다
		sltPhaCloseImgOption = { offset: new kakao.maps.Point(29, 50) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

	var sltPhaCloseImgImage = new kakao.maps.MarkerImage(sltPhaCloseImgSrc, sltPhaCloseImgSize, sltPhaCloseImgOption);

	$.fn.initMap = function (options) {
		if (this.length != 1) return null;

		const container = this[0];
		const $container = $(container);

		this[0].innerHTML = ''; // 내부 비우기

		const opt = $.extend({}, defaultOption, options);
		const map = new kakao.maps.Map(container, opt);

		$container.append('<div class="map-pop-area full"></div>');

		const $popArea = $container.find('.map-pop-area');

		if (!options || !options.currentBtnDisable) {
			$popArea.append('<button type="button" class="btn-po-change">내 위치로 이동</button>');

			// 현재위치
			$popArea.find('.btn-po-change').on('click', function () {
				map.currentLocation(); // 현재위치
			});
		}



		const clusterer = new kakao.maps.MarkerClusterer({
			map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
			averageCenter: true, 	// 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
			minLevel: 4, // 클러스터 할 최소 지도 레벨
			disableClickZoom: true // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
		});

		kakao.maps.event.addListener(clusterer, 'clusterclick', function (cluster) {
			// 현재 지도 레벨에서 1레벨 확대한 레벨
			var level = map.getLevel() - 1;

			// 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
			map.setLevel(level, { anchor: cluster.getCenter() });
		});

		kakao.maps.event.addListener(map, 'bounds_changed', function () {
			map.radius = getDistanceFromLatLonInKm([map.getCenter(), map.getBounds().getSouthWest()]);

			var center = map.getCenter();
			map.centerLat = center.getLat(); // 위도
			map.centerLng = center.getLng(); // 경도
		});

		map.isIdling = false;

		kakao.maps.event.addListener(map, 'idle', function () {
			console.log('idle');

			clearInterval(map.boundChangeTimer);

			map.boundChangeTimer = setTimeout(function () {
				if (map.boundChangeEnd) map.boundChangeEnd(map);
			}, 300);
		});

		kakao.maps.event.addListener(map, 'dragend', function () {
			console.log('dragEnd');

			clearInterval(map.boundChangeTimer);

			if (map.boundChangeEnd) {
				map.boundChangeEnd(map);
			}
		});

		map.currentLocation = function (flag) {
			// HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
			if (navigator.geolocation) {
				// GeoLocation을 이용해서 접속 위치를 얻어옵니다
				navigator.geolocation.getCurrentPosition(function (position) {
					var locPosition = new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
					// 지도 중심을 이동 시킵니다
					map.setCenter(locPosition);
					if (flag) {
						map.setSimpleMark(position.coords.latitude, position.coords.longitude);
					}
				});

			} else {
				console.log('geolocation 을 지원하지 않는 브라우져입니다.');
			}
		};

		var bfMarker = null;

		map.setHospData = function (data) {
			data.forEach(function (obj) {
				var markerObj = {
					position: new kakao.maps.LatLng(Number(obj.yPos), Number(obj.xPos)),
					clickable: true,
					image: hosImgImage,
				};

				if (obj.isRcmd == 'Y') {
					console.log(obj.isRcmd);
					markerObj.image = hosRecImgImage;
				}

				var marker = new kakao.maps.Marker(markerObj);

				marker.data = obj;
				marker.is = 'hos';

				clusterer.addMarker(marker);

				kakao.maps.event.addListener(marker, 'click', function () {

					if (bfMarker && bfMarker.data.isRcmd == 'Y') {
						bfMarker.setImage(hosRecImgImage);
					} else if (bfMarker) {
						bfMarker.setImage(hosImgImage);
					}

					if (marker.data.isRcmd == 'Y') {
						marker.setImage(sltHosRecImgImage);
					} else {
						marker.setImage(sltHosImgImage);
					}

					bfMarker = marker;

					$popArea.find('.map-marker-info').remove();
					$popArea.append(`
							<div class="map-marker-info">
                                <div class="txt-cont04">
                                    <div class="t-case">
                                        <span>전문병원</span>
                                        <span>응급실</span>
                                        <span class="st-on">진료중</span>
                                    </div>
                                    <div class="q-txt">${marker.data.yadmNm}</div>
                                    <div class="d-info">
                                        <span class="font_02">전문의</span>
                                        <span class="font_01">내과, 소아과, 이비인후과, 치과, 정형외과</span>
                                    </div>
                                    <div class="d-info">
                                        <span>327km</span>
                                        <span>
                                            <span class="copy-addr">${marker.data.addr}</span>
                                            <button type="button" class="btn-copy">주소복사</button>
                                        </span>
                                    </div>
									${marker.data.isRcmd == 'Y' ? '<button type="button" class="btn-recommend">추천병원</button>' : ''}
                                </div>
                                <div class="more-cont">
                                    <div class="inner">
                                        <a href="tel:010-0000-0000">전화걸기</a>
                                        <a href="#">길찾기</a>
                                        <a href="#">더보기</a>
                                    </div>
                                </div>
                            </div>
						`);
				});
			});
		};

		map.delHospDataYkiho = function (v) {
			const markers = clusterer.getMarkers();
			for (let i = 0; i < markers.length; i++) {
				const d = markers[i].data.ykiho;
				if (d == v) {
					clusterer.removeMarker(markers[i]);
					console.log(clusterer.getMarkers().length);
					break;
				}
			}
		};

		map.setPharmData = function (data) {
			data.forEach(function (obj) {
				var markerObj = {
					position: new kakao.maps.LatLng(Number(obj.parmacy.wgs84Lat), Number(obj.parmacy.wgs84Lon)),
					clickable: true,
					image: phaImgImage
				};

				if (obj.parmacy.isOpen == "N") {
					markerObj.image = phaCloseImgImage;
				}

				var marker = new kakao.maps.Marker(markerObj);

				marker.data = obj;
				console.log(marker.data.parmacy.dutyName);
				marker.is = 'pha';
				clusterer.addMarker(marker);

				kakao.maps.event.addListener(marker, 'click', function () {
					if (bfMarker && bfMarker.data.parmacy.isOpen == 'N') {
						bfMarker.setImage(phaCloseImgImage);
					} else if (bfMarker) {
						bfMarker.setImage(phaImgImage);
					}

					if (marker.data.parmacy.isOpen == 'N') {
						marker.setImage(sltPhaCloseImgImage);
					} else {
						marker.setImage(sltPhaImgImage);
					}

					bfMarker = marker;

					$popArea.find('.map-marker-info').remove();
					$popArea.append(`
						<div class="map-marker-info">
							<div class="txt-cont04">
								<div class="t-case">
									<span class="st-on">영업</span>
								</div>
								<div class="q-txt">${marker.data.parmacy.dutyName}</div>
								<div class="d-info">
									<span>327km</span>
									<span>
										<span class="copy-addr">${marker.data.parmacy.dutyAddr}</span>
										<button type="button" class="btn-copy">주소복사</button>
									</span>
								</div>
							</div>
							<div class="more-cont">
								<div class="inner">
									<a href="tel:010-0000-0000">전화걸기</a>
									<a href="#">위치보기</a>
								</div>
							</div>
						</div>
					`);
				});
			});
		};

		map.delPharmDataHpid = function (v) {
			const markers = clusterer.getMarkers();
			for (let i = 0; i < markers.length; i++) {
				const d = markers[i].data.parmacy.hpid;
				if (d == v) {
					clusterer.removeMarker(markers[i]);
					console.log(clusterer.getMarkers().length);
					break;
				}
			}
		};

		map.setSimpleMark = function (lat, lon) {
			var pos = new kakao.maps.LatLng(lat, lon);
			var marker = new kakao.maps.Marker({
				position: pos,
				image: curImgImage
			});
			clusterer.addMarker(marker);
			map.setCenter(pos);
		};

		map.setCenterLatLon = function (lat, lon) {
			var pos = new kakao.maps.LatLng(lat, lon);
			map.setCenter(pos);
		};

		map.clearAll = function () {
			$popArea.find('.map-marker-info').remove();
			clusterer.clear();
		};

		map.clearInfoPop = function () {
			if (bfMarker) {
				if (bfMarker.is == 'hos') bfMarker.setImage(hosImgImage);
				else if (bfMarker.is == 'pha') bfMarker.setImage(phaImgImage);
			}
			$popArea.find('.map-marker-info').remove();
		};

		return map;
	};
}(jQuery));