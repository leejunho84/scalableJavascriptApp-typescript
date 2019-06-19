import IModule from "./modules/interface/imodule";

export default class Core {
	static mountedModules:Map<string, IModule>;
	
	constructor(){
		if(Core.mountedModules === undefined){
			Core.mountedModules = new Map();
		}
	}

	private findParent(context:Element, id:string, callBackFunc:Function):void{
		const parentContext:Element|null = context.parentElement;
		const outerHTML:string = (parentContext !== null) ? parentContext.outerHTML.replace(parentContext.innerHTML, '') : '';
		const ID:string[] = outerHTML.match(/data-(?:module|component)-(?:\w|-)+/) || [];

		if(ID.length <= 0 || ID.indexOf(id) > -1){
			if(parentContext !== null){
				this.findParent(parentContext, id, callBackFunc);
			}
		}else{
			if(parentContext !== null) callBackFunc(ID[0], parentContext);
		}
	}


	public findSingleComponent(context:Element):void{
		const parentContext:Element|null = (context.tagName === 'BODY') ? context:context.parentElement;
		if(parentContext !== null){
			const IDs:string[] = this.arraySameRemove(parentContext.innerHTML.match(/data-component-(?:\w|-)+/g) || []);
			IDs.map((id, index, ids)=>{
				const targets = context.querySelectorAll(`[${id}]`);
				targets.forEach(async (target, index, targets)=>{
					if(!this.hasParent(target)){
						const Component = await import(`./components/${id.split('component-').slice(-1)[0].replace(/-\w{1}/g, ($1:string):string=>{
							return $1.replace('-', '').toUpperCase();
						})}.js`);
						new Component.default(target).componentWillMount();
					}
				});
			});
		}
	}

	private hasParent(context:Element):boolean{
		const parentContext = (context !== null) ? context.parentElement : null;
		const outerHTML:string = (parentContext !== null) ? parentContext.outerHTML.replace(parentContext.innerHTML, '') : '';
		const pattern:RegExp = new RegExp(/data-(?:module|component)-(?:\w|-)+/);

		if(context.tagName !== 'BODY'){
			if(parentContext !== null && !pattern.test(outerHTML)){
				return this.hasParent(parentContext);
			}else{
				return true;
			}
		}else{
			return false;
		}
	}

	private findContextName(context:Element):string{
		const html:string = context.outerHTML.replace(context.innerHTML, '');
		const IDs:string[] = html.match(/data-(?:module|component)-(?:\w|-)+/) || [];
		return IDs[0];
	}

	public async moduleEventInjection(strHtml:string, defer?:()=>{}):Promise<Map<string, any>>{
		let IDs = strHtml.match(/data-(?:module)-(?:\w|-)+/g) || [];
		let moduleNames = IDs.map((id, index, ids):string=>{
			return id.split('module-').slice(-1)[0].replace(/-\w{1}/g, ($1:string):string=>{
				return $1.replace('-', '').toUpperCase();
			});
		});

		try{
			const resolve = await Promise.all(moduleNames.map(async (name_1: string) => {
				const MODULE = await import(`./modules/${name_1}.js`);
				return MODULE;
			}));

			const loadCompleteModule:Map<string, any> = new Map();
			resolve.map((Module, index) => {
				const module = new Module.default();
				Core.mountedModules.set(moduleNames[index], module);
				loadCompleteModule.set(moduleNames[index], module);
			});
			return loadCompleteModule;
		}catch(err) {
			throw new Error(err);
		}
	}

