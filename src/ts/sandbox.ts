import Core from './core';
import JQuery from 'jQuery';

export default class Sandbox {
	private core:Core;
	public $:JQueryStatic;
	
	constructor(){
		this.core = new Core();
		this.$ = JQuery;
	}

	public rtnJson(data:string, noteval:boolean=true):object{
		return this.core.strToJson(data, noteval);
	}

	public moduleInitalize(strHtml:string):void{
		this.core.moduleEventInjection(strHtml);
	}

	public componentsInitalize(context:Element, mountFunc:any):void{
		this.core.componentEventInjection(this, context, mountFunc);
	}

	public rtnToAttributes(_self:any, attrName:string|string[]):any{
		if(_self){
			if(attrName instanceof Array){
				//multiple attribute
				let attributes:Map<string, any> = new Map();
				attrName.forEach((t:string, i:number, a:any[]) => {
					attributes.set(t, this.rtnJson(_self.getAttribute(t)));
				});
				return attributes;
			}else{
				//single attribute
				return this.rtnJson(_self.getAttribute(attrName));
			}
		}
	}
	
	public ajax(url:string, method:string, data:object, success:Function):void{
		this.$.ajax({
			url:url,
			method:method,
			data:data,
			success:(data:any) => {
				success(data);
			}
		});
	}

	public mountedModule():void;
	public mountedModule(key:string):any;
	public mountedModule(key?:string):any{
		if(typeof key === 'string'){
			return Core.mountedModules.get(key);
		}else{
			return Core.mountedModules;
		}
	}
}
