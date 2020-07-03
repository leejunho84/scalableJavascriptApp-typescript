import Quantity from "./quantity";

export default class QuantitySelect extends Quantity {
	constructor(context:HTMLElement){
		super(context);

		this.selector = '[data-component-quantity-selectbox]';
		this.attrName = 'data-component-quantity-selectbox';
	}

	componentDidMount(...components:any[]):void{
		//console.log('component_quantitySelect:', components);
		const _this = this;
		this.minQty = (this.attributes.minQuantity) ? +this.attributes.minQuantity : 1;
		this.maxQty = (this.attributes.maxQuantity) ? +this.attributes.maxQuantity : 100;
		
		components.map((component)=>{
            component.addEvent('selected', function(this:HTMLElement, ...args:any){
				_this.fireEvent('changeQuantity', this, args);
			});
        });
	}
}
