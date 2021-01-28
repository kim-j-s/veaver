(function ($) {
    // .layer-full-wrap .wrap
    // .layer-content
    const $DOC = $(document);
    const $WIN = $(window);
    // let WIN_HEIGHT = $WIN.height();
    // let WIN_WIDTH = $WIN.width();

    const baseHtml = '<div class="cv-inner">'
        + '<div class="cv-video"><video></video></div>'
        + '<div class="cv-ctrl">'
        + '<div class="cv-open-ctrl"></div>'
        + '<div class="cv-ctrl-box">'
        + '<button class="cv-btn-play"></button>'
        + '<button class="cv-btn-pause"></button>'
        + '<button class="cv-btn-close"></button>'
        + '<button class="cv-btn-fullscreen"></button>'
        + '<button class="cv-btn-exitfullscreen"></button>'
        + '<button class="cv-btn-back"></button>'
        + '<button class="cv-btn-forward"></button>'
        + '</div>'
        + '<div class="cv-progress-bar">'
        + '<div class="cv-track">'
        + '<div class="cv-bar"></div>'
        + '<div class="cv-head"></div>'
        + '<div class="cv-bar-control"></div>'
        + '</div>'
        + '</div>'
        + '<div class="cv-time">'
        + '<span class="cv-current"></span>'
        + '<span class="cv-duration"></span>'
        + '</div>'
        + '</div>'
        + '</div>';

    const checkMobile = (function () {
        const varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기

        if (varUA.indexOf('android') > -1) {
            //안드로이드
            return 'android';
        } else if (varUA.indexOf('iphone') > -1 || varUA.indexOf('ipad') > -1 || varUA.indexOf('ipod') > -1) {
            //IOS
            return 'ios';
        } else {
            //아이폰, 안드로이드 외
            return 'other';
        }
    })();

    function formatTime(seconds) {
        return [
            // parseInt(seconds / 60 / 60),
            parseInt(seconds / 60),
            parseInt(seconds % 60)
        ].join(":").replace(/\b(\d)\b/g, "0$1")
    }

    function checkVideoFe(src) {
        const arr = src.split('?')[0].split('.');
        return arr[arr.length - 1];
    }

    $.fn.customVideo = function (videoSrc, posterSrc) {
        if (!videoSrc) return;

        return this.each(function () {

            const wrap = this;
            const $wrap = $(this);
            const $layerContent = $wrap.closest('.layer-content');

            $wrap.addClass('custom-video');
            $wrap.empty();
            $wrap.append(baseHtml);

            const $inner = $wrap.find('.cv-inner');

            $wrap.addClass(checkMobile);

            const intervalTime = 100;

            const video = $wrap.find('video')[0];
            const $video = $(video);
            const $cvVideo = $inner.find('.cv-video');

            const $cvCtrl = $wrap.find('.cv-ctrl');

            const $cvOpenCtrl = $cvCtrl.find('.cv-open-ctrl');

            const $btnPlay = $cvCtrl.find('.cv-btn-play');
            const $btnPause = $cvCtrl.find('.cv-btn-pause');
            const $btnFullscreen = $cvCtrl.find('.cv-btn-fullscreen');
            const $btnExitFullscreen = $cvCtrl.find('.cv-btn-exitfullscreen');
            const $btnBack = $cvCtrl.find('.cv-btn-back');
            const $btnForward = $cvCtrl.find('.cv-btn-forward');
            const $btnClose = $cvCtrl.find('.cv-btn-close');

            const $curTime = $cvCtrl.find('.cv-current');
            const $durationTime = $cvCtrl.find('.cv-duration');
            const $cvBar = $cvCtrl.find('.cv-bar');
            const $cvBarControl = $cvCtrl.find('.cv-bar-control');
            const $cvHead = $cvCtrl.find('.cv-head');

            const fe = checkVideoFe(videoSrc);

            let isPlaying = false;

            if(posterSrc) {
                $cvVideo.after('<div class="cv-thumb"><img src="'+posterSrc+'"></div>');
            }

            if (fe == 'm3u8') {
                if (video.canPlayType('application/vnd.apple.mpegurl')) {
                    video.setAttribute('playsinline', true);
                    video.src = videoSrc;
                } else if (Hls.isSupported()) {
                    const hls = new Hls();
                    hls.loadSource(videoSrc);
                    hls.attachMedia(video);

                    hls.on(Hls.Events.ERROR, function (event, data) {
                        var errorType = data.type;
                        var errorDetails = data.details;
                        var errorFatal = data.fatal;

                        hls.destroy();
                    });
                }
            } else {
                video.setAttribute('playsinline', true);
                video.src = videoSrc;
            }

            let pbTimer = 0;

            const setCurrentTime = function () {
                $cvBar.css('width', (video.currentTime / video.duration) * 100 + '%');
                $cvHead.css('left', (video.currentTime / video.duration) * 100 + '%');
                $curTime.text(formatTime(video.currentTime));
            };

            // loadedmetadata
            video.addEventListener('loadedmetadata', function () {
                $curTime.text('00:00');
                $durationTime.text(formatTime(video.duration));

                if (checkMobile == 'ios') {
                    video.muted = true;
                    video.play();
                    video.pause();
                    video.muted = false;
                }

                video.currentTime = 0;
                $wrap.addClass('cv-canplay');
            });

            // on play
            let videoHeightRatio = 0;

            // video.ontimeupdate = function () {
            //     // console.log('The currentTime attribute has been updated. Again.');
            // };

            video.onplay = function () {
                isPlaying = true;
                $wrap.addClass('cv-playing');
                $wrap.addClass('cv-off-thumb');
                pbTimer = setInterval(setCurrentTime, intervalTime);

                if (!videoHeightRatio && video.videoHeight!=0) {
                    videoHeightRatio = video.videoHeight / video.videoWidth * 100;

                    $wrap.addClass('cv-set-height');
                    $wrap.css('padding-top', videoHeightRatio + '%');

                    let lcH = $layerContent.outerHeight();

                    $WIN.on('resize', function(e) {
                        lcH = $layerContent.outerHeight();
                    });

                    $layerContent.on('scroll', function (e) {
                        if($wrap.hasClass('cv-playing')) {
                            const t = $wrap.position().top;
                            const h = $wrap.outerHeight();

                            if(t+h <= 0 || t>=lcH) {
                                $wrap.addClass('cv-floating');
                            } else {
                                $wrap.removeClass('cv-floating');
                            }
                        }
                    });
                }
            };

            // on pause
            video.onpause = function () {
                isPlaying = false;
                $wrap.removeClass('cv-playing');
                if(video.currentTime == 0) {
                    $wrap.removeClass('cv-off-thumb');
                }
                clearInterval(pbTimer);
            };

            // cv-stop
            $wrap.on('cv-stop', function () {
                video.pause();
                $wrap.removeClass('cv-floating');
                // video.currentTime = 0;
                // setCurrentTime();
            });

            // on ended
            video.onended = function () {
                setCurrentTime();
                $wrap.removeClass('cv-off-thumb');
            }

            // play btn
            $btnPlay.on('click', function () {
                if($wrap.hasClass('cv-floating')) {
                    $('.cv-playing').trigger('cv-stop');
                } else {
                    $('.cv-playing, .cv-floating').trigger('cv-stop');
                }

                video.play();
            });

            // pause btn
            $btnPause.on('click', function () {
                video.pause();
            });

            // fullscreen btn
            $btnFullscreen.on('click', function () {
                if (checkMobile == 'ios') {
                    if (video.webkitEnterFullscreen) {
                        video.webkitEnterFullscreen();
                    } else if (video.webkitEnterFullscreen) {
                        video.enterFullscreen();
                    }
                    $wrap.addClass('cv-fullscreen');
                    $wrap.removeClass('cv-ctrl-open');
                } else {
                    if (wrap.requestFullscreen) {
                        wrap.requestFullscreen();
                    }
                }
            });

            if (checkMobile == 'ios') {
                video.addEventListener('webkitendfullscreen', function () {
                    $wrap.removeClass('cv-fullscreen');
                }, false);
            } else {
                $DOC.on('fullscreenchange', function () {
                    if (document.fullscreen) {
                        $wrap.addClass('cv-fullscreen');
                    } else {
                        $wrap.removeClass('cv-fullscreen');
                    }
                });
            }

            // exit fullscreen btn
            $btnExitFullscreen.on('click', function () {
                document.exitFullscreen();
            });

            // back(-3) btn
            $btnBack.on('click', function () {
                video.currentTime = video.currentTime - 3;
                setCurrentTime();
            });

            // forward(+3) btn
            $btnForward.on('click', function () {
                video.currentTime = video.currentTime + 3;
                setCurrentTime();
            });


            let ctrlTimer = null;

            $cvOpenCtrl.on('click', function () {
                if ($wrap.hasClass('cv-ctrl-open')) {
                    $wrap.removeClass('cv-ctrl-open');
                    clearTimeout(ctrlTimer);
                } else {
                    $wrap.addClass('cv-ctrl-open');
                    ctrlTimer = setTimeout(function () {
                        $wrap.removeClass('cv-ctrl-open');
                    }, 3000);
                }
            });

            $cvCtrl.on('mousedown touchstart', function (e) {
                if ($wrap.hasClass('cv-ctrl-open')) {
                    clearTimeout(ctrlTimer);
                }
            }).on('mouseup touchend', function (e) {
                if ($wrap.hasClass('cv-ctrl-open')) {
                    ctrlTimer = setTimeout(function () {
                        $wrap.removeClass('cv-ctrl-open');
                    }, 3000);
                }
            });


            // progress bar

            let startPercent = 0;
            let startX = 0;
            let tmStart = false;
            let startPx = 0;
            let rstW = 0;

            var setBar = function (e) {
                if (e.type == 'touchmove' || e.type == 'touchstart') {
                    rstW = startPercent + (e.touches[0].pageX - startX) / $cvBarControl.width() * 100;
                } else {
                    rstW = startPercent + (e.pageX - startX) / $cvBarControl.width() * 100;
                }

                if (rstW < 0) {
                    rstW = 0;
                } else if (rstW > 100) {
                    rstW = 100;
                }

                video.currentTime = video.duration * rstW / 100;

                setCurrentTime();
            };

            $cvBarControl.on('mousedown touchstart', function (e) {
                e.preventDefault();

                if (!tmStart) {
                    tmStart = true;
                    $cvHead.addClass('cv-arrow');
                    if (isPlaying) {
                        clearInterval(pbTimer);
                    }

                    if (e.type == "touchstart") {
                        startX = e.touches[0].pageX;
                        startPx = e.touches[0].pageX - $cvBarControl.offset().left;
                    } else {
                        startX = e.pageX;
                        startPx = e.pageX - $cvBarControl.offset().left;
                    }
                    startPercent = startPx / $cvBarControl.width() * 100;

                    setBar(e);
                }
            });

            $DOC.on('mousemove touchmove', function (e) {
                if (tmStart) {
                    e.preventDefault();

                    setBar(e);
                }
            });

            $DOC.on('mouseup touchend', function (e) {
                if (tmStart) {
                    e.preventDefault();

                    if (isPlaying) {
                        pbTimer = setInterval(setCurrentTime, intervalTime);
                    }
                    $cvHead.removeClass('cv-arrow');
                    tmStart = false;
                }
            });

            $btnClose.on('click', function () {
                $wrap.trigger('cv-stop');
            });
        });
    };
}(jQuery));