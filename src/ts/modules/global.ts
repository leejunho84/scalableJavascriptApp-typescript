import Module from "./module";

export default class Global extends Module {
	constructor(){
		super('[data-module-global]', 'data-module-global');
		this.componentsInitalize(this.context, this.moduleWillMount);
	}

	moduleWillMount(...components:any[]):void{
		//you write marketing tag and analytics in this here
		//console.log(this.modules);
		const aaa = this.sessionModules('undefined');
		console.log(aaa);
	}

	moduleWillUnmount():void{}
}