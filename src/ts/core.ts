import ICore from './interface/icore';

export default class Core implements ICore{
	constructor(){}
	moduleEventInjection(strHtml:string, defer?:object):void{
		if(!strHtml) return;
		let ID = strHtml.match(/data-(?:module)-(?:\w|-)+/g) || [];
		let modules:string[] = [];

		for(let i=0; i<ID.length; i++){
			let name = ID[i].replace(/data-/g, '').replace(/-/g, '_');
			let type = name.replace(/\_\w*/g, '');
			let importName = name.replace(type, '').replace(/_/, '');
			modules.push(importName);
		}

		Promise.all(modules.map(async (name:string)=>{
			const MODULE = await import(`./modules/${name}.js`)
			return MODULE;
		})).then((resolve)=>{
			resolve.map((module)=>{
				new module.default();
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
}
