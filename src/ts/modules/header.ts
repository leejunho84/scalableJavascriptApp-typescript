import Module from "./module";
import { IDynamicFormType, ILogined } from "./interface/IHeader";

export default class Header extends Module {
	private cartItemLength_0:any;
	private cartItemLength_1:any;
	private search:any;
	private _redirect:boolean;
	private _redirectUrl:string;

	constructor(){
		super('[data-module-header]', 'data-module-header');
		this._redirect = true;
		this._redirectUrl = window.location.href;
	}

	public moduleWillMount(...components:any[]):void{
		const [cartItemLength_0, cartItemLength_1, search] = components;
		this.cartItemLength_0 = cartItemLength_0;
		this.cartItemLength_1 = cartItemLength_1;
		this.search = search;
		
		if(this.context){
			this.delegate(this.context, 'a', 'click').subscribe(async (e) => {
				const target:HTMLAnchorElement = e.delegate as HTMLAnchorElement;
				if(target !== null && target.getAttribute('class') === 'login'){
					e.event.preventDefault();
					await this.inspectLogin();
				}
			});
		}
	};

	private dynamicFormLoader(url:string, params:IDynamicFormType):Promise<string>{
		return new Promise((resolve, reject)=>{
			$.ajax({
				url:url,
				method:'GET',
				data:params,
				complete:(response)=>{
					if(response.status === 200){
						resolve(response.responseText);
					}else{
						reject(`${this.message.serverError}(${response.status})`);
					}
				}
			});
		});
	}
	
	private login(appendHtml:string):Promise<ILogined>{
		return new Promise((resolve, reject)=>{
			const login = $(appendHtml).find('.content-area').html();
			$('#common-modal').find('.contents').empty().append(login);
			UIkit.modal('#common-modal').show();
			this.moduleInitalize(login).then((Module)=>{
				const module = Module.get('login');
				module.promise = {
					resolve:resolve
				}
			}).catch((err)=>{
				throw new Error(err);
			});
		});
	}

	public inspectLogin():Promise<any>{
		return new Promise(async (resolve, reject)=>{
			try{
				if(this.attributes.isSignIn === 'true'){
					resolve({logined:true});
				}else{
					const dynamicFormLoader = await this.dynamicFormLoader(this.contextPath + '/dynamicformpage', {name:'login', dataType:'model'});
					const logined = await this.login(dynamicFormLoader);
					this.signIn = true;
					UIkit.modal('#common-modal').hide();
					resolve(logined);

					if(this._redirect){
						window.location.href = this._redirectUrl;
					}
				}
			}catch(err){
				UIkit.notify(err, {timeout:3000,pos:'top-center',status:'danger'});
			}
		});
	}

	public setItemCount(itemCount:number):void{
		this.cartItemLength_0.setItemCount(itemCount);
		this.cartItemLength_1.setItemCount(itemCount);
	}

	public get signIn():boolean{
		return (this.attributes.isSignIn === 'true') ? true : false;
	}
	public set signIn(signIn:boolean){
		this.attributes.isSignIn;
	}
	public get redirect():boolean{
		return this._redirect;
	}
	public set redirect(redirect:boolean){
		this._redirect = redirect;
	}
	public get redirectUrl():string{
		return this._redirectUrl;
	}
	public set redirectUrl(url:string){
		this._redirectUrl = url;
	}

	public moduleWillUnmount():void{}
}