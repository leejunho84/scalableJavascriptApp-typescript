import Module from "./module";
import { ICartUpdate, ICartUpdateProcessor } from "./interface/ICart";

export default class MiniCart extends Module {
	constructor(){
		super('[data-module-minicart]', 'data-module-minicart');
	}

	public moduleWillMount():void{
		if(this.context){
			this.delegate(this.context, 'a', 'click').subscribe((e) => {
				const target = e.delegate as HTMLAnchorElement;
				if(target !== null && target.hasAttribute('data-remove-item')){
					e.event.preventDefault();
					this.removeItem(target.href);
				}
			});
		}
	}

	public show():void{
		UIkit.offcanvas.show('#minicart');
	}

	public hide():void{
		UIkit.offcanvas.hide(true);
	}

	public async update(callback?:Function){
		var params = {
			'mode':'template',
			'templatePath':'/cart/partials/miniCart',
			'resultVar':'cart',
			'cache':new Date().getTime()
		}

		try{
			const updateCart = await this.updateCart(`${this.contextPath}/processor/execute/cart_state`, params);
			if(this.context){
				//remove child
				let updateCartContext = $(this.context).empty().append($.parseHTML(updateCart));
				let inputItemSize = this.context.querySelector('input[name=itemSize]');
				let inputCartId = this.context.querySelector('input[name=cartId]');
				let itemSize = (inputItemSize) ? inputItemSize.getAttribute('value') : 0;
				this.mountedModule('header').setItemCount((itemSize) ? ((typeof itemSize === 'string') ? +itemSize : itemSize) : 0);
			}

			this.show();
		}catch(e){
				
		}
	}
	
	private updateCart(url:string, params:ICartUpdateProcessor):Promise<string>{
		return new Promise((resolve, reject)=>{
			$.ajax({
				url:url,
				method:'GET',
				data:params,
				complete:(response)=>{
					if(response.status === 200){
						resolve(response.responseText);
					}else{
						reject(`${this.message.serverError}(${response.status})`);
					}
				}
			});
		});
	}
	
	private removeItem(url:string):void{
		// error 체크와 ajax 로딩 처리 추가 되야 함
		UIkit.modal.confirm("상품을 삭제 할까요?", ()=>{
			$.ajax({
				url:url,
				method:'GET',
				complete:(response)=>{
					this.update();
				}
			});
		});
	}

	public moduleWillUnmount():void{}
}