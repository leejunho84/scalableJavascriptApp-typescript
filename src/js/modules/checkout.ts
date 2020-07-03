import Module from "./module";
import { ICheckout } from "./interface/ICheckout";

export default class Checkout extends Module implements ICheckout {
	constructor(){
		super('[data-module-checkout]', 'data-module-checkout');
	}

	public moduleWillMount(...components:any):void{
		const tabBars = this.context.querySelectorAll('[data-order-tab]');
		tabBars.forEach((tab, index, tabs)=>{
			this.delegate(tab, '.header', 'click').subscribe((e)=>{
				if(e.delegate){
					const target = e.delegate;
					const icons = target.querySelectorAll('[class^="icon-toggle-"]');
					const preview = target.querySelector('.preview');
					const view = target.nextElementSibling;
					
					if(view){
						this.toggleClass(view, 'uk-hidden');
					}
					if(preview){
						this.toggleClass(preview, 'uk-hidden');
					}
					icons.forEach((icon, index, icons)=>{
						this.toggleClass(icon, 'uk-hidden');
					});
				}
			});
		});

		//전화번호 변환
		const phoneNums = this.context.querySelectorAll('[data-phone]');
		phoneNums.forEach((phone, index, phones)=>{
			const phoneNum = phone.getAttribute('data-phone');
			if(phoneNum){
				phone.textContent = phoneNum.replace(/(^[0-9]{2,3})-?([0-9]{3,4})-?([0-9]{4})$/g, '$1-$2-$3');
			}
		});

		//component
		const [promotion, giftcart, orderPayment] = components;
		
	}

	protected toggleClass(target:Element, className:string):void{
		if(this.hasClass(target, className)){
			this.removeClass(target, className);
		}else{
			this.addClass(target, className);
		}
	}

	public moduleWillUnmount():void{}
}