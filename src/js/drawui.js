(function ($) {
    $DOC = $(document);

    $.fn.drawUi = function (code, data, option) {
        if (!code || !data) return;

        return $(this).each(function () {
            const $this = $(this);

            if (code == 'SelfDiagnosisCheck') $this.setSelfDiagnosisCheck(data);
        });

    };

    $.fn.setSelfDiagnosisCheck = function (data) {
        return $(this).each(function () {
            const $this = $(this);
            $this.find('.g-txt').append(data.question.questionString);
            const arrCheck = data.check;

            console.log(data);

            let strCheck = '';
            arrCheck.forEach(function (obj) {
                strCheck += `<div class="rnd-checkbox"><label class="input-checkbox"><input type="checkbox"><span>${obj.choiceString}</span></label></div>`;
            });

            $this('.chk-list-wrap .inner').append(strCheck);
        });
    }
})(jQuery);