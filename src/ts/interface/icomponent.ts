export default interface IComponent {
	context:Element
	target:any
	selector:string
	attrName:string|string[]
	attributes:any
	eventID:number
	listeners:Map<string, Map<number, Function>>
	componentWillMount():void
	componentDidMount(...components:any[]):void
	addEvent(type:string, handler:Function):void
	fireEvent(type:string, target:object, params?:any[]):void
	removeEvent(type:string, hnd:Function):void
}
