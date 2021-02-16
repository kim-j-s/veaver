(function ($) {
    $DOC = $(document);

    $.fn.drawUi = function (code, data, option) {
        if (!code || !data) return;

        return $(this).each(function () {
            const $this = $(this);

            if (code == 'setAutoCompleteList') $this.setAutoCompleteList(data);
            else if (code == 'setSelfDiagnosisCheck') $this.setSelfDiagnosisCheck(data);
            else if (code == 'setSelfDiagnosisResult') $this.setSelfDiagnosisResult(data);
            else if (code == 'setDiseaseDetailHead') $this.setDiseaseDetailHead(data);
            else if (code == 'setDetailCardView') $this.setDetailCardView(data);
            else if (code == 'setDiseaseSymptomSubject') $this.setDiseaseSymptomSubject(data);
            else if (code == 'setDrQAList') $this.setDrQAList(data);
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

            if(data.thumbnail) strHtml += `<div class="full-size-area"><img src="${data.thumbnail}"></div>`;

            strHtml += '<dl class="txt-cont">';

            if(data.name) strHtml += `<dt>${data.name}</dt>`;
            if(data.detail) strHtml += `<dd>${data.detail}</dd>`;

            strHtml += '</dl>';

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
                    if (obj.linkDetailId) {
                        let strHtml = `<div class="link-box"><a href="${obj.linkUrl}">`;
                        strHtml +=`<span class="word-box"><span class="txt">${obj.linkTitle}</span></span>`;
                        strHtml +=`<span class="lb-img"><img src="${obj.dataUrl}" alt="예시 이미지"></span>`;
                        strHtml +=`</a></div>`;
                        $this.append(strHtml);
                    } else if (!obj.linkDetailId && obj.linkUrl) {
                        $this.append(`<a href="${obj.linkUrl}" class="link"><span>${obj.linkTitle ? obj.linkTitle : obj.linkUrl}</span></a>`);
                    }
                } else if (obj.typeId == 'V') {
                    // V: 비디오 카드뷰
                    // * 브라우저 링크와 자체 컨텐츠 링 크 둘다 L 타입을 사용한다.
                    const video = document.createElement("div");
                    $this.append(video);

                    if(obj.videoThumbnailUrl) {
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

            // NI 질병정보
            // SI1 닥터QA
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
                        +(obj.thumbnail ? `<div class="st-img"><img src="${obj.thumbnail}" alt=""></div>` : '')
                        +`</div><button type="button" class="btn-bl">닥터의 소견</button></li>`);
            });
        });
    };

    // autocomplete list
    $.fn.setAutoCompleteList = function(data) {
        return $(this).each(function() {
            const $this = $(this);
            data.forEach(function (obj) {
                $this.append(`<li><a href="${obj.linkUrl}">${obj.hName}</a></li>`);
            });
        });
    }
})(jQuery);