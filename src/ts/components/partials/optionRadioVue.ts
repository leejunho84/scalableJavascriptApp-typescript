import { Vue, Component, Prop, Model } from 'vue-property-decorator';
import { ISkuPricing, IProductAllowValues } from '../interface/IProductOption';

@Component({
	template: `
		<label v-bind:for="attributeName+index"
				v-bind:class="{
					'sd-out':!changeSkus,
					'selected':selectedValue === allowedValue.id
				}">{{allowedValue.displayValue}}
			<input type="radio" v-bind:data-attributename="attributeName"
				v-bind:data-index="index"
				v-bind:data-friendly-name="allowedValue.friendlyName"
				v-bind:data-value="allowedValue.value"
				v-bind:id="attributeName+index"
				v-bind:name="optionType"
				v-bind:value="allowedValue.id"
				v-bind:disabled="!changeSkus"
				v-model="selected"
				v-on:change="changed(allowedValue.value)"
				/>		
		</label>
	`
})

export default class OptionRadioVue extends Vue {

	@Prop() index!:number;
	@Prop() allowedValue!:any;
	@Prop() attributeName!:string;
	@Prop() optionType!:string;
	@Prop() skus!:ISkuPricing[];
	@Prop() selectedValue!:number;

	constructor(){
		super();
	}

	created():void{}
	mounted():void{}

	get changeSkus():boolean{
		let result:boolean = false;
		if(this.skus !== null){
			this.skus.some((sku, i, skus):boolean => {
				if(sku.selectedOptions.indexOf(this.allowedValue.id) > -1){
					if(sku.inventoryType !== 'UNAVAILABLE'){
						if(sku.inventoryType === 'ALWAYS_AVAILABLE' || null){
							result = true;
						}else if(sku.inventoryType === 'CHECK_QUANTITY'){
							if(+sku.quantity > 0 || sku.quantity === null){
								result = true;
							}
						}
					}
				}

				return result;
			});
		}

		return result;
	}

	get selected():number{
		return this.selectedValue;
	}

	set selected(value:number){
		this.$emit('selected', value);
	}

	changed(allowedValue:string):void{
		this.$emit('changed', allowedValue);
	}
}