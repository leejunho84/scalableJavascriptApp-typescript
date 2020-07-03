import Module from "./module";
import Rx from "rxjs";
import { ICartUpdate } from "./interface/ICart";
import { IHeader } from "./interface/IHeader";

export default class Cart extends Module{
	constructor(){
		super('[data-module-cart]', 'data-module-cart');
	}

	public moduleWillMount(...components:any[]):void{
		if(this.context){
			/* remove orderItem */
			const removeItemBtns = this.context.querySelectorAll('.btn-delete');
			removeItemBtns.forEach((btn, index, btns)=>{
				Rx.fromEvent(btn, 'click').subscribe(async (e) => {
					e.preventDefault();
					const target = e.currentTarget as HTMLAnchorElement;
	
					UIkit.modal.confirm(this.message.doRemoveItem, ()=>{
						window.location.href = target.href;
					});
				});
			});

			/* remove all orderItem */
			const removeItemAllBtn = this.context.querySelector('.btn-cart-delete-All');
			if(removeItemAllBtn){
				Rx.fromEvent(removeItemAllBtn, 'click').subscribe(async (e) => {
					e.preventDefault();
					const target = e.currentTarget as HTMLAnchorElement;

					UIkit.modal.confirm(this.message.doRemoveAllItem, async ()=>{
						await this.removeItemAll(target.href);
						this.cookie('pageMsg', this.message.removeCartItem);
						window.location.reload();
					});
				});
			}

			/* other btn */
			const otherBtns = this.context.querySelectorAll('.btn-link');
			otherBtns.forEach((btn, index, btns)=>{
				Rx.fromEvent(btn, 'click').subscribe(async (e) => {
					const target = e.currentTarget as HTMLAnchorElement;
					const type = (target.getAttribute('class') || '').match(/(optchange-btn|wish-btn|later-btn|addcart-btn)/);
					
					try{
						if(type){
							e.preventDefault();
							const formData = this.serialized(target.closest('.product-opt_cart') as HTMLElement);
	
							if(type[0] === 'optchange-btn'){
								//대망의 옵션 변경
							}else if(type[0] === 'wish-btn'){
								const updatedWishList = await this.updateWishList(target.href, formData);
								if(updatedWishList.hasOwnProperty('error')){
									UIkit.notify(updatedWishList.error, {timeout:3000,pos:'top-center',status:'warning'});
								}else{
									if(updatedWishList.isWishListChk){
										this.cookie('pageMsg', this.message.addItemToWishList);
									}else{
										this.cookie('pageMsg', this.message.removeItemToWishList);
									}
								}
							}else if(type[0] === 'later-btn' || type[0] === 'addcart-btn'){
								const updatedCart = await this.updateItems(target.href, formData);
								this.cookie('pageMsg', (type[0] === 'addcart-btn') ? this.message.moveItemToCart : this.message.moveItemToLater);
								if(updatedCart.hasOwnProperty('error')){
									this.cookie('pageMsg', updatedCart.error);
								}
							}
							window.location.reload();
						}
					}catch(err){
						UIkit.notify(err, {timeout:3000,pos:'top-center',status:'error'});
					}
				});
			});
		}

		/* cookie pageMsg */
		const pageMsgCookie = this.cookie('pageMsg');
		if(pageMsgCookie){
			this.removeCookie('pageMsg');
			UIkit.notify(pageMsgCookie, {timeout:3000,pos:'top-center',status:'success'});
		}
	}

	protected removeItemAll(url:string):Promise<string>{
		return new Promise((resolve, reject)=>{
			$.ajax({
				url:`${this.contextPath}/cart/removeAll`,
				method:'GET',
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

	protected updateItems(url:string, serializeData:string):Promise<any>{
		return new Promise((resolve, reject)=>{
			//const transFormData = this.queryParams(serializeData) as Map<string, string>;
			$.ajax({
				url:url,
				method:'POST',
				data:serializeData,
				complete:(response)=>{
					if(response.status === 200){
						resolve(response.responseJSON);
					}else{
						reject(`${this.message.serverError}(${response.status})`);
					}
				}
			});
		});
	}

	protected updateWishList(url:string, serializeData:string):Promise<any>{
		return new Promise((resolve, reject)=>{
			const transFormData = this.queryParams(serializeData) as Map<string, string>;
			const query = {
				productId:transFormData.get('productId'),
				orderItemId:transFormData.get('orderItemId')
			}

			$.ajax({
				url:url,
				method:'GET',
				data:query,
				complete:(response)=>{
					if(response.status === 200){
						resolve(response.responseJSON);
					}else{
						reject(`${this.message.serverError}(${response.status})`);
					}
				}
			})
		});
	}
	
	public moduleWillUnmount():void{}
}