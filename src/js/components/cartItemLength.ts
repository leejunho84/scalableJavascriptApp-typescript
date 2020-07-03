import Vue from 'vue';
import Component from "./component";
import { ICartItemLengthAttributes } from './interface/ICartItemLength';

export default class CartItemLength extends Component {
	public attributes:ICartItemLengthAttributes;
	private vueItemCount?:any;
	constructor(context:HTMLElement){
		super(context);
		this.selector = '[data-component-cartitem-length]';
		this.attrName = 'data-component-cartitem-length';
		this.attributes = this.rtnToAttributes(this.context, this.attrName);
	}

	public componentDidMount(...components:any[]):void{
		this.vueItemCount = new Vue({
			el:this.context,
			data:this.attributes,
			template:`
				<a class="cart-item" data-click-area="Upper GNB" data-click-name="Cart"
					v-bind:href="href">
					<i class="ns-cart"></i>
					<span class="cart-num" v-if="itemCount > 0">{{itemCount}}</span>
				</a>
			`,
		});
	}

	public setItemCount(count:number):void{
		this.vueItemCount.itemCount = count;
	}
	public componentWillUnmount():void{}
}