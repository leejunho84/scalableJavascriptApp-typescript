import ICore from './interface/icore';

export default class Core implements ICore{
	constructor(){}
	moduleEventInjection(strHtml:string, defer?:object):void{
		if(!strHtml) return;
		let ID = strHtml.match(/data-(?:module)-(?:\w|-)+/g) || [];
		let modules:string[] = [];

		for(let i=0; i<ID.length; i++){
			let name = ID[i].replace(/data-/g, '').replace(/-/g, '_');
			modules.push(ID[i].split('module-').slice(-1)[0].replace(/(-\w{1})/g, ($1:string):string=>{
				return $1.replace('-', '').toUpperCase();
			}));
		}

		Promise.all(modules.map(async (name:string)=>{
			const MODULE = await import(`./modules/${name}.js`)
			return MODULE;
		})).then((resolve)=>{
			resolve.map((Module)=>{
				const module = new Module.default();
				this.sessionModules(module.selector, module);
			});
		}).catch((err)=>{
			console.log(err);
		});
	}

	componentEventInjection(context:Element, mounted:Function):void{
		const contextId:string = this.findContextName(context);
		const strHtml:string = context.innerHTML;
		const IDs:string[] = this.arraySameRemove<string>(strHtml.match(/data-(?:component)-(?:\w|-)+/g) || []);
		const components:Map<string, string|Element>[] = [];

		IDs.map((id, index)=>{
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
			mounted.call(this, ...resolve);
		}).catch((err)=>{
			console.log(err);
		});
	}

	findParent(context:Element, id:string, callBackFunc:Function):void{
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

	findContextName(context:Element):string{
		const html:string = context.outerHTML.replace(context.innerHTML, '');
		const IDs:string[] = html.match(/data-(?:module|component)-(?:\w|-)+/) || [];
		return IDs[0];
	}

	strToJson(str:string, noteval:boolean):object{
		try{
			// json 데이터에 "가 있을경우 변환할필요가 없으므로 notevil을 false로 변경
			if(str.match(/"/g) !== null) noteval = false;
			if(noteval) {
				return JSON.parse(str
					// wrap keys without quote with valid double quote
					.replace(/([\$\w]+)\s*:+([`'~!@#$%^&*?();:|_+=\/\w-#().\s0-9가-힣/\[/\]]*)/g, function(_, $1, $2){
						if($2 !== ''){
							return '"'+$1+'":"'+$2+'"';
						}else{
							return '"'+$1+'":""';
						}
					})
					//replacing single quote wrapped ones to double quote
					.replace(/'([^']+)'/g, function(_, $1){return '"'+$1+'"';}));
			} else {
				return (new Function("", "var json = " + str + "; return JSON.parse(JSON.stringify(json));"))();
			}
		}catch(e){
			return {error:'PARSING_ERROR'};
		}
	}

	arraySameRemove<T>(array:T[]):T[]{
		const resultArray:T[] = [];
		return array.reduce((prev, current)=>{
			if(prev.indexOf(current) < 0){
				prev.push(current);
			}
			return prev;
		}, resultArray);
	}

	//모듈간 통신을 위해 session에서 모듈의 집합 및 상태를 관할하는 부분이 필요하여
	//sessionStorage를 사용하여 모듈을 등록하고 참조할수있게 Core에 method를 추가함
	//sessionStorage를 어떠한 타입으로 정의해야하는지 찾아봐야함 임시로 any타입으로 정의
	//sessionStorage는 value 타입이 string 으로 안됨 
	sessionModules(key:string, value?:any){
		if(value !== undefined){
			window.sessionStorage.setItem(key, value);			
		}else{
			return window.sessionStorage.getItem(key);
		}
	}
}
