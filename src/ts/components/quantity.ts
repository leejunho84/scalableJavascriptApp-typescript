import Component from "./component";
import { IQuantityAttributes } from "./interface/IQuantity";
import Rx from 'rxjs';

export default class Quantity extends Component {
	public attributes:IQuantityAttributes;
	protected minQty:number;
	protected maxQty:number;
	protected currentQty:number;

	constructor(context:HTMLElement){
		super(context);
		
		this.minQty = 1;
		this.maxQty = 100;
		this.currentQty = this.minQty;
		this.selector = '[data-component-quantity]';
		this.attrName = 'data-component-quantity';
		this.attributes = this.rtnToAttributes(this.context, this.attrName);
	}

	componentDidMount(...components:any[]):void{
		const _this = this;
		const [ textComponent ] = components;
		this.minQty = (this.attributes.minQuantity) ? +this.attributes.minQuantity : 1;
		this.maxQty = (this.attributes.maxQuantity) ? +this.attributes.maxQuantity : 100;

		textComponent.addEvent('change', function(this:HTMLInputElement, value:string){
			let qty:number = parseInt(value);
			let limitCheckQty:number = _this.quantityByCheckLimit(parseInt(value));
			_this.currentQty = qty;
			if(qty !== limitCheckQty){
				this.value = limitCheckQty.toString();
			}
		});

		const updownButtons = this.context.querySelectorAll('.btn');
		updownButtons.forEach((btn, index, btns)=>{
			Rx.fromEvent(btn, 'click').subscribe((e)=>{
				e.preventDefault();
				const target = e.currentTarget as HTMLButtonElement
				let quantity = this.currentQty;
				let type:string|null = target.getAttribute('class');
	
				if(type !== null){
					if(/plus/.test(type)){
						quantity++;
					}else if(/minus/.test(type)){
						quantity--;
					}
					this.currentQty = this.quantityByCheckLimit(quantity);
					this.fireEvent('changeQuantity', e.currentTarget, this.currentQty);
					textComponent.value = this.currentQty;
				}
			});
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
				if(maxQuantity < +this.attributes.maxQuantity){
					this.maxQty = maxQuantity;
				}else{
					this.maxQty = +this.attributes.maxQuantity;
				}
			}else{
				this.maxQty = +this.attributes.maxQuantity;
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
