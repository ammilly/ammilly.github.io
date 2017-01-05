function stopMusic() {
    if ($('#playBtn').hasClass('rotate')) {
        document.querySelector('#playMusic').pause();
        $('#playBtn').removeClass('rotate');
        weddingCard.auto = 1;
    }
}
var weddingCard = {};
weddingCard.txtarea = '0';
weddingCard.feedName = '0';
weddingCard.guestTemplate = '1';
weddingCard.touchBody = '0';
weddingCard.winW = $(window).width();
weddingCard.winH = $(window).height();

weddingCard.writeCookie = function(name, value, hours) {
    var expire = "";
    if (hours != null) {
        expire = new Date((new Date()).getTime() + hours * 3600000);
        expire = "; expires=" + expire.toGMTString();
    }
    document.cookie = name + "=" + escape(value) + expire + ";path=/";
}

weddingCard.getCookie = function(cookieName) {
    var cookieValue = document.cookie;
    var cookieStartAt = cookieValue.indexOf("" + cookieName + "=");
    if (cookieStartAt == -1) {
        cookieStartAt = cookieValue.indexOf(cookieName + "=");
    }
    if (cookieStartAt == -1) {
        cookieValue = null;
    } else {
        cookieStartAt = cookieValue.indexOf("=", cookieStartAt) + 1;
        cookieEndAt = cookieValue.indexOf(";", cookieStartAt);
        if (cookieEndAt == -1) {
            cookieEndAt = cookieValue.length;
        }
        cookieValue = unescape(cookieValue.substring(cookieStartAt, cookieEndAt));
    }
    return cookieValue;
}

weddingCard.module = function(result) {
    if (result.data.music && result.data.music != '') {
        var _music = result.data.music;
        if (_music.img) {
            weddingCard.musicBtn = _music.img;
            $('#playBtn img').attr('src', weddingCard.musicBtn);
            console.log('music_img:' + weddingCard.musicBtn)
        }
        if (_music.audio) {
            $('#playBtn').show();
            weddingCard.audio = _music.audio;
            $('body').append('<audio id="playMusic" preload="load" autoplay loop src="' + weddingCard.audio + '">')

            var _myvideo = document.getElementById('playMusic'),
                _mytime = 0;
            _myvideo.addEventListener("timeupdate", function() {
                //_mytime = _myvideo.duration;
                if (_myvideo.currentTime > 0 && weddingCard.auto == undefined) {
                    weddingCard.auto = 1;
                    $('#playBtn').addClass('rotate')
                }
            });
        }
    }
    $(document).on('touchend', '#playBtn', function() {
        if ($(this).hasClass('rotate')) {
            document.querySelector('#playMusic').pause();
            $(this).removeClass('rotate');
            weddingCard.auto = 1;
        } else {
            document.querySelector('#playMusic').play();
            $(this).addClass('rotate');
        }
    });

    if (result.data.guest_template == 0) { weddingCard.guestTemplate = 0 }
    if (result.data.page_icon) {
        weddingCard.pageIcon = result.data.page_icon;
    }

    if (result.data.cardInfo) {
        weddingCard.writeCookie('_LatLngX', result.data.cardInfo.latitude);
        weddingCard.writeCookie('_LatLngY', result.data.cardInfo.longtitude);
        weddingCard.writeCookie('_add', result.data.cardInfo.place);
        weddingCard.writeCookie('_bride', result.data.cardInfo.bride_name);
        weddingCard.writeCookie('_groom', result.data.cardInfo.groom_name);
        wxShare.setWeiXinData({
            "appId": "",
            "imgUrl": '' + result.data.share_img + '?imageView2/2/w/200/h/200',
            "link": location.href,
            "desc": result.data.cardInfo.groom_name + '与' + result.data.cardInfo.bride_name + '要结婚了，诚挚邀请您光临。',
            "title": result.data.cardInfo.groom_name + '与' + result.data.cardInfo.bride_name + '的结婚邀请'
        });
    }


}

