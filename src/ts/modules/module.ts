import Sandbox from '../sandbox';
import IModule from '../interface/imodule';

export default abstract class Module extends Sandbox {
	protected context:any;
	protected attributes:any;

	constructor(selector:string, attrName:string|string[]){
		super();

		this.context = document.querySelector(selector);
		this.attributes = this.rtnToAttributes(this.context, attrName);
		this.componentsInitalize(this.context, this.moduleWillMount);
	}

	public abstract moduleWillMount(components:any[]):void;
	public abstract moduleWillUnmount():void;
}
