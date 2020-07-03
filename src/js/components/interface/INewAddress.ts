import IComponent from "./icomponent";
import { IShippingAddress } from "./IOrderDelivery";

export interface INewAddress extends IComponent {
	validate:boolean
	newShippingAddress:IShippingAddress
}