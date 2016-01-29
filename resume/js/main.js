(function(window,document,$,undefined){

    'use strict';
    $(function(){
        $.fn.MyPersonal = function(options){

            var settings = $.extend({
                id : '#czm_nav',
                time : 500
            },options),
                self = this;

            this.init = function(){
                $('#home').addClass('active_0');
                self.nav(settings.id);
                self.scrollInit();
                self.scrollDown();
            };

            this.scrollDown = function() {
                $('.scroll_down').on('click',function(e){
                    var target = $(this);
                    self.pageScroll(target);
                    e.preventDefault();
                });
            };

            this.nav = function(id){
                var $navBtn = $(id + ' ul li');
                $navBtn.on('click',function(e){
                    var oLi = $(this),
                        target = oLi.find('a');
                    self.pageScroll(target);
                    e.preventDefault();
                });
            };

            this.pageScroll = function(target){
                var href = target.attr('href');
                $('html,body').stop().animate({
                    'scrollTop' : $(href).offset().top
                },settings.time,function(){
                    self.scrollInit();
                });
            };

            this.initClass = function(index){
                var $sections = $('section');
                $sections.each(function(eIndex,ele){
                    var $currentSection = $(this);
                    if(index === eIndex) {
                        $(this).addClass('active_' + index);
                    } else {
                        $(this).removeClass();
                    }
                });
            };

            this.skillBar = function() {
                if($('#skill').hasClass('active_2')) {
                    $('.skill_bar').each(function(){
                        var percent = $(this).attr('data-percent');
                        $(this)
                            .find('.skill_bar_bar')
                            .css('width',percent);
                    });
                } else {
                    $('.skill_bar').each(function(){
                        $(this)
                            .find('.skill_bar_bar')
                            .css('width',0);
                    });
                }
            };

            this.scrollInit = function() {
                $(window).on('scroll',function(){
                    self.skillBar();
                    var $scrollTop = $(this).scrollTop(),
                        $navBtn = $(settings.id + ' ul li');
                    $navBtn.each(function() { 
                        var $currentLi = $(this),
                            $currentEle = $($currentLi.children('a').attr('href'));
                        if($currentEle.offset().top <= $scrollTop && $currentEle.offset().top + $currentEle.height() > $scrollTop) {
                            $navBtn.removeClass('active');
                            $currentLi.addClass('active');
                            self.initClass($currentLi.index());
                        } else {
                            $currentLi.removeClass('active');
                        }
                    });
                });
            };

            this.init();

        };

        $(document).MyPersonal();
    })

})(window,document,jQuery)