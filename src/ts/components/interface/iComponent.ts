export default interface IComponent {
	context:HTMLElement
	target:any
	selector:string
	attrName:string|string[]
		
	componentWillMount():void
	componentDidMount(...components:any[]):void
	addEvent(type:string, handler:Function):void
	fireEvent(type:string, target:EventTarget|null, params?:any[]):void
	removeEvent(type:string, hnd:Function):void
}
