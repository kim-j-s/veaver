(function ($) {
    $DOC = $(document);

    $.fn.drawUi = function (code, data, option) {
        if (!code || !data) return;

        return $(this).each(function () {
            const $this = $(this);

            if (code == 'setSelfDiagnosisCheck') $this.setSelfDiagnosisCheck(data);
            else if (code == 'setSelfDiagnosisResult') $this.setSelfDiagnosisResult(data);
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

                if(rate >= 0.7) strBadge = '<span class="badge ty1">심각</span>';
                else if(rate >=0.3) strBadge = '<span class="badge ty2">위험</span>';
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
})(jQuery);