weddingCard.data = function() {
    // var _idv = weddingCard.getUrlParams();
    // weddingCard.cardId = _idv['card_id'];
    // weddingCard.speechId = _idv['speech_id'];
    // weddingCard.test = _idv['test'];
    // weddingCard.isPreview = _idv['isPreview'];

    // if (weddingCard.test == 'page') {
    //     weddingCard.url = weddingCard.api.page + weddingCard.cardId
    // } else if (weddingCard.test == 'template') {
    //     weddingCard.url = weddingCard.api.template + weddingCard.cardId
    // } else {
        weddingCard.url = weddingCard.api.card + weddingCard.cardId;
        if (weddingCard.speechId) { weddingCard.url += '/speech_id/' + weddingCard.speechId; }
    // }

    weddingCard.imgCont = [];
    $.ajax({
        url: weddingCard.url,
        type: 'get',
        success: function(result) {
            weddingCard.dataD = JSON.stringify(result.data.page);
            weddingCard.module(result);
            weddingCard.base();

            result.data.page.forEach(function(val, index) {
                console.log(val)
                val.layout.elements.forEach(function(v, i) {
                    if (weddingCard.cardId == 'NTUxNDMyZmlyZV9jbG91ZA')
                        weddingCard.imgCont.push(v.img + '?imageView2/2/w/640/q/100')
                    else
                        weddingCard.imgCont.push(v.img + '?imageView2/2/w/640/q/80')
                })
            })
            console.log(weddingCard.imgCont)
            weddingCard.loading(weddingCard.imgCont, function() {
                console.log('onloadimg完成')
            })
        }
    })
};

weddingCard.rans = function(len) {
    if (localStorage.getItem('rans')) {
        return localStorage.getItem('rans');
    } else {
        len = len || 32;　　
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/ 　　
        var maxPos = $chars.length;　　
        var pwd = '';　　
        for (i = 0; i < len; i++) {　　　　 pwd += $chars.charAt(Math.floor(Math.random() * maxPos));　　 }
        localStorage.setItem('rans', pwd);
    　　 return pwd;
    }　　
}

