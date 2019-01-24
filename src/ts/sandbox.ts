import Core from './core';
import JQuery from 'jQuery';

export default class Sandbox extends Core{
	$:JQueryStatic;

	constructor(){
		super();

		this.$ = JQuery;
	}

	rtnJson(data:string, noteval:boolean=true):object{
		return this.strToJson(data, noteval);
	}

	moduleInitalize(strHtml:string, defer?:object):void{
		this.moduleEventInjection(strHtml, defer);
	}

	componentsInitalize(context:Element, mountFunc:any):void{
		this.componentEventInjection(context, mountFunc);
	}

	rtnToAttributes(_self:any, attrName:any):any{
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
}
