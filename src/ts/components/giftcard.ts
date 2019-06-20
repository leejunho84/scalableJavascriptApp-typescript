import Component from "./component";
import { ITextField } from "./interface/ITextField";
import { IGiftCard } from "./interface/IGiftCard";
import Axios from "axios";

export default class GiftCard extends Component implements IGiftCard{
	constructor(context:HTMLElement){
		super(context);

		this.selector = '[data-component-giftcard]';
		this.attrName = 'data-component-giftcard';
	}

	public componentDidMount(...components:any):void{
		const [text]:ITextField[] = components;
		const button = this.context.querySelector('button');
		if(button){
			this.fromEvent(button, 'click').subscribe(async (e)=>{
				e.preventDefault();
				const target = e.currentTarget as HTMLButtonElement;
				const form = target.closest('form');
				if(form){
					try{
						const serializeData = this.serialized(form);
						//return 값 변경필요
						await Axios.post(form.action, serializeData);
						window.location.reload();						
					}catch(err){
						throw new Error(err);
					}
				}
			});
		}
	}
	
	public componentWillUnmount():void{}
}