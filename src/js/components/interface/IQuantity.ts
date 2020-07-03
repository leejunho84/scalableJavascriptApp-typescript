import IComponent from "./icomponent";

export interface IQuantity extends IComponent {
    currentQuantity:number;
	maxQuantity:number;
	minQuantity:number;
}

export interface IQuantityAttributes {
	minQuantity:string;
	maxQuantity:string;
}