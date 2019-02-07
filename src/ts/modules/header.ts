import Module from "./module";

export default class Header extends Module {
	constructor(){
		super('[data-module-header]', 'data-module-header');
	}

	moduleWillMount():void{};
	moduleWillUnmount():void{};
}