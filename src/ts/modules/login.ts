import Module from "./module";
import { IIdComponent, IPasswordComponent, IUsableAutoLogin, ILogined } from "./interface/ILogin";
import Rx from "../libs/rxjs";

export default class Login extends Module {
	private _id?:IIdComponent;
	private _password?:IPasswordComponent;
	private _usableAutoLogin?:IUsableAutoLogin;

	constructor(){
		super('[data-module-login]', 'data-module-login');
	}

	public moduleWillMount(...components:any):void{
		const [id, password, usableAutoLogin] = components;
		this._id = id;
		this._password = password;
		this._usableAutoLogin = usableAutoLogin;

		if(this.context){
			const form = this.context.querySelector<HTMLFormElement>('form');
			const submitBtn = this.context.querySelector<HTMLButtonElement>('button[type=submit]');
			if(submitBtn && form){
				Rx.fromEvent(submitBtn, 'click').subscribe((e)=>{
					const target = e.currentTarget as HTMLButtonElement;
					const queryParams = this.serialized(form);
					(async ()=>{
						try{
							const logined = await this.sendToLogin(form.action, queryParams);
							if(logined.ResponseObject.isError === 'false'){
								if(this.promise.resolve && typeof this.promise.resolve === 'function'){
									this.promise.resolve(logined);
								}
							}else if(logined.ResponseObject.isError === 'true'){
								if(this.promise.reject && typeof this.promise.reject === 'function'){
									this.promise.reject(logined.ResponseObject._global);
								}
								UIkit.notify(logined.ResponseObject._global, {timeout:3000,pos:'top-center',status:'danger'});
							}
						}catch(exception){
							UIkit.notify(exception, {timeout:3000,pos:'top-center',status:'danger'});
						}
					})();
				});
			}
		}
	}

	private sendToLogin(url:string, params:string):Promise<ILogined>{
		return new Promise((resolve, reject)=>{
			$.ajax({
				url:url,
				method:'POST',
				data:params,
				complete:(response)=>{
					if(response.status === 200){
						resolve(response.responseJSON);
					}else{
						reject(`${this.message.serverError}(${response.status})`);
					}
				}
			});
		});
	}

	public moduleWillUnmount():void{}
}