import Rx from 'rxjs';
import Component from "./component";
import Vue from "vue";
import addressInfoDetail from "./partials/addressInfoDetailVue";
import addressForm from "./partials/addressFormVue";
import { IShippingAddress, IOrderDeliveryAttributes } from "./interface/IOrderDelivery";
import { INewAddress } from "./interface/INewAddress";

export default class OrderDelivery extends Component {
	public attributes:IOrderDeliveryAttributes;
	private addressType:string;
	private customerAddressDelegate:any;
	private shippingAddress:IShippingAddress;
	private newAddressComponent?:INewAddress;
	
	constructor(context:HTMLElement){
		super(context);

		this.selector = '[data-component-order-delivery]';
		this.attrName = 'data-component-order-deliver';
		this.addressType = '';
		this.shippingAddress = {fullName:'', postCode:'', address1:'', address2:'', address3:'', phonePrimary:'', city:''};
		this.attributes = this.rtnToAttributes(this.context, this.attrName);
	}

	public componentDidMount(...components:any[]):void{
		const _this = this;
		const [newAddress, ...otherComponent] = components;
		this.newAddressComponent = newAddress;

		const submitShippingFormBtn = this.context.querySelector('[data-order-shipping-submit-btn]');
		if(submitShippingFormBtn){
			Rx.fromEvent(submitShippingFormBtn,'click').subscribe(async (e)=>{
				e.preventDefault();
				const target = e.currentTarget as Element;
				const form = (target) ? target.closest('form') : null;

				if(this.addressType === 'new_address'){
					try{
						const formAddressComplated = await this.setFormAddress();
						if(form){
							form.submit();
						}
					}catch(err){
						//UIkit.modal.alert(err);
					}
				}else{
					if(form){
						form.submit();
					}
				}
			});
		}

		//회원이며 기존에 주문내역의 주소가 있는경우
		const addressFormWrap = this.context.querySelector('[data-address-form]');
		const addressWrap = this.context.querySelector('[data-before-address]');
		const form = this.context.querySelector('form');

		if(form && addressFormWrap){
			const transFormParams = this.queryParams(this.serialized(form));
			this.shippingAddress = {
				fullName:transFormParams.get('address.fullName') || '',
				postCode:transFormParams.get('address.postalCode') || '',
				address1:transFormParams.get('address.addressLine1') || '',
				address2:transFormParams.get('address.addressLine2') || '',
				address3:transFormParams.get('address.addressLine3') || '',
				phonePrimary:transFormParams.get('address.phonePrimary.phoneNumber') || '',
				city:''
			}

			new Vue({
				el:addressFormWrap,
				data:this.shippingAddress,
				components:{
					addressForm
				},
				template:`
					<addressForm 
						v-bind="{fullName:fullName, postCode:postCode, address1:address1, address2:address2, address3:address3, phonePrimary:phonePrimary}"
					/>
				`
			});
		}

		if(addressWrap && form){
			this.shippingAddress = this.shippingAddress;

			new Vue({
				el:addressWrap,
				data:this.shippingAddress,
				components:{
					addressInfoDetail
				},
				template:`
					<addressInfoDetail 
						v-bind="{fullName:fullName, postCode:postCode, address1:address1, address2:address2, address3:address3, phonePrimary:phonePrimary}"
						v-on="{
							showOtherAddress:showOtherAddress
						}"
					/>
				`,
				methods:{
					showOtherAddress:async function(e:Event){
						try{
							const changedAddress = await _this.changeCustomerAddress();
							this.fullName = changedAddress.fullName;
							this.postCode = changedAddress.postCode;
							this.address1 = changedAddress.address1;
							this.address2 = changedAddress.address2;
							this.address3 = changedAddress.address3;
							this.phonePrimary = changedAddress.phonePrimary
							this.city = changedAddress.city;
							this.default = changedAddress.default;
						}catch(err){
							throw new Error(err);
						}
					}
				}
			});
		}


		/* 회원일경우 탭이벤트 생성 */
		const switcher = this.context.querySelector('.switcher');
		const switcherWrap = this.context.querySelector('.switcher-wrap');
		if(switcher && switcherWrap){
			const btns = switcher.querySelectorAll('a');
			const items = switcherWrap.querySelectorAll('.switcher-item');
			
			btns.forEach((btn, index, btns)=>{
				//switcherWrap 초기화, 선택된 탭기준
				if(this.hasClass(btn, 'uk-active')){
					this.addClass(items[index], 'uk-active');
					this.addressType = btn.getAttribute('data-address-type') || 'default_address';
				}

				btn.addEventListener('click', (e)=>{
					e.preventDefault();
					const target = e.currentTarget as Element;
					this.addClass(target, 'uk-active');
					this.addClass(items[index], 'uk-active');
					this.addressType = btn.getAttribute('data-address-type') || 'default_address';

					for(let i=0; i<btns.length; i++){
						if(i !== index){
							this.removeClass(btns[i], 'uk-active');
							this.removeClass(items[i], 'uk-active');
						}
					}
				});
			});
		}
	}

	private changeCustomerAddress():Promise<IShippingAddress>{
		return new Promise((resolve, reject)=>{
			const customerAddressModal = document.getElementById('popup-customer-address');
			if(customerAddressModal){
				UIkit.modal('#popup-customer-address').show();

				if(this.customerAddressDelegate){
					this.removeDelegate(this.customerAddressDelegate);
				}

				this.customerAddressDelegate = this.delegate(customerAddressModal, '[data-customer-address-select-btn]', 'click').subscribe((e)=>{
					if(e.delegate){
						const form = e.delegate.closest('[data-customer-address]');
						const transFormParams = this.queryParams(this.serialized(form));

						resolve({
							default:transFormParams.get('default') || '',
							fullName:transFormParams.get('fullName') || '',
							postCode:transFormParams.get('postalCode') || '',
							address1:transFormParams.get('addressLine1') || '',
							address2:transFormParams.get('addressLine2') || '',
							address3:transFormParams.get('addressLine3') || '',
							phonePrimary:transFormParams.get('phoneNumber') || '',
							city:transFormParams.get('city') || ''
						});

						UIkit.modal('#popup-customer-address').hide();
					}
				});
			}
		});
	}

	private setFormAddress():Promise<IShippingAddress>{
		return new Promise((resolve, reject)=>{
			if(this.newAddressComponent && this.newAddressComponent.validate){
				const newShippingAddress = this.newAddressComponent.newShippingAddress;
				this.shippingAddress.fullName = newShippingAddress.fullName;
				this.shippingAddress.postCode = newShippingAddress.postCode;
				this.shippingAddress.address1 = newShippingAddress.address1;
				this.shippingAddress.address2 = newShippingAddress.address2;
				this.shippingAddress.address3 = newShippingAddress.address3;
				this.shippingAddress.phonePrimary = newShippingAddress.phonePrimary;

				resolve(this.shippingAddress);
			}else{
				reject(this.message.shippingAddressEmpty);
			}
		});
	}

	public componentWillUnmount():void{}
}