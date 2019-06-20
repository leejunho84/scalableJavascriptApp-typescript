import Component from "./component";
import { ITextField } from "./interface/ITextField";
import Axios from "axios";

export default class Promotion extends Component {
	constructor(context:HTMLElement){
		super(context);

		this.selector = '[data-component-promotion]';
		this.attrName = 'data-component-promotion';
	}

	public componentDidMount(...components:any[]):void{
		const [text]:ITextField[] = components;
		const form = this.context.querySelector<HTMLFormElement>('form.promo-form');
		const errorMessage = this.context.querySelector('.promo-error-message');
		const submitBtn = this.context.querySelector('button[type="submit"]');
		const promos = this.context.querySelectorAll('.promo-list');

		if(submitBtn){
			this.fromEvent(submitBtn, 'click').subscribe(async (e)=>{
				e.preventDefault();
				if(text.validate){
					try{
						if(form){
							const submitedCode = await Axios.post(form.action, this.serialized(form));
							window.location.reload();
							console.log(submitedCode);
						}
					}catch(err){
						throw new Error(err);
					}
				}else{
					if(errorMessage){
						errorMessage.textContent = this.message.notAvailabel;
					}
				}
			});
		}


		/*
			@replaceTarget : 결과값이 들어갈 dom
			@errorMessageTarget : error message 가 들어갈 dom 
		*/
		/*
		var $this = $(this);
		Method.$that = $this;
		Method.$form = $this.find("form.promo-form");
		Method.$errorMessage = $this.find(Method.errorMessageTarget);
		endPoint = Core.getComponents('component_endpoint');

		if( Method.$form.length < 1 ){
			return;
		}

		$(this).find("button[type='submit']").on("click", function(e){
			e.preventDefault();
			Method.submitCode();
		});

		$(this).find(".promo-list .btn-delete").on("click", function(e){
			e.preventDefault();
			Method.removeCode( $(this).attr("href") );
		});
		*/
	}

	public componentWillUnmount():void{}
}