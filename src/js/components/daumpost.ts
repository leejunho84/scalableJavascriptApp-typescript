import PostCodeSearch from "./postcodify";
import { ITextField } from "./interface/ITextField";

export default class Daumpost extends PostCodeSearch {
	constructor(context:HTMLElement){
		super(context);
		this.selector = '[data-component-daumpost]';
		this.attrName = 'data-component-daumpost';
		this.attributes = this.rtnToAttributes(this.context, this.attrName);
	}

	componentDidMount(...components:any[]){
		const _this = this;
		const [search]:ITextField[] = components;
		const postSubmit = this.context.querySelector('button');

		if(postSubmit){
			postSubmit.addEventListener('click', (e)=>{
				e.preventDefault();
				new daum.Postcode({
					oncomplete:(address)=>{
						if(search){
							search.value = address.roadAddress;
						}
						//_this._selectedAddress = address;
						_this.fireEvent('selectedAddress', _this.context, address);
					}
				}).open();
			});
		}
	}
}