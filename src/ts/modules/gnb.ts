import Module from "./module";

export default class Gnb extends Module {
	constructor(){
		super('[data-module-gnb]', 'data-module-gnb');
	}

	public moduleWillMount(...components:any[]):void{       
		const $this = $(this.context);
		const $oneDepth = $('.onedepth-list');
		if(this.attributes.type === 'type1'){
			let timeoutId:any = undefined;

			$oneDepth.on({
				'mouseenter.lnb':function(){
					clearInterval( timeoutId );
					$(this).find('>').addClass('active');
					$(this).siblings().find('>').removeClass('active');
				},
				'mouseleave.lnb':function(){
					const $this = $(this);
					timeoutId = setTimeout(() => {
						$this.find('>').removeClass('active');
					}, 300);
				},
				'click.lnb':function(e){
					var href = $(this).attr("href");
					if( href == "#" || href == "javascript:;" ){
						e.preventDefault();
						$(this).find('>').addClass('active');
					}
				}
			});
		}else if(this.attributes.type === 'type2'){
			$oneDepth.on({
				'mouseenter.lnb':function(){
					$(this).find('>').addClass('active');
					$(this).find('.header-menu_twodepth').css({'display':'block'});
					$(this).find('.menu-banner-conts').css({'display':'block'});
				},
				'mouseleave.lnb':function(){
					$(this).find('>').removeClass('active');
					$(this).find('.header-menu_twodepth').removeAttr('style');
					$(this).find('.menu-banner-conts').removeAttr('style');
				},
				'click.lnb':function(e){
					var href = $(this).attr("href");
					if( href == "#" || href == "javascript:;" ){
						e.preventDefault();
						$(this).find('>').addClass('active');
					}
				}
			});
		}

		const $modile = $('#mobile-menu');
		$modile.find('.mobile-onedepth_list').on('click', '> a', function(e){
			if(!$(this).hasClass('link')){
				e.preventDefault();
				$(this).siblings().show().stop().animate({'left':0}, 300);
			}
		});

		$modile.find('.location').on('click', function(e){
			e.preventDefault();
			$(this).parent().stop().animate({'left':-270}, 300, function(){
				$(this).css('left', 270).hide();
			});
		});
	}

	public moduleWillUnmount():void{}
}