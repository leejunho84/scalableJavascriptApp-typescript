import Component from "./component";
import { ICheckbox } from "./interface/ICheckbox";

export default class OrderPayment extends Component{
	public isOrder:boolean;
	public submitBtn:Element|null;
	public codBtn:Element|null;
	public paymentContainer:Element|null;
	public agreeComponent?:ICheckbox;

	constructor(context:HTMLElement){
		super(context);

		this.selector = '[data-component-order-payment]';
		this.attrName = 'data-component-order-payment';
		this.isOrder = false;
		this.submitBtn = null;
		this.codBtn = null;
		this.paymentContainer = null;
	}

	public componentDidMount(...components:any):void{}
	public componentWillUnmount():void{}
}