import IComponent from "./iComponent";

export interface IProductOptionComponent extends IComponent{
	validate():boolean;
}

export interface IProductAllowValues {
	id:number,
	value:string,
	colorAsset:string,
	colorCode:string,
	colorRepresentCode:string,
	displayValue:string,
	displayOrder:number,
	optionType:string,
	friendlyName:string|null
}

export interface ISkuPricing {
	price:string|null;
	retailPrice:string|null;
	salePrice:string|null;
	quantity:number;
	inventoryType:string;
	isDiscountable:boolean;
	isAbleCancel:boolean;
	isAbleReturn:boolean;
	upc:number;
	externalId:string;
	skuId:number;
	locationQuantity:number;
	locationSumQuantity:number;
	cachedDate:string;
	selectedOptions:number[];
	restrictState?:string|undefined;
}

export interface IProductOptionType {
    productId:number;
	first:string;
	productType:string;
	selectOptAppendType:boolean;
	componentType:string;
}

export interface IOption {
	id:number,
	type:string,
	label:string,
	attributeName:string,
	values:any,
	selectedValue:number|null,
	allowedValues:IProductAllowValues[];
	cachedDate:string;
}

export interface ISku {
	usable:boolean;
	skuPricing:ISkuPricing[];
}

export interface ISkuInventoryRequestParams {
	productId:number;
	useMaxQuantity?:boolean;
	fulfillmentType?:string;
}

export interface ISelectedSku {
	price:string;
	quantity:number;
	maxQuantity:number;
	retailPrice:string;
	salePrice:string;
	inventoryType:string;
	options:Map<string, number>;
	upc:number;
	id:number;
	locationQuantity:number;
	restrictState:string|undefined
}

export interface ISkuRestricts {
	skuMatcheResults:string;
}

export interface IChangeFirstOptions {
	firstOptName:string;
	optinsName:string;
	productId:number;
	value:string;
	id:number;
}