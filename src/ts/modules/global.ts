import Module from "./module";

export default class Global extends Module {
	constructor(){
		super('[data-module-global]', 'data-module-global');
	}

	moduleWillMount(...components:any[]):void{
		//you are write marketing tag and analytics in this here
		//console.log(this.modules);
	}

	moduleWillUnmount():void{}
}