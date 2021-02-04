(function ($) {
    $DOC = $(document);

    $.fn.drawUi = function (code, data, option) {
        if (!code || !data) return;

        return $(this).each(function () {
            const $this = $(this);

            if (code == 'setSelfDiagnosisCheck') $this.setSelfDiagnosisCheck(data);
            else if (code == 'setSelfDiagnosisResult') $this.setSelfDiagnosisResult(data);
            else if (code == 'setHealthMiningDetail') $this.setHealthMiningDetail(data);
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

    // 질병 정보
    $.fn.setHealthMiningDetailBody = function (data) {
        return $(this).each(function () {
            const $this = $(this);
            let strHtml = '';
            let strBadge = '';

            let imgSlideIdx = 0;

            data.forEach(function (obj) {
                console.log(obj);
                console.log(obj.typeId);
                console.log(obj.htmlText);
                if (obj.typeId == 'T') {
                    // T: 텍스트 카드뷰
                    // let strHtml = 
                    $this.append(`<div class="card-content">${obj.htmlText}</div>`);
                } else if (obj.typeId == 'I') {
                    // I: 이미지 카드뷰
                    if (obj.imgType == 'Y') {
                    } else {
                        $this.append(`<div class="full-img-area"><img src="${obj.dataUrl}" alt=""></div>`);
                    }
                } else if (obj.typeId == 'L') {
                    // L: 링크 카드뷰
                    // * 브라우저 링크와 자체 컨텐츠 링크 둘다 L 타입을 사용한다.
                } else if (obj.typeId == 'V') {
                    // V: 비디오 카드뷰
                    // * 브라우저 링크와 자체 컨텐츠 링크 둘다 L 타입을 사용한다.
                } else if (obj.typeId == 'D') {
                    // D: 다운로드 카드뷰
                }
            });
        });
    }
})(jQuery);