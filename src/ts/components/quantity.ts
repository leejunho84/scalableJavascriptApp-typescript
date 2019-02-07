import Component from "./component";
import Text from "./textfield";

export default class Quantity extends Component {
	protected minQty:number;
	protected maxQty:number;
	protected currentQty:number;

	constructor(context:Element){
		super(context);
		
		this.minQty = 1;
		this.maxQty = 100;
		this.currentQty = this.minQty;
		this.selector = '[data-component-quantity]';
		this.attrName = 'data-component-quantity';
	}

	componentDidMount(...components:any[]):void{
		//console.log('component_quantity', components);
		let _this = this;
		this.minQty = (this.attributes.minQuantity) ? +this.attributes.minQuantity : 1;
		this.maxQty = (this.attributes.maxQuantity) ? +this.attributes.maxQuantity : 100;

		this.$(this.target).find('.btn').on('click', (e)=>{
			e.preventDefault();

			let $this = this.$(e.currentTarget);
			let quantity = this.currentQty;

			if($this.hasClass('minus')){
				quantity--;
			}else{
				quantity++;
			}

			this.currentQty = this.quantityByCheckLimit(quantity);
			this.fireEvent('changeQuantity', e.currentTarget, [this.currentQty]);
			components[0].value = this.currentQty;
		});
	}

	componentWillUnmount():void{}

	protected quantityByCheckLimit(quantity:number):number{
		let qty:number = quantity;

		if(quantity < this.minQty){
			qty = this.minQty;
		}else if(quantity > this.maxQty){
			qty = this.maxQty;
		}

		return qty;
	}

	get currentQuantity():number{
		return this.currentQty;
	}

	set currentQuantity(quantity:number){
		this.currentQty = this.quantityByCheckLimit(quantity);
	}

	get maxQuantity():number{
		return this.maxQty
	}

	set maxQuantity(maxQuantity:number){
		if(this.attributes.maxQuantity === 'null' && maxQuantity !== null){
			this.maxQty = maxQuantity;
		}else if(this.attributes.maxQuantity !== 'null'){
			if(maxQuantity != null){
				if(maxQuantity < this.attributes.maxQuantity){
					this.maxQty = maxQuantity;
				}else{
					this.maxQty = this.attributes.maxQuantity;
				}
			}else{
				this.maxQty = this.attributes.maxQuantity;
			}
		}else if(maxQuantity == null){
			this.maxQty = 100;
		}

		this.maxQty = maxQuantity;
	}

	get minQuantity():number{
		return this.minQty;
	}

	set minQuantity(minQuantity:number){
		this.minQty = minQuantity;
	}
}
