//@deprecated
export default interface ICore {
	moduleEventInjection(strHtml:string, defer?:object):void
	componentEventInjection(context:Element, mounted:()=>{}):void
	findParent(context:Element, id:string, callBackFunc:()=>{}):void
	findContextName(context:Element):string
	strToJson(str:string, noteval?:boolean):object
	arraySameRemove<T>(array:T[]):T[]
}
