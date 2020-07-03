import Component from "./component";
import { IProductOptionType, IOption, ISku, ISkuInventoryRequestParams, ISkuPricing, ISelectedSku, ISkuRestricts } from "./interface/IProductOption";
import Vue from "vue";
import OptionRadio from './partials/optionRadioVue';
import Axios from "axios";

export default class ProductOption extends Component {
	public attributes:Map<string, any>;
	private productId?:number|null;
	private option:Map<string, IOption>;
	private optionData?:IOption[];
	private skuData?:ISku;
	private allSkuData:ISkuPricing[];
	private filteredSkus:ISkuPricing[][];
	private optionComponent:Map<string, any>;
	private selectedValues:number[];
	private isFireEvent?:Boolean;

	constructor(context:HTMLElement){
		super(context);
		this.selector = '[data-component-product-option]';
		this.attrName = ['data-component-product-option', 'data-product-options', 'data-product-restrict'];
		this.option = new Map();
		this.optionComponent = new Map();
		this.selectedValues = [];
		this.allSkuData = [];
		this.filteredSkus = [[]];
		this.attributes = this.rtnToAttributes(this.context, this.attrName);
	}

	public componentDidMount(...components:any[]):void{
		const _this = this;
		const attrProductOption:IProductOptionType = this.attributes.get('data-component-product-option');
		const optionData:IOption[] = this.attributes.get('data-product-options');
		const restricts:ISkuRestricts = this.attributes.get('data-product-restrict');
		const firstOptName:string = attrProductOption.first;
		const restrictData:any = this.rtnJson(restricts.skuMatcheResults || ''.replace(/=/g, ':'), true);

		this.optionData = optionData;		
		this.productId = attrProductOption.productId;

		(async ()=>{
			try{
				const productSkuInventory = await Axios.get<ISku>('/productSkuInventory.json', {
					data:{
						productId:this.productId //required,
						//useMaxQuantity:true //구매제한수량 사용여부
						//fulfillmentType:'PHYSICAL_PICKUP' | PHYSICAL_SHIP
					}
				});

				this.skuData = productSkuInventory.data;
				this.allSkuData = this.skuData.skuPricing;
				//옵션 데이터 나누기 예) COLOR:{}, SIZE:{} ...
				if(this.allSkuData !== null){
					optionData.forEach((option, optIndex, arrOption)=>{
						this.option.set(option.type, option);
					});
				}

				for(let [key, value] of this.option.entries()){
					this.optionComponent.set(key, new Vue({
						el:`#option-${key}-component`,
						data:{options:value, skus:((key === firstOptName)?this.allSkuData:null), selectedValue:0, selectedAllowValue:'', errorMsg:''},
						components:{
							OptionRadio
						},
						template:`
							<div>
								<input class="hidden-option" type="hidden"
									v-bind="{name:'itemAttributes['+options.attributeName+']', value:selectedAllowValue}" />
								<h2 class="tit">
									<span class="txt">{{options.type}}</span>
									<span class="over-txt"></span>
									<span class="msg">{{errorMsg}}</span>
								</h2>
								<div class="product-option_radio square">
									<div class="opt-list">
										<span class="input-radio" v-for="(allowedValue, index) in options.allowedValues">
											<option-radio 
												v-bind="{
													index:index,
													allowedValue:allowedValue,
													attributeName:options.attributeName,
													optionsType:options.type,
													skus:skus,
													selectedValue:selectedValue
												}"
												v-on="{
													selected:selected,
													changed:changed
												}" />
										</span>
									</div>
								</div>
							</div>
						`,
						methods:{
							selected:function(value:number){
								this.selectedValue = value;
								this.errorMsg = '';
								_this.receiveToEvent(key, value);
							},
							changed:function(value:string){
								this.selectedAllowValue = value;
							}
						}
					}));
				}

				//sku load skuComplete
				this.fireEvent('skuLoadComplete', this.context, [this.allSkuData]);
			}catch(e){
				console.log(e);
			}
		})();
	}
	public componentWillUnmount():void{}
	public validate():boolean{
		let result:boolean = true;
		for(var [key, value] of this.optionComponent.entries()){
			if(value.selectedValue === 0){
				result = false;
				value.errorMsg = this.message.mustSelectOption;
			}
		}

		return result;
	}

