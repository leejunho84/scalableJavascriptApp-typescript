import IComponent from "./iComponent";

export interface IOrderPayment extends IComponent{}

export interface ITotalAmount {
	amount:number
	currency:string
}

export interface IGoogleCaptcha {
	gToken:string|null
}