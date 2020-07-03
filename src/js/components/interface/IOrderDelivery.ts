import IComponent from "./icomponent";

export interface IOrderDelivery extends IComponent{}
export interface IShippingAddress {
	fullName:string|string[]
	phonePrimary:string|string[]
	postCode:string|string[]
	address1:string|string[]
	address2:string|string[]
	address3?:string|string[]
	city?:string|string[]
	default?:string|string[]
}
export interface IOrderDeliveryAttributes {}