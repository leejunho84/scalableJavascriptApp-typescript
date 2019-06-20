import Module from './module';
import { ISkuPricing, ISelectedSku, IProductOptionComponent, IChangeFirstOptions } from '../components/interface/IProductOption';
import { IQuantity } from '../components/interface/IQuantity';
import { IHeader } from './interface/IHeader';

export default class Product extends Module {
	private productOptionComponent?:IProductOptionComponent;
	private quantityComponent?:IQuantity;

	constructor(){
		super('[data-module-product]', 'data-module-product');
	}

	moduleWillMount(...components:any[]):void{
		const _this = this;
		const [ galleryComponent, productOption, quantity ] = components;
		this.productOptionComponent = productOption;
		this.quantityComponent = quantity;

		productOption.addEvent('changeFirstOpt', function(this:HTMLElement, args:IChangeFirstOptions){
			/*
			if(currentOptValueId != valueId){
				currentOptValueId = valueId;

				for(var i=0; i<objProductOption[productId].length; i++){
					if(i != INDEX){
						skuId = '';
						objProductOption[productId][i].setTrigger(optionName, value, valueId);
					}

					if(optionName !== 'COLOR'){
						objProductOption[productId][i].getValidateChk();
					}
				}

				if(optionName === 'COLOR'){
					gallery.setThumb(value);
				}
			}
			*/
		});

		productOption.addEvent('skuSelectedComplete', function(this:HTMLElement, quantity:number){
			if(_this.quantityComponent){
				_this.quantityComponent.maxQuantity = quantity;
			}else{
				UIkit.notify(_this.message.emptyComponent, {timeout:3000,pos:'top-center',status:'danger'});
			}
		});

		if(this.context){
			const addItemBtnContainer = this.context.querySelector('[data-add-item]');
			const addCartBtn = (addItemBtnContainer) ? addItemBtnContainer.querySelectorAll('a') : [];
			addCartBtn.forEach((btn, index, btns)=>{
				btn.fromEvent(addCartBtn, 'click').subscribe((e)=>{
					e.preventDefault();
	
					const target = e.target as HTMLAnchorElement;
					const href:string = target.getAttribute('href') || '';
					const eventType:string|null = target.getAttribute('action-type') || '';
					const form:HTMLFormElement|null = target.closest('form');
					const queryParams:Map<string, string|string[]>|string[] = this.queryParams(this.serialized(form));
	
					if(href !== null){
						(async (flag:string)=>{
							try{
								const inspectOptions = await this.inspectOptions();
								const inspectQuantity = await this.inspectQuantity();
								const inspectAddOnItems = await this.inspectAddonItems();
								const inspectMadeItemRequest = await this.inspectMakeItemRequest(queryParams);
								const inspectLogin = await this.inspectLogin();
								const inspectAddCart = await this.inspectAddCart(href, inspectMadeItemRequest);
								const miniCartModule = this.mountedModule('minicart');
								switch(eventType){
									case 'add':
										miniCartModule.update();
										break;
									case 'modify':
										/*var url = Core.Utils.url.removeParamFromURL( Core.Utils.url.getCurrentUrl(), $(this).attr('name') );
										Core.Loading.show();
										endPoint.call( 'cartAddQuantity', cartData );
										_.delay(function(){
											window.location.assign( url );
										}, 500);*/
										break;
									case 'redirect':
										this.loadingBar(true);
										setTimeout(()=>{
											window.location.href = this.contextPath + '/checkout';
										}, 500);
										break;
								}
							}catch(e){
								UIkit.notify(e, {timeout:3000,pos:'top-center',status:'danger'});
							}
						})(href);
					}
				});
			});
		}
	}

	private inspectOptions():Promise<string>{
		return new Promise((resolve, reject)=>{
			const inspectOption:boolean = (this.productOptionComponent) ? this.productOptionComponent.validate() : false;
			if(inspectOption){
				resolve();
			}else{
				reject('옵션을 선택해 주세요.');
			}
		});
	}

	private inspectQuantity():Promise<number>{
		var _this = this;
		return new Promise((resolve, reject)=>{
			if(this.quantityComponent){
				const quantityModal = UIkit.modal('#order-count-select', {keyboard:false, bgclose:false, modal:false});
				quantityModal.show();

				$('#order-count-select .quantity_confirm').off().click((e)=>{
					if(this.quantityComponent){
						resolve(this.quantityComponent.currentQuantity);
					}					
				});

				$('#order-count-select .quantity_cancel').off().click((e)=>{
					quantityModal.hide();
					reject(_this.message.selectQuantityCancel);
				});
			}else{
				reject(this.message.emptyComponent);
			}
		});
	}

	private inspectLogin():Promise<boolean>{
		return new Promise((resolve, reject)=>{
			const headerModule:IHeader = this.mountedModule('header');
			if(headerModule.signIn){
				resolve(true);
			}else{
				UIkit.modal('#order-signin-check').show();
				$('#order-signin-check .uk-modal-confirm').off().click(async (e)=>{
					e.preventDefault();
					try{
						const inspectLogin = await headerModule.inspectLogin();
						console.log(inspectLogin);
					}catch(err){
						reject(err);
					}
				});

				$('#order-signin-check .uk-modal-close').off('click.close').on({
					'click.close':(e)=>{
						UIkit.modal('#order-count-select').hide();
						reject(this.message.mustLogin);
					}
				}); 
			}
		});
	}

	private inspectAddonItems():Promise<string>{
		return new Promise((resolve, reject)=>{
			resolve('addonItem');
		});
	}

	private inspectAddCart(url:string, itemRequest:any):Promise<any>{
		return new Promise((resolve, reject)=>{
			$.ajax({
				url:url,
				method:'POST',
				data:itemRequest,
				complete:(response)=>{
					if(response.status === 200){
						const responseJson:any = response.responseJSON;
						if(responseJson.hasOwnProperty('error')){
							reject(responseJson);
						}else{
							resolve(responseJson);
						}						
					}else{
						reject(`${this.message.serverError}(${response.status})`);
					}
				}
			});
		});
	}

	private inspectMakeItemRequest(queryParams:Map<string, string|string[]>|string[]):Promise<any>{
		let itemRequest:any = {};
		return new Promise((resolve, reject)=>{
			itemRequest['productId'] = this.attributes.productId;
			for(const [key, value] of queryParams.entries()){
				if(key !== 'null'){
					itemRequest[key] = value;
				}
			}

			resolve(itemRequest);
		});
	}

	moduleWillUnmount():void{}
}