import Sandbox from '../sandbox';
import { IModulePromise } from './interface/imodule';

export default abstract class Module extends Sandbox {
	public context:HTMLElement;
	public attributes:any;
	private _promise:IModulePromise;
	
	constructor(selector:string, attrName:string|string[]){
		super();

		this.context = document.querySelector(selector) as HTMLElement;
		this._promise = {resolve:null, reject:null}
		this.attributes = this.rtnToAttributes(this.context, attrName);
		this.componentsInitalize(this.context, this.moduleWillMount);
	}

	public abstract moduleWillMount():void;
	public abstract moduleWillUnmount():void;
	
	public get promise():IModulePromise{
		return this._promise;
	}
	
	public set promise(promise:IModulePromise){
		this._promise = promise;
	}
}
