import Core from './core';
import Message from './messageProperty';
import Rx from './libs/rxjs';
import {map} from './libs/operators';

export default class Sandbox {
	private core:Core;

	constructor(){
		this.core = new Core();
	}

	public rtnJson(data:string, noteval:boolean=true):any{
		return this.core.strToJson(data, noteval);
	}

	public moduleInitalize(strHtml:string){
		return this.core.moduleEventInjection(strHtml);
	}

	public componentsInitalize(context:Element, mountFunc:Function):void{
		this.core.componentEventInjection(this, context, mountFunc);
	}

	public rtnToAttributes(_target:HTMLElement, attrName:string|string[]):any{
		if(attrName instanceof Array){
			//multiple attribute
			let attributes:Map<string, any> = new Map();
			attrName.forEach((t:string, i:number, a:string[]) => {
				attributes.set(t, this.rtnJson(_target.getAttribute(t)||''));
			});
			return attributes;
		}else{
			//single attribute
			return this.rtnJson(_target.getAttribute(attrName)||'');
		}
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

	public get message(){
		return Message.messageProperty();
	}

	public get contextPath():string{
		return '';
		/*return (()=>{
			try{
				return _GLOBAL.SITE.CONTEXT_PATH ? _GLOBAL.SITE.CONTEXT_PATH : '';
			}catch(e){
				return '';
			}
		})();*/
	}

	public serialized(context:HTMLFormElement|Element|null):string{
		return this.core.serialize(context);
	}

	public queryParams(serialize:string):Map<string, string | string[]>
	public queryParams(serialize:string, isArray:boolean):string[]
	public queryParams(serialize:string, isArray?:boolean){
		return (isArray) ? this.core.arrayQueryParams(serialize) : this.core.mapQueryParams(serialize);
	}

	public loadingBar(usable:boolean):void{
		if(usable){
			Loading.show();
		}else{
			Loading.hide();
		}
	}

	public fromEvent(target:Element, eventName:string):Rx.Observable<Event>{
		return Rx.fromEvent(target, eventName);
	}

	public delegate(wrapper:Element, selector:string, eventName:string):Rx.Observable<{event:Event, delegate:Element|null}>{
		return Rx.fromEvent(wrapper, eventName).pipe(
			map((e) => {
				const target = e.target as Element
				return {
					event:e,
					delegate:target.closest(selector)
				}
			})
		);
	}

	public removeDelegate(subscription:Rx.Subscription):void{
		subscription.unsubscribe();
	}

	public removeCookie(name:string):void{
		this.core.removeCookie(name);
	}

	public cookie(name:string):string|null
	public cookie(name:string, value:string, exp?:number):void
	public cookie(name:string, value?:string, exp?:number){
		if(value){
			this.core.setCookie(name, value, exp);
		}else{
			return this.core.getCookie(name);
		}
	}


	public hasClass(target:Element, hasClass:string):boolean{
		const currentClass = target.getAttribute('class') || '';
		const pattern = new RegExp(hasClass, 'g');
		return pattern.test(currentClass);
	}

	public addClass(target:Element, appendClass:string):void{
		const currentClass = target.getAttribute('class') || '';
		const splitClass = currentClass.split(/\s/);
		const index = splitClass.indexOf(appendClass);
		if(index > -1){
			splitClass.splice(index, 1);
		}
		splitClass.push(appendClass);
		target.setAttribute('class', `${splitClass.join(' ')}`);
	}

	public removeClass(target:Element, removeClass:string):void{
		const currentClass = target.getAttribute('class') || '';
		const splitClass = currentClass.split(/\s/);
		const index = splitClass.indexOf(removeClass);
		if(index > -1){
			splitClass.splice(index, 1);
		}
		target.setAttribute('class', `${splitClass.join(' ')}`);
	}
}

class Loading {
	static $loading?:JQuery<HTMLElement>;
	static defaultTemplate:string = `<div class="loading"><div class="dim"></div><div class="contents"><img src="/assets/images/preloader.gif" /><span class="comment">처리중 입니다.</span></div></div>`;
	static show(){
		if(!this.$loading){
			this.$loading = $('body').append(this.defaultTemplate);
		}else{
			this.$loading.addClass('open');
		}
	}
	static hide(){
		if(this.$loading){
			this.$loading.remove('open');
		}
	}
}
