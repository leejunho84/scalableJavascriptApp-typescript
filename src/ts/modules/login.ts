import Module from "./module";

export default class Login extends Module {
	constructor(){
		super('[data-module-login]', 'data-module-login');
	}

	moduleWillMount(...components:any[]):void{
		components.map((component)=>{
			console.log(component);
		});
	};
	moduleWillUnmount():void{}
}