	private receiveToEvent(optionType:string, selectedValue:number):void{
		let index:number = 0;
		let currentIndex:number = 0;
		let selectedOptions:Map<string, number> = new Map();

		//currentSku 초기화하여 사용해야 하지만 returnToSkuData에 currentSku값을 사용하는 문제점 해결시 사용해야함
		//if(key === firstOptName) currentSku = allSkuData;
		//선택된 옵션 인덱스

		if(this.optionData){
			for(let i=0; i<this.optionData.length; i++){
				if(this.optionData[i].type === optionType){
					currentIndex = i;
					break;
				}
			}
			
			this.optionData.forEach((option, i, options)=>{
				if(option.type === optionType) option.selectedValue = selectedValue;
				//선택된 다음 옵션들 리셋
				if(i > currentIndex){
					option.selectedValue = null;
					this.optionComponentDisabled(option.type);
				}

				if(option.selectedValue === null && index === i){
					let skus:ISkuPricing[] = [];
					if(currentIndex === 0){
						skus = this.allSkuData;
					}else if(this.filteredSkus[i-1].length > 0){
						skus = this.filteredSkus[i-1];
					}
					
					this.filteredSkus[i] = this.returnToSkuData(optionType, selectedValue, skus);
					this.nextOpt(option.type, option, this.filteredSkus[i]);
				}else{
					index++;

					//옵션이 하나일경우 this.filteredSkus에 allSkuData를 넣어준다.
					if(options.length <= 1){
						this.filteredSkus[currentIndex] = this.allSkuData;
					}

					if((options.length - 1) === currentIndex && option.selectedValue){
						selectedOptions.set(option.type, option.selectedValue);
					}
				}
			});

			if((this.optionData.length - 1) === currentIndex){
				this.selectedSku(selectedOptions, ((value):ISkuPricing|undefined=>{
					for(let i=0; i<this.filteredSkus[currentIndex].length; i++){
						if(this.filteredSkus[currentIndex][i].selectedOptions.indexOf(value) > -1){
							return this.filteredSkus[currentIndex][i];
							break;
						}
					}
				})(selectedValue));
			}
		}
	}

	private selectedSku(selectedOptions:Map<string, number>, sku:ISkuPricing|undefined):void{
		if(!sku){
			UIkit.notify(this.message.emptySkuPricing, {timeout:3000,pos:'top-center',status:'danger'});
			return;
		}

		let selectedSkuInfo:ISelectedSku = {
			price:sku.price || '',
			quantity:1,
			maxQuantity:sku.quantity,
			retailPrice:sku.retailPrice || '',
			salePrice:sku.salePrice || '',
			inventoryType:sku.inventoryType || '',
			options:selectedOptions,
			upc:sku.upc,
			id:sku.skuId,
			locationQuantity:sku.locationQuantity,
			restrictState:sku.restrictState
		};

		this.setQuantityCheck(selectedSkuInfo.inventoryType, selectedSkuInfo.maxQuantity);
	}

	private setQuantityCheck(inventoryType:string, maxQuantity:number):void{
		let quantity:number|null = 1;
		if(inventoryType !== 'UNAVAILABLE'){
			if(inventoryType === 'CHECK_QUANTITY'){
				quantity = maxQuantity;
			}else if(inventoryType === 'ALWAYS_AVAILABLE' || inventoryType === null){
				quantity = null;
			}
		}else{
			quantity = 0;
		}

		this.fireEvent('skuSelectedComplete', this.context, quantity);
	}

	private returnToSkuData(type:string, value:number, skus:ISkuPricing[]):ISkuPricing[]{
		let filterSkus:ISkuPricing[] = [];
		skus.forEach((sku, index, skus)=>{
			if(sku.selectedOptions.indexOf(value) > -1){
				filterSkus.push(sku);
			}
		});
		return filterSkus;
	}

	private nextOpt(optionType:string, option:IOption, skus:ISkuPricing[]):void{
		let optionComponent:any = this.optionComponent.get(optionType);
		if(optionComponent){
			optionComponent.skus = skus;
		}
	}

	private optionComponentDisabled(optionType:string):void{
		let optionComponent:any = this.optionComponent.get(optionType);
		if(optionComponent){
			optionComponent.skus = null;
			optionComponent.selectedValue = 0;
			optionComponent.selectedAllowValue = '';
		}
	}
}