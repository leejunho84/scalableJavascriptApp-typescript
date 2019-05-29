import Component from "./component";
import Rx from "../libs/rxjs";
import { ITextField } from "./interface/ITextField";
import { IGiftCard } from "./interface/IGiftCard";

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
			Rx.fromEvent(button, 'click').subscribe(async (e)=>{
				e.preventDefault();
				const target = e.currentTarget as HTMLButtonElement;
				const form = target.closest('form');
				if(form){
					try{
						const serializeData = this.serialized(form);
						//return 값 변경필요
						await this.submitGiftCard(form.action, serializeData);
						window.location.reload();						
					}catch(err){
						throw new Error(err);
					}
				}
			});
		}
	}

	protected submitGiftCard(url:string, data:any):Promise<any>{
		return new Promise((resolve, reject)=>{
			$.ajax({
				url:url,
				method:'POST',
				data:data,
				complete:(response)=>{
					if(response.status === 200){
						resolve(response);
					}else{
						reject(`${this.message.serverError}(${response.status})`);
					}
				}
			});
		});
	}
	public componentWillUnmount():void{}
}