weddingCard.base = function() {
    $('#wrap').css({ 'width': weddingCard.winW, 'height': weddingCard.winH });
    var _size = weddingCard.winH / weddingCard.winW;
    if (weddingCard.winH / weddingCard.winW <= '1.63') {
        _size = '1.63';
    }

    var _html = '',
        _obj = [],
        r = 0,
        layTemplate = [],
        _pageCont = weddingCard.getUrlParams(),
        _p = parseInt(_pageCont['page']) - 1,
        _page;
    _page = JSON.parse(weddingCard.dataD);
    if (_p) { r = _p }
    for (var i = 0; i < _page.length; i++) {
        var _htmlIcon = '',
            _layout = _page[i].layout,
            _bgimg = '',
            $img = '';
        layTemplate.push(_page[i].layout.layTemplate);
        if (_page[i].layout.layTemplate == 'layTemplate_feedback') {
            weddingCard.fontColor = _page[i].layout.fontColor;
            weddingCard.iconColor = _page[i].layout.iconColor;
            weddingCard.hotelColor = _page[i].layout.hotelColor;
            weddingCard.sendColor = _page[i].layout.sendColor;
            weddingCard.reBgcolor = _page[i].layout.reBgcolor;
            weddingCard.valColor = _page[i].layout.valColor;
        }
        for (var s = 0; s < _layout.elements.length; s++) {
            var _animateAttr = '',
                _maskAttr = '',
                _img7n = '?imageView2/2/w/640/q/80';
            if (_layout.elements[s].delay) {
                _animateAttr = '-webkit-animation:' + _layout.elements[s].animate + ' 1000ms ease ' + _layout.elements[s].delay + ' both'
            }

            if (_layout.elements[s].mask) {
                _maskAttr = '-webkit-mask-image:url(' + _layout.elements[s].mask.img + ');-webkit-mask-size:100% 100%;';
                _img7n = '?imageView2/2/w/' + _layout.elements[s].mask.width + '/h/' + _layout.elements[s].mask.height + '/q/80'
            }

            if (_layout.elements[s].img) {
                $img = _layout.elements[s].img;
            } else { $img = _layout.elements[s].img; }

            var _x, _y, _w, _h, _r, _zOrder;
            if (_layout.elements[s].x) {
                _x = _layout.elements[s].x;
                _y = _layout.elements[s].y;
                _w = _layout.elements[s].width;
                _r = _layout.elements[s].rotate;
            }

            if (_layout.elements[s].z_order) {
                _zOrder = _layout.elements[s].z_order;
            }

            var _className = '',
                _xP,
                _zP = 0.00133 * weddingCard.winH;
            if (_size <= 1.63) {
                var _xpt = (weddingCard.winW * 1.63 - weddingCard.winH) / (10 / 3)
                _xP = parseInt(_x / _size * _zP) + _xpt
            } else { _xP = parseInt(_x / _size * _zP) }
            if (_layout.elements[s].className) { _className = _layout.elements[s].className }

            _htmlIcon += '<div class="icon ' + _className + ' ' + _layout.elements[s].animate + ' animated" style="top:' + _y / _size * _zP + 'px;left:' + _xP + 'px;' + _animateAttr + ';z-index:' + _zOrder + '"><img style="-webkit-transform:rotate(' + _r + 'deg);width:' + _w / _size * _zP + 'px;' + _maskAttr + '" src="' + $img + _img7n + '" ></div>';

        }
        if (_layout.backgroundHeader) {
            _bgimg = '<img style="position:absolute;top:0;left:0" src="' + _layout.backgroundHeader + '"><img style="position:absolute;bottom:0;left:0" src="' + _layout.backgroundFooter + '">'
        }

        _html = '<div class="lay-slide-bg">\
                                <img style="width:100%;height:100%" src="' + _layout.background + '?imageView2/2/w/640/q/80">' + _bgimg + '\
                              </div>\
                              <div class="lay-slide-cont  ' + _layout.layTemplate + '">' + _htmlIcon + '</div>';

        if (_layout.layTemplate == 'layTemplate_feedback') {
            _obj.push(_html);
            appHtml()
        } else {
            _obj.push(_html);
        }


    }

    function appHtml() {
        if (weddingCard.guestTemplate == 0) {
            return false }
        $('.lay-slide-cont').append('<div class="feedback_info slideUp">\
                        <div class="feedback_info_name">\
                            <div class="feed_bd">\
                                <em style="color:' + weddingCard.fontColor + '">您的真实姓名</em>\
                                <input id="feedName" value="名字" type="text" style="color:' + weddingCard.valColor + '">\
                            </div>\
                            <div class="wline"></div></div>\
                        <div class="feedback_info_status">\
                            <div class="feed_bd">\
                                <em style="color:' + weddingCard.fontColor + '">是否赴宴</em>\
                                <span class="feedstatus reply_a" status="0" style="color:' + weddingCard.valColor + '">赴宴</span>\
                            </div>\
                            <i class="status_more" style="background:' + weddingCard.iconColor + '">\
                                <img style="width:100%" src="http://qnm.hunliji.com/o_1ag7984u73ap1drhljdll71vmd1a.png">\
                            </i>\
                            <div class="wline"></div></div>\
                        <div class="feedback_info_num">\
                            <div class="feed_bd">\
                                <em style="color:' + weddingCard.fontColor + '">赴宴人数</em>\
                                <span class="feedstatus reply_b" status="1" style="color:' + weddingCard.valColor + '">1人</span>\
                            </div>\
                            <i class="num_more" style="background:' + weddingCard.iconColor + '">\
                                <img style="width:100%" src="http://qnm.hunliji.com/o_1ag7984u73ap1drhljdll71vmd1a.png">\
                            </i>\
                            <div class="wline"></div>\
                        </div>\
                    </div>\
                    <div class="feedback_msg slideUp">\
                        <h3 style="color:' + weddingCard.fontColor + '">对新人说些什么</h3>\
                        <div class="feedback_msg_txt" style="background:' + weddingCard.reBgcolor + '">\
                            <textarea id="msg_textarea" style="color:' + weddingCard.valColor + '">收到请帖，祝你们白头偕老</textarea>\
                        </div>\
                        <div class="ajaxBtn">\
                            <a class="ajaxBtn_send" style="width:100%;background:' + weddingCard.sendColor + '">立即发送</a>\
                        </div><div class="appdown" style="display:block;width:100%;text-align:center;margin:8px auto 0;padding:8px 0;color:#fff;background:' + weddingCard.hotelColor + '"><i>制作属于你的专属请帖</i></div>\
                    </div><a style="position:fixed;top:' + weddingCard.winW * 1.077 + 'px;right:0;width:27px;background: transparent;" class="ajaxBtn_map"><img src="http://qnm.hunliji.com/o_1akibk24386k1lk81tdn8ihfo87.png"></a>') //weddingCard.iconColor 

        var _pt = (weddingCard.winW * 1.63 - weddingCard.winH) / (10 / 3),
            _top = weddingCard.winH * 0.38;
        if (_size <= 1.63) {
            $('.feedback_info').css({ 'width': weddingCard.winH / _size * 0.67, 'top': _top + 'px', 'left': weddingCard.winH / _size * 0.1635 + _pt });
            $('.ajaxBtn').css({ 'margin-top': '20px' })
            if (weddingCard.winW <= 320) {
                $('.feedback_msg').css({ 'width': weddingCard.winH / _size * 0.67, 'top': _top + weddingCard.winH * 0.25 + 10 + 'px', 'left': weddingCard.winH / _size * 0.1635 + _pt });
                $('.ajaxBtn').css({ 'margin-top': '10px' })
            } else {
                $('.feedback_msg').css({ 'width': weddingCard.winH / _size * 0.67, 'top': _top + weddingCard.winH * 0.22 + 'px', 'left': weddingCard.winH / _size * 0.1635 + _pt });
            }

        } else {
            $('.feedback_info').css({ 'top': weddingCard.winH / _size * 0.66 + 'px', 'left': weddingCard.winH / _size * 0.1635 });

            $('.feedback_msg').css({ 'top': weddingCard.winH / _size * 1.008 + 'px', 'left': weddingCard.winH / _size * 0.1635 });

        }
        setTimeout(function() {
            if (weddingCard.nameCard) {
                $('#feedName').val(weddingCard.nameCard);
            }
            if (weddingCard.msgCard) {
                $('#msg_textarea').val(weddingCard.msgCard);
            }
            if (weddingCard.statuscont) {
                $('.reply_a').text(weddingCard.statuscont);
                $('.reply_a').attr('status', weddingCard.statustxt);
                if (weddingCard.statustxt != '0') { $('.feedback_info_num').hide(); }
            }
            if (weddingCard.numcont) {
                $('.reply_b').text(weddingCard.numcont);
                $('.reply_b').attr('status', weddingCard.numtxt);
            }
        }, 100)
        weddingCard.make = 0;
        $(document).on('touchend click touchstart', '.appdown', function() {
            if (weddingCard.make == 0) {
                weddingCard.sdkData({
                    action: 'make',
                    eventable_type: 'CardV3',
                    additional: {
                        ip: weddingCard.ip,
                        card_id: weddingCard.cardId,
                        num: weddingCard.rans(32)
                    }
                }, function() {
                    location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=me.suncloud.marrymemo&ckey=CK1329239858554";
                })
                weddingCard.make++;
            }

        })


        $(document).on('touchstart', '#msg_textarea', function() {
            function moveEnd(obj) {
                obj.focus();
                var len = obj.value.length;
                if (document.selection) {
                    var sel = obj.createTextRange();
                    sel.moveStart('character', len);
                    sel.collapse();
                    sel.select();
                } else if (typeof obj.selectionStart == 'number' && typeof obj.selectionEnd == 'number') {
                    obj.selectionStart = obj.selectionEnd = len;
                }

            }
            moveEnd(document.getElementById('msg_textarea'))
            if (weddingCard.txtarea == '0') {
                weddingCard.txtarea = '1';
                $(this).val('');
            }
            weddingCard.touchBody = '1';
            /*setTimeout(function(){
              weddingCard.touchBody='0';
            },1000)*/
        })

        $(document).on('blur', '#msg_textarea', function() {
            weddingCard.touchBody = '0'
        })

        $(document).on('touchend', '.lay-slide-bg', function() {
            $('#msg_textarea').blur()
            $('#feedName').blur()
        })


        $(document).on('touchstart', '#feedName', function() {
            $('#feedName').focus();
            if (weddingCard.feedName == '0') {
                weddingCard.feedName = '1';
                $(this).val('');
            }
            weddingCard.touchBody = '1';
            setTimeout(function() {
                weddingCard.touchBody = '0';
            }, 1000)

        })

        $(document).on('touchend', '.feedback_info_status', function() {
            if (weddingCard.statusCard != 1) {
                statusCard();
                $('#feedName').blur();
                $('#msg_textarea').blur();
            }
        })

        $(document).on('touchend', '.bgCard', function() {
            setStatus();
            weddingCard.tap = 0;
            return false
        })
        weddingCard.tap = 0;
        $(document).on('touchstart', '.feedback_info_num', function() {
            if (weddingCard.tap < 1) {
                weddingCard.tap += 1;
                numMore();
            }
        })

        $(document).on('touchend', '.statusbtn', function() {
            var _status = $(this).attr('status'),
                _statusC = $(this).text();
            weddingCard.statustxt = _status;
            weddingCard.statuscont = _statusC;

            if (_status == '1' || _status == '2') {
                $('.feedback_info_num').hide()
            } else {
                $('.feedback_info_num').show()
            }

            $('.reply_a').text(_statusC);
            $('.reply_a').attr('status', _status);
            setStatus();


        })

        $(document).on('touchend', '.numbtn', function() {
            var _status = $(this).attr('status'),
                _statusC = $(this).text();
            weddingCard.numtxt = _status;
            weddingCard.numcont = _statusC;
            $('.reply_b').text(_statusC);
            $('.reply_b').attr('status', _status);
            weddingCard.tap = 0;
            setStatus();
        })

        $(document).on('input propertychange', '#feedName', function() {
            weddingCard.nameCard = $(this).val();
        })

        $(document).on('input propertychange', '#msg_textarea', function() {
            weddingCard.msgCard = $(this).val();
        })

        $(document).on('touchend', '.ajaxBtn_map', function() {
            location.href = "http://www.hunliji.com/p/wedding/Public/wap/invitationCard/card_map.html";
        })
        weddingCard.numSend = 0;
        weddingCard.msgopend = 0;
        $(document).on('touchend', '.ajaxBtn_send', function() {
            if (weddingCard.numSend < 1 && weddingCard.msgopend == 0) {
                weddingCard.numSend++;
                replyData()
            }
        })


        function replyData() {
            if ($('#feedName').val() != '' && $('#feedName').val() != '名字' && $('#msg_textarea').val() != '') {
                weddingCard.name = $('#feedName').val();
                weddingCard.bless = $('#msg_textarea').val();
                weddingCard.replya = $('.reply_a').attr('status');
                weddingCard.replyb = $('.reply_b').attr('status');
                console.log(weddingCard.name, weddingCard.bless)
                replySend({
                    card_id: weddingCard.cardId,
                    name: weddingCard.name,
                    state: weddingCard.replya,
                    wish_language: weddingCard.bless,
                    count: weddingCard.replyb
                })
            } else {
                weddingCard.msg('请填写相关信息');
                setTimeout(function() { weddingCard.numSend-- }, 300)
            }
        }

        function replySend(_data) {
            console.log(1)
            $.ajax({
                url: weddingCard.api.reply,
                type: 'post',
                data: _data,
                success: function(result) {
                    console.log(result)
                    weddingCard.numSend--;
                    if (result.meta.status == 200) { weddingCard.msg('发送成功') }

                }
            })
        }

        function setStatus() {
            $('.status_card').css({ '-webkit-transform': 'translate3d(0, ' + weddingCard.winH + 'px, 0)' });
            $('.bgCard').css({ 'opacity': '0' });
            weddingCard.statusCard = 0;
            setTimeout(function() {
                $('.status_card').remove();
                $('.bgCard').remove();
            }, 600)
        }

        function statusCard() {
            weddingCard.statusCard = 1;
            var _html = '<div class="bgCard" style="position:fixed;top:0;left:0;bottom:0;right:0;-webkit-transition-duration:600ms;opacity:0;z-index:99998;background:rgba(0,0,0,0.5)"></div><div class="status_card" style="text-align:center;position:fixed;bottom:0;left:0;padding:' + weddingCard.winH * 0.05 + 'px 0;width:100%;background:#fff;z-index:99999;-webkit-transition-duration:600ms;-webkit-transform:translate3d(0,' + weddingCard.winH + 'px,0)">\
                        <p class="statusbtn" status="0">赴宴</p>\
                        <p class="statusbtn" style="margin:0 15px" status="1">待定</p>\
                        <p class="statusbtn" status="2">有事</p>\
                    </div>';
            $('body').append(_html);
            setTimeout(function() {
                $('.status_card').css({ '-webkit-transform': 'translate3d(0, 0, 0)' });
                $('.bgCard').css({ 'opacity': '1' });
                if (weddingCard.statustxt) {
                    $('.statusbtn').eq(weddingCard.statustxt).addClass('ept')
                } else {
                    $('.statusbtn').eq(0).addClass('ept')
                }
            }, 100)
        }

        function numMore() {
            weddingCard.statusCard = 1;
            var _html = '<div class="bgCard" style="position:fixed;top:0;left:0;bottom:0;right:0;-webkit-transition-duration:600ms;opacity:0;z-index:99998;background:rgba(0,0,0,0.5)"></div><div class="status_card" style="position:fixed;bottom:0;left:0;padding:' + weddingCard.winH * 0.05 + 'px 0;width:100%;text-align:center;background:#fff;z-index:99999;-webkit-transition-duration:600ms;-webkit-transform:translate3d(0,' + weddingCard.winH + 'px,0)">\
                        <p class="numbtn" status="1" >1人</p>\
                        <p class="numbtn" status="2" >2人</p>\
                        <p class="numbtn" status="3" >3人</p><br>\
                        <p class="numbtn" status="4" style="margin-top:16px;">4人</p>\
                        <p class="numbtn" status="5" style="margin-top:16px;">5人</p>\
                        <p class="numbtn" status="6" style="margin-top:16px;">6人</p>\
                    </div>';
            $('body').append(_html);
            setTimeout(function() {
                $('.status_card').css({ '-webkit-transform': 'translate3d(0, 0, 0)' });
                $('.bgCard').css({ 'opacity': '1' });
                if (weddingCard.numtxt) {
                    $('.numbtn').eq(weddingCard.numtxt - 1).addClass('ept')
                } else {
                    $('.numbtn').eq(0).addClass('ept')
                }
            }, 100)
        }

    }

    function action() {
        if (_p && _p == _page.length - 1) {
            appHtml()
        }
        weddingCard.touch('body', function() {
            if (weddingCard.auto != 1) {
                document.querySelector('#playMusic').play();
                $('#playBtn').addClass('rotate');
            }

        }, function() {
            if (weddingCard.touchBody == '1') {
                return false }
            if (endY > 0) {
                if (r > 0 && !$('body').hasClass('playOnload')) {
                    $('body').addClass('playOnload');
                    r--;
                    dom(_obj[r], function() {
                        setTimeout(function() {
                            $('.lay-slide-bg').show();
                            $('.lay-slide-cont').show();
                            $('.arrow-icon img').show()
                        }, 600)
                    });
                    $('.lay-slide').eq(1).css({ '-webkit-transform': ' translate3d(0, -' + weddingCard.winH + 'px, 0)' });
                    setTimeout(function() {
                        $('.lay-slide').eq(0).css({ 'top': weddingCard.winH + 'px' });
                        $('.lay-slide').eq(1).css({ '-webkit-transition-duration': '450ms', '-webkit-transform': 'translate3d(0, 0, 0)' });
                    }, 100);
                    setTimeout(function() {
                        $('.lay-slide').eq(0).remove();
                        $('body').removeClass('playOnload');
                    }, 700)
                }

            } else {
                if (r < _obj.length - 1 && !$('body').hasClass('playOnload')) {
                    $('body').addClass('playOnload');
                    r++;
                    dom(_obj[r], function() {
                        setTimeout(function() {
                            $('.lay-slide-bg').show();
                            $('.lay-slide-cont').show();
                            if (r == _page.length - 1) { appHtml();
                                $('.arrow-icon img').hide() }
                        }, 600)
                    });
                    $('.lay-slide').eq(1).css({ '-webkit-transform': ' translate3d(0, ' + weddingCard.winH + 'px, 0)' });
                    setTimeout(function() {
                        $('.lay-slide').eq(0).css({ '-webkit-transition-duration': '800ms', '-webkit-transform': 'scale(0.5)' });
                        $('.lay-slide').eq(1).css({ '-webkit-transform': 'translate3d(0, 0, 0)' });
                    }, 100);
                    setTimeout(function() {
                        $('.lay-slide').eq(0).remove();
                        $('body').removeClass('playOnload');
                    }, 700)
                }

            }
            console.log(endY)
        }, function() {})
    }

    function dom($html, func) {
        $('.wrap-main').append('<div class="lay-slide" style="width:' + weddingCard.winW + 'px;height:' + weddingCard.winH + 'px;">' + $html + '</div>');
        if (func) { func() }
    }
    dom(_obj[r], function() {
        var _imgs = [];
        for (var i = 0; i < $('.lay-slide img').length; i++) {
            _imgs.push($('.lay-slide img').eq(i).attr('src'))
        };
        _imgs.push($('.lay-slide img').eq(0).attr('src'));
        console.log(_imgs)
        weddingCard.loading(_imgs, function() {
            /* $('.lay-slide-cont').show();
             $('#wrap').show();
             $('.loadmore-loading').hide();
             if(weddingCard.pageIcon){
               $('.arrow-icon img').attr({'src':weddingCard.pageIcon});
               $('.arrow-icon').show()
             }else{$('.arrow-icon').show()}*/
        })
        setTimeout(function() {
            $('.lay-slide-cont').show();
            $('#wrap').show();
            $('.loadmore-loading').hide();
            if (weddingCard.pageIcon) {
                $('.arrow-icon img').attr({ 'src': weddingCard.pageIcon });
                $('.arrow-icon').show()
            } else { $('.arrow-icon').show() }
        }, 2000)
    })
    action();

}