	public componentEventInjection(target:any, context:Element, mounted:Function):void{
		const contextId:string = this.findContextName(context);
		const strHtml:string = context.innerHTML;
		const IDs:string[] = this.arraySameRemove<string>(strHtml.match(/data-(?:component)-(?:\w|-)+/g) || []);
		const components:Map<string, string|Element>[] = [];
		
		//context innerHTML을 가져와 component를 찾는다. 그리곤 찾은 컴포넌트의 리스트의 상위 모듈과 컴포넌트가 현재 contextId와 같은지 비교후 같을때만 컴포넌트를 리턴한다.
		IDs.forEach((id, index, ids)=>{
			const componentContexts:NodeListOf<Element>|null = context.querySelectorAll('[' + id + ']');
			componentContexts.forEach((componentContext, index, nodeList)=>{
				this.findParent(componentContext, id, (parentId:string, parentContext:Element)=>{
					const component:Map<string, string|Element> = new Map();

					if(contextId === parentId){
						const key = id.replace(/data-component-/g, '').replace(/(-\w{1})/g, function($1:string):string{
							return $1.replace('-', '').toUpperCase();
						});
						component.set('name', key).set('context', componentContext);
						components.push(component);
					}
					//처음에는 현재 컨텍스트와 상위컨텍스트의 Dom object로 비교하였으나 성능이슈로 컨텍스트의 id( data-module-... | date-component-... ) 값을 가지고 비교함
					/*if(context === parentContext){}*/
				});
			});
		});

		Promise.all(components.map(async (component)=>{
			const COMPONENT = await import(`./components/${component.get('name')}.js`);
			return new COMPONENT.default(component.get('context')).componentWillMount();
		})).then((resolve)=>{
			mounted.call(target, ...resolve);
		}).catch((err)=>{
			throw new Error(err);
		});
	}

	public strToJson(str:string, noteval:boolean=true):any{
		try{
			// json 데이터에 "가 있을경우 변환할필요가 없으므로 notevil을 false로 변경
			if(str.match(/"/g) !== null) noteval = false;
			if(noteval){
				return JSON.parse(str
					.replace(/([\w]+)\s?(?=:)|(?<=:)([^{,}]|{[\w\s=,]+})+/g, function($1){
						return '"' + $1 + '"';
					}));
					//.replace(/'([^']+)'/g, function($1){return '"'+$1+'"';}));
			}else{
				return (new Function("", "var json = " + str + "; return JSON.parse(JSON.stringify(json));"))();
			}
		}catch(e){
			return {error:'PARSING_ERROR'};
		}
	}

	public arraySameRemove<T>(array:T[]):T[]{
		const resultArray:T[] = [];
		return array.reduce((prev, current)=>{
			if(prev.indexOf(current) < 0){
				prev.push(current);
			}
			return prev;
		}, resultArray);
	}

	public serialize(context:HTMLFormElement|Element|null):string{
		let serializes:string[] = [];
		if(context !== null){
			const inputElement:NodeListOf<HTMLInputElement> = context.querySelectorAll('input');
			inputElement.forEach((input, index, inputs)=>{
				const key = input.getAttribute('name');
				const value = input.value;
				const disable = input.getAttribute('disabled');
				const type = input.getAttribute('type');
				if(!disable){
					if(type === 'checkbox'){
						serializes.push(`${key}=${input.checked}`);
					}else{
						serializes.push(`${key}=${value}`);
					}
				}
			});
		}else{
			throw new Error('Element is null');
		}

		return serializes.join('&');
	}

	public queryParams(str:string, type:string):string[]
	public queryParams(str:string):Map<string, string|string[]>
	public queryParams(str:string, type?:string){
		if(type === 'array'){
			let result:string[] = [];
			str.replace(/([^?=&]+)(?:=([^&]*))/g, (pattern, key, value):string=>{
				result.push(pattern);
				return pattern;
			});	
			return result;
		}else{
			let result:Map<string, string|string[]> = new Map();
			str.replace(/([^?=&]+)(?:=([^&]*))/g, (pattern, key, value):string=>{
				if(result instanceof Map){
					if(result.has(key)){
						let currentValue = result.get(key);
						if(currentValue){
							if(currentValue instanceof Array){
								currentValue.push(value);
							}else{
								result.set(key, [currentValue, value]);
							}
						}
					}else{
						result.set(key, value);
					}
				}
				return pattern;
			});	
			return result;
		}
	}

	public setCookie(name:string, value:string, exp?:number):void{
		const date = new Date();
		const expires = exp ? exp : 0;
		date.setTime(date.getTime() + expires*24*60*60*1000);
		document.cookie = `${name}=${value};${(expires > 0) ? ('expires=' + date.toUTCString()) : ''}`;
	}

	public getCookie(name:string):string|null{
		var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
		return value ? value[2] : null;
	}

	public removeCookie(name:string):void{
		document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
}
