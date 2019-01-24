import Sandbox from '../sandbox';
import IModule from '../interface/imodule';

export default abstract class Module extends Sandbox implements IModule {
	context:any;
	attributes:any;
	components:any[];

	constructor(selector:string, attrName:string|string[]){
		super();

		this.context = document.querySelector(selector);
		this.attributes = this.rtnToAttributes(this.context, attrName);
		this.components = [];
	}

	abstract moduleWillMount(component:any[]):void;
	abstract moduleWillUnmount():void;
}
