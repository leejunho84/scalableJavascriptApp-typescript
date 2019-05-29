import IComponent from "./icomponent";

export interface IPostCodeAttributes {
	api:string;
	required:string;
}

export interface IPostCodeSearch extends IComponent {
	validate:boolean;
	selectedAddress:IAddress;
	detailAddress:string;
}

export interface IPostCodify {
	version:string
	error:boolean
	msg:string
	count:number
	time:string
	lang:string
	sort:string
	type:string
	nums:number
	cache:string
	results:IAddress[]
}

export interface IAddress {
	postcode5:string,
	postcode6:string,
	ko_common:string,
	ko_doro:string,
	ko_jibeon:string,
	en_common:string,
	en_doro:string,
	en_jibeon:string,
	building_id:string,
	building_name:string,
	building_nums:number[],
	other_addresses:string,
	road_id:string,
	internal_id:string
}
