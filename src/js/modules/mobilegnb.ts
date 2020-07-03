import Module from "./module";

export default class MobileGnb extends Module {
    constructor(){
        super('[data-module-mobilegnb]', 'data-module-mobilegnb');
    }

    public moduleWillMount():void{
        var $this = $(this);
        var args = arguments[0];
        var clickIS = false;
        var isSearch = false;				
        var $mobile = $('#mobile-menu');

        $mobile.find('.mobile-onedepth_list, .mobile-twodepth_list').on('click', '> a', function(e){ // webPos 수정 .mobile-twodepth_list 추가
            if(!$(this).hasClass('link')){
                e.preventDefault();
                $(this).siblings().show().stop().animate({'left':0}, 300);
            }
        });

        $mobile.find('.location .icon-arrow_left').on('click', function(e){ // webPos 수정 .icon-arrow_left 추가
            e.preventDefault();
            $(this).parent().parent().stop().animate({'left':-270}, 300, function(){
                $(this).css('left', 270).hide();
            });
        });

        $mobile.on('show.uk.offcanvas', function(event, area){
            //Core.ga.pv('pageview', '/mobileMenu');
        });

        $mobile.on('hide.uk.offcanvas', function(event, area){
            if(isSearch){
                //sandbox.getModule('module_search').searchTrigger();
            }
            isSearch = false;
        });

        $mobile.find('.mobile-lnb-search').on('click', function(e){
            e.preventDefault();
            isSearch = true;
            UIkit.offcanvas.hide();
        });

        $mobile.find(".btn-slide-close").click(function(){
            UIkit.offcanvas.hide();
        });

        // WebPOS 모바일 메뉴 활성화시 onedepth 메뉴로 보이기 위한 하위 메뉴 스타일 처리.
        $(".header-menu_mobile").click(function(){
            $(".mobile-menu_twodepth").css("left", "270px");
            $(".mobile-menu_twodepth").css("display", "none");	
            $(".mobile-menu_threedepth").css("left", "270px");
            $(".mobile-menu_threedepth").css("display", "none");

            $(".user-state").show();
            $(".mobile-menu_onedepth li").show();
        });
    }
    public moduleWillUnmount():void{}
}