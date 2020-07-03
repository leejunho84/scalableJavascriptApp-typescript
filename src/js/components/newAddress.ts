import Component from "./component";
import { ITextField } from "./interface/ITextField";
import { IPostCodeSearch } from "./interface/IPostCodeSearch";
import { IShippingAddress } from "./interface/IOrderDelivery";

export default class NewAddress extends Component {
	private _nameComponent?:ITextField;
	private _phoneComponent?:ITextField;
	private _postcodifyComponent?:IPostCodeSearch;
	private _components:any;

	constructor(context:HTMLElement){
		super(context);

		this.selector = '[data-component-new-address]';
		this.attrName = 'data-component-new-address';
	}

	componentDidMount(...components:any):void{
		const _this = this;
		const [name, phone, postcodify] = components;

		this._components = components;
		this._nameComponent = name;
		this._phoneComponent = phone;
		this._postcodifyComponent = postcodify;
	}

	componentWillUnmount():void{}

	get validate():boolean {
		let result:boolean = true;
		this._components.forEach((component:any)=>{
			if(!component.validate){
				result = false;
			}
		});
		return result;
	}

	get newShippingAddress():IShippingAddress {
		return {
			fullName:(this._nameComponent) ? this._nameComponent.value : '',
			phonePrimary:(this._phoneComponent) ? this._phoneComponent.value : '',
			postCode:(this._postcodifyComponent) ? this._postcodifyComponent.selectedAddress.postcode5 : '',
			address1:(this._postcodifyComponent) ? this._postcodifyComponent.selectedAddress.ko_doro : '',
			address2:(this._postcodifyComponent) ? this._postcodifyComponent.detailAddress : ''
		}
	}
}