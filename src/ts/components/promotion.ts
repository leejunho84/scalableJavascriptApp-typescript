import Component from "./component";
import { ITextField } from "./interface/ITextField";

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
							const submitedCode = await this.submitCode(form.action, this.serialized(form));
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

	protected removeCode(url:string):Promise<any>{
		return new Promise((resolve, reject)=>{
			$.ajax({
				url:url,
				method:'GET',
				complete:(reponse)=>{

				}
			})
		});

		/*BLC.ajax({
			url: url,
			type: "GET"
		}, function(data) {
			if (data.error && data.error == "illegalCartOperation") {
				UIkit.modal.alert(data.exception);
				sandbox.setLoadingBarState(false);
			} else {
				window.location.reload();
			}
		});*/
	}

	protected submitCode(url:string, formData:string):Promise<any>{
		return new Promise((resolve, reject)=>{
			$.ajax({
				url:url,
				method:'POST',
				data:formData,
				complete:(response)=>{
					if(response.status === 200){
						resolve(response.responseText);
					}else{
						reject(`${this.message.serverError}(${response.status})`);
					}
				}
			});
		});
		/*
		var $form = Method.$form;
		BLC.ajax({url: $form.attr('action'),
				type: "POST",
				data: $form.serialize()
			}, function(data, extraData) {

				var endPointData = $.extend(extraData, { 
					promoCode : sandbox.utils.url.getQueryStringParams( $form.serialize() ).promoCode
				});

				if (data.error && data.error == 'illegalCartOperation') {
					sandbox.setLoadingBarState(false);
					UIkit.modal.alert(data.exception);
					endPointData.exception = 'illegalCartOperation';
					
				} else {
					if(!extraData.promoAdded) {
						sandbox.setLoadingBarState(false);
						Method.$errorMessage.find(".text").html(extraData.exception)
						Method.$errorMessage.removeClass("uk-hidden");
					} else {
						if( _.isElement( Method.replaceTarget) ){
							sandbox.setLoadingBarState(false);
							$(Method.replaceTarget).html( data );
						}else{
							window.location.reload();
						}
					}
				}

				endPoint.call('applyPromoCode', endPointData);
			}
		);
		*/
	}

	public componentWillUnmount():void{}
}