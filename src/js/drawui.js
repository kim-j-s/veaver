(function ($) {
    $DOC = $(document);

    $.fn.drawUi = function (code, data, option) {
        if (!code || !data) {
            return;
        }

        return $(this).each(function () {
            const $this = $(this);

            if (code == 'setAutoCompleteList') $this.setAutoCompleteList(data);
            else if (code == 'setSelfDiagnosisCheck') $this.setSelfDiagnosisCheck(data);
            else if (code == 'setSelfDiagnosisResult') $this.setSelfDiagnosisResult(data);
            else if (code == 'setDiseaseDetailHead') $this.setDiseaseDetailHead(data);
            else if (code == 'setDrQADetailHead') $this.setDrQADetailHead(data);
            else if (code == 'setDrQADetailBot') $this.setDrQADetailBot(data);
            else if (code == 'setDetailCardView') $this.setDetailCardView(data);
            else if (code == 'setDiseaseSymptomSubject') $this.setDiseaseSymptomSubject(data);
            else if (code == 'setDrQAList') $this.setDrQAList(data);
            else if (code == 'setTermsList') $this.setTermsList(data);
            else if (code == 'setFindDiseaseList') $this.setFindDiseaseList(data);
            else if (code == 'setVaccineList') $this.setVaccineList(data);
            else if (code == 'setVaccineNote') $this.setVaccineNote(data);
            else if (code == 'setHospList') $this.setHospList(data);
            else if (code == 'setPharmList') $this.setPharmList(data);
        });

    };

    $.fn.setSelfDiagnosisCheck = function (data) {
        return $(this).each(function () {
            const $this = $(this);
            $this.find('.g-txt').append(data.question.questionString);
            const arrCheck = data.check;

            let strCheck = '';
            arrCheck.forEach(function (obj) {
                strCheck += `<div class="rnd-checkbox"><label class="input-checkbox"><input type="checkbox"><span>${obj.choiceString}</span></label></div>`;
            });

            $this('.chk-list-wrap .inner').append(strCheck);
        });
    };

    // 헬스큐 결과 리스트
    $.fn.setSelfDiagnosisResult = function (data) {

        return $(this).each(function () {
            const $this = $(this);
            const $rstList = $this.find('.rst-list');

            let strHtml = '';
            let strBadge = '';
            console.log(strHtml);


            data.forEach(function (obj) {
                const rate = obj.totalPoint / obj.count;

                if (rate >= 0.7) strBadge = '<span class="badge ty1">심각</span>';
                else if (rate >= 0.3) strBadge = '<span class="badge ty2">위험</span>';
                else strBadge = '<span class="badge ty3">주의</span>';

                strHtml += `
                    <li>
                        <div class="rst-list-cont">
                            <dl>
                                <dt>${strBadge}&nbsp;${obj.name}</dt>
                                <dd>${obj.detail}</dd>
                            </dl>
                            <div class="st-img">
                                <img src="${obj.thumbnail}" alt="">
                            </div>
                        </div>
                        <button type="button" class="btn-bl">질병 정보 확인하기</button>
                    </li>
                `;
            });

            $rstList.append(strHtml);
        });
    };

    // 질병 상세 탑
    $.fn.setDiseaseDetailHead = function (data) {
        return $(this).each(function () {
            let strHtml = '';

            if (data.thumbnail) strHtml += `<div class="full-size-area top"><img src="${data.thumbnail}"></div>`;

            strHtml += '<dl class="txt-cont">';

            if (data.name) strHtml += `<dt>${data.name}</dt>`;
            if (data.detail) strHtml += `<dd>${data.detail}</dd>`;

            strHtml += '</dl>';

            $(this).append(strHtml);
        });
    };

    // 닥터QA 상세 탑
    $.fn.setDrQADetailHead = function (data) {
        return $(this).each(function () {
            let strHtml = '';

            if (data.thumbnail) strHtml += `<div class="full-size-area top"><img src="${data.thumbnail}"></div>`;

            strHtml += '<div class="txt-cont03">';

            if (data.subject) strHtml += `<strong class="b-txt">${data.subject}</strong>`;
            if (data.detail) strHtml += `<div class="q-txt">${data.detail}</div>`;
            if (data.linkTxt) strHtml += `<a href="#" class="link02">${data.linkTxt}</a>`;

            strHtml += '</div>';

            $(this).append(strHtml);
        });
    };

    // 닥터QA 상세 바텀
    $.fn.setDrQADetailBot = function (data) {
        return $(this).each(function () {
            let strHtml = '';
            if (data.linkTxt) strHtml += `<a href="#" class="link02">${data.linkTxt}</a>`;

            $(this).append(strHtml);
        });
    };

    // 카드뷰 상세
    $.fn.setDetailCardView = function (data) {
        return $(this).each(function () {
            const $this = $(this);

            let $swiperSlide = null;

            data.forEach(function (obj) {
                if (obj.typeId == 'T') {
                    // T: 텍스트 카드뷰
                    $this.append(`<div class="card-content">${obj.htmlText}</div>`);
                } else if (obj.typeId == 'I') {
                    // I: 이미지 카드뷰
                    if (obj.imgType == 'Y') {
                        $this.append(`<div class="card-content"><div class="gallery-swiper swiper-container"><div class="swiper-wrapper"></div><div class="swiper-pagination"></div></div></div>`);
                        $swiperSlide = $this.find('.card-content .swiper-wrapper');
                        $swiperSlide.append(`<div class="swiper-slide"><a href="#"><img src="${obj.dataUrl}"></a></div>`);
                    } else if (!!obj.imgSeq && $swiperSlide.length) {
                        console.log("test=" + obj.imgSeq);
                        $swiperSlide.append(`<div class="swiper-slide"><a href="#"><img src="${obj.dataUrl}"></a></div>`);
                    } else {
                        $this.append(`<div class="full-img-area"><img src="${obj.dataUrl}" alt=""></div>`);
                    }
                } else if (obj.typeId == 'L') {
                    // L: 링크 카드뷰
                    // * 브라우저 링크와 자체 컨텐츠 링크 둘다 L 타입을 사용한다.
                    // NI 질병정보
                    // SI1 닥터QA
                    if (obj.link_typ=='2') {
                        let strHtml = `<div class="link-box"><a onclick="gourl('${obj.linkDetailId}');">`;
                        strHtml += `<span class="word-box">`;
                        if (obj.nisiType == 'SI1') {
                            // SI1 닥터QA
                            strHtml += `<strong class="b-tit">닥터 QA</strong>`;
                        } else if (obj.nisiType == 'NI') {
                            // NI 질병정보
                            strHtml += `<strong class="b-tit">질병정보</strong>`;
                        }
                        strHtml += `<span class="txt">${obj.Re_title}</span></span>`;
                        strHtml += `<span class="lb-img"><img src="${obj.Re_thumbnail}" alt="예시 이미지"></span>`;
                        strHtml += `</a></div>`;
                        $this.append(strHtml);
                    } else if(obj.link_typ=='1'){
                        $this.append(`<a onclick="gourl('${obj.linkDetailId}');" class="link"><span>${obj.linkTitle}</span></a>`);
                    } else if(obj.link_typ=='3') {
                        $this.append(`<a href="${obj.linkUrl ? obj.linkUrl : ''}"  class="link"><span>${obj.linkTitle ? obj.linkTitle : obj.linkUrl}</span></a>`);
                    }
                } else if (obj.typeId == 'V') {
                    // V: 비디오 카드뷰
                    // * 브라우저 링크와 자체 컨텐츠 링 크 둘다 L 타입을 사용한다.
                    const video = document.createElement("div");
                    $this.append(video);

                    if (obj.videoThumbnailUrl) {
                        $(video).addClass('card-content').customVideo(obj.dataUrl, obj.videoThumbnailUrl);
                    } else {
                        $(video).addClass('card-content').customVideo(obj.dataUrl);
                    }

                } else if (obj.typeId == 'D') {
                    // D: 다운로드 카드뷰
                } else {
                }
            });

            // swiper img();
            gallerySwiper($this);
        });
    };

    // 질병 증상 & 진료과
    $.fn.setDiseaseSymptomSubject = function (data) {
        return $(this).each(function () {
            const $this = $(this);

            // 증상
            if (data.Symptom.length > 0) {
                let strHtml = '<h3 class="tit-h3">증상</h3><div class="rnd-group"><div class="scroll-x">';
                data.Symptom.forEach(function (v) {
                    strHtml += `<span class="btn-rnd-gr on">${v}</span>`;
                });
                strHtml += '</div></div>';

                $this.append(strHtml);
            }

            // 진료과
            if (data.Subject.length > 0) {
                let strHtml = '<h3 class="tit-h3">진료과</h3><div class="rnd-group"><div class="scroll-x">';
                data.Subject.forEach(function (v) {
                    strHtml += `<button type="button" class="btn-rnd-gr on">${v}</button>`;
                });
                strHtml += '</div></div>';

                $this.append(strHtml);
            }
        });
    };

    // 닥터QA 리스트
    $.fn.setDrQAList = function (data) {
        return $(this).each(function () {
            const $this = $(this);
            data.forEach(function (obj) {
                $this.append(`<li><div class="rst-list-cont"><div class="q-txt">${obj.title}</div>`
                    + (obj.thumbnail ? `<div class="st-img"><img src="${obj.thumbnail}" alt=""></div>` : '')
                    + `</div><button type="button" class="btn-bl">닥터의 소견</button></li>`);
            });
        });
    };

    // autocomplete list
    $.fn.setAutoCompleteList = function (data) {
        return $(this).each(function () {
            const $this = $(this);
            data.forEach(function (obj) {
                $this.append(`<li><a href="${obj.linkUrl}">${obj.hName}</a></li>`);
            });
        });
    };

    // 약관 리스트
    $.fn.setTermsList = function (data) {
        return $(this).each(function () {
            const $target = $(this).find('.terms-list');
            data.forEach(function (obj) {
                const txt = typeof obj.content == 'string' ? obj.content.replaceAll('\n', '<br>') : '';

                $target.append(`<li>
                    <div class="term-cont-h">
                        <label class="input-checkbox">
                            <input type="checkbox" class="${obj.kind == 1 ? '' : 'exception'}"><span>${obj.title} ${obj.kind == 1 ? '(필수)' : '(선택)'}</span>
                        </label>
                        <button type="button" class="btn-slide-i" aria-expanded="false">열기</button>
                    </div>
                    <div class="term-slide-cont">${txt}</div>
                </li>`);
            });

            termsWrap();
        });
    };

    // 약관 리스트
    $.fn.setFindDiseaseList = function (data) {
        return $(this).each(function () {
            const $target = $(this);
            data.forEach(function (obj) {
                $target.append(`<li>
                    <div class="rst-list-cont">
                        <dl>
                            <dt>${obj.hName}</dt>
                            <dd>${obj.hDesc}</dd>
                        </dl>
                        <div class="st-img">
                            <img src="${obj.thumbnail}" alt="">
                        </div>
                    </div>
                    <button type="button" class="btn-bl">질병 정보 확인하기</button>
                </li>`);
            });
        });
    };

    // 접종 리스트
    $.fn.setVaccineList = function (data) {
        return $(this).each(function () {
            const $target = $(this);
            let bfNm = "";
            data.forEach(function (obj) {
                let htmlText = `<li><div class="front"><a href="#">
                        <span class="txt">${obj.대상감염병 ? obj.대상감염병 : bfNm} [${obj.접종명}]</span>
                        <span class="ing-box">`;

                bfNm = obj.대상감염병 ? obj.대상감염병 : bfNm;

                obj.백신종류및방법.forEach(function (v) {
                    htmlText += Number(v.접종여부) == 1 ? '<span class="on"></span>' : '<span></span>';
                });

                htmlText += `</span></a></div></li>`;

                $target.append(htmlText);
            });
        });
    };

    // 접종 수첩
    $.fn.setVaccineNote = function (data) {
        return $(this).each(function () {
            const $target = $(this);

            $target.empty();

            $target.append('<div class="swiper-wrapper"></div><div class="swiper-pagination"></div>');

            const $swiperWrapper = $target.find('.swiper-wrapper');
            const $swiperPagination = $target.find('.swiper-pagination');

            data.forEach(function (obj) {
                let htmlText = `<div class="swiper-slide"><ul class="list-05">`;

                for (let k in obj) {
                    htmlText += `<li>
                        <div class="front txt">${k}</div>
                        <div class="right-ty txt2">${obj[k]}</div>
                    </li>`;
                }

                htmlText += `</ul></div>`;

                $swiperWrapper.append(htmlText);
            });

            var stepSwiper = new Swiper($target[0], {
                observer: true,
                observeParents: true,
                speed: 500,
                spaceBetween: 20,
                loop: true,
                pagination: {
                    el: $swiperPagination[0],
                    clickable: true,
                    renderBullet: function (index, className) {
                        return '<span class="' + className + '">' + data[index].접종차수 + '</span>';
                    },
                },
            });
        });
    };

    // 병원 리스트
    $.fn.setHospList = function (data) {
        return $(this).each(function () {
            const $target = $(this);

            data.forEach(function (obj) {
                $target.append(`
                    <li>
                        <div class="txt-cont04">
                            <div class="t-case">
                                <span>전문병원</span>
                                <span>진료중</span>
                                <span>응급실</span>
                            </div>
                            <div class="q-txt">${obj.yadmNm}</div>
                            <div class="d-info">
                                <span>327km</span>
                                <span>${obj.addr}</span>
                            </div>
                            <div class="sort-txt">전문의</div>
                        </div>
                        <div class="more-cont">
                            <div class="inner">
                                <a href="tel:${obj.telno}">전화걸기</a>
                                <a href="#">길찾기</a>
                                <a href="#">더보기</a>
                            </div>
                        </div>
                    </li>
                `);
            });
        });
    };

    // 약국 리스트
    $.fn.setPharmList = function (data) {
        return $(this).each(function () {
            const $target = $(this);

            data.forEach(function (obj) {
                $target.append(`
                    <li>
                        <div class="txt-cont04">
                            <div class="t-case">
                                <span>영업중</span>
                            </div>
                            <div class="q-txt">${obj.dutyName}</div>
                            <div class="d-info">
                                <span>327km</span>
                                <span>${obj.dutyAddr}</span>
                            </div>
                        </div>
                        <div class="more-cont">
                            <div class="inner">
                                <a href="tel:${obj.dutyTel1}">전화걸기</a>
                                <a href="#">길찾기</a>
                            </div>
                        </div>
                    </li>
                `);
            });
        });
    };
})(jQuery);