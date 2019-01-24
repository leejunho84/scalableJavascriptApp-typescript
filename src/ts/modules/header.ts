import Module from "./module";

export default class Header extends Module {
	constructor(){
		super('[data-module-header]', 'data-module-header');
		//this.componentsInitalize(this.context, this.moduleWillMount);
	}

	moduleWillMount():void{};
	moduleWillUnmount():void{};
}