weddingCard.loading = function(arr, func) {
    var _count = 0;
    for (var i = 0; i < arr.length; i++) {
        var _img = new Image();
        _img.onload = function() {
            _count++;
            if (_count >= arr.length) {
                if (func) { func() } }
        }
        _img.src = arr[i];
    }
}

weddingCard.msg = function(_cont) {
    $('body').append('<div class="msg slideUp animated" style="position:fixed;top:0;left:0;bottom:0;right:0;margin:auto;width:160px;height:100px;line-height:100px;text-align:center;background:rgba(0,0,0,0.6);color:#fff;font-size:14px;border-radius:10px;z-index:99999">' + _cont + '</div>');
    weddingCard.msgopend = 1;
    setTimeout(function() {
        $('.msg').removeClass('slideUp').addClass('fadeOutDown');
        setTimeout(function() {
            $('.msg').remove();
            weddingCard.msgopend = 0;
        }, 600)
    }, 1200)
}

weddingCard.touch = function(_obj, funStart, funMove, funEnd) {
    $(_obj).on('touchstart', function() { touchStart(event) });
    $(_obj).on('touchmove', function() { touchMove(event) });
    $(_obj).on('touchend', function() { touchEnd(event) })

    function touchStart(event) {
        event.preventDefault();
        var touch = event.touches[0];
        startY = touch.pageY;
        startX = touch.pageX;
        if (funStart) { funStart() }
    };

    function touchMove(event) {
        event.preventDefault();
        var touch = event.touches[0],
            _scrollMath;
        endY = touch.pageY - startY;
        if (funMove) { funMove() }

    };

    function touchEnd() {
        event.preventDefault();
        if (funEnd) { funEnd() }
    };
}

weddingCard.getUrlParams = function() {
    let urlParams;
    let match,
        pl = /\+/g,
        search = /([^&=]+)=?([^&]*)/g,
        decode = function(s) {
            return decodeURIComponent(s.replace(pl, " "));
        },
        query = window.location.search.substring(1);
    urlParams = {};
    while (match = search.exec(query)) {
        urlParams[decode(match[1])] = decode(match[2]);
    }
    return urlParams;
}

weddingCard.api = {
    'page': 'https://www.hunliji.com/p/wedding/index.php/Home/APIInvationV2/previewPage/id/',
    'template': 'https://www.hunliji.com/p/wedding/index.php/Home/APIInvationV2/previewTemplate/id/',
    'card': 'https://www.hunliji.com/p/wedding/index.php/Home/APIInvationV2/pageListByCardId/id/',
    'reply': 'https://www.hunliji.com/p/wedding/index.php/Home/APIInvationV2/reply',
    'sdkData': 'https://www.hunliji.com/v1/api/app/tracker/batch.json'
}

weddingCard.data();

weddingCard.sdkData = function(_data, _met) {
    var obj = '{"events":[' + JSON.stringify(_data) + ']}';
    if (weddingCard.isPreview == undefined) {
        $.ajax({
            url: weddingCard.api.sdkData,
            type: 'post',
            data: obj,
            success: function(result) {
                console.log(result)
                if (_met) { _met() }
            }
        })
    }

}

weddingCard.sdk = (function() {
    $.ajax({
        url: 'https://www.hunliji.com/sms/ip',
        type: 'get',
        success: function(result) {
            weddingCard.ip = result;
        }
    })

    setTimeout(function() {
        weddingCard.sdkData({
            action: 'view',
            eventable_type: 'CardV3',
            additional: {
                ip: weddingCard.ip,
                card_id: weddingCard.cardId,
                num: weddingCard.rans(32)
            }
        })
    }, 3000)
})()
