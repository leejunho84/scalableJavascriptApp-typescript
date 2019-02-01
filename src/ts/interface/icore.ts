export default interface ICore {
	moduleEventInjection(strHtml:string, defer?:object):void
	componentEventInjection(context:Element, mounted:Function):void
	findParent(context:Element, id:string, callBackFunc:Function):void
	findContextName(context:Element):string
	strToJson(str:string, noteval?:boolean):object
	arraySameRemove<T>(array:T[]):T[]
	sessionModules(key:string, value?:any):void
	sessionModules(key:string):any
}
