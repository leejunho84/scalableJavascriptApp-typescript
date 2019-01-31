import Sandbox from '../sandbox';
import IComponent from '../interface/icomponent';

export default abstract class Component extends Sandbox implements IComponent{
	context:Element
	target:any
	attributes:any
	eventID:number
	listeners:Map<string, Map<number, Function>>

	selector:string
	attrName:string|string[]

	constructor(context:Element){
		super();

		this.context = context;
		this.selector = '';
		this.attrName = '';
		this.eventID = 0;
		this.listeners = new Map();
		this.attributes = {};
	}

	componentWillMount():this{
		this.target = this.context; //this.context.querySelector(this.selector);
		this.attributes = this.rtnToAttributes(this.target, this.attrName);
		this.componentsInitalize(this.target, this.componentDidMount);
		return this;
	}

	addEvent(type:string, handler:Function):void{
		if(!this.listeners.has(type)) this.listeners.set(type, new Map());
		let events = this.listeners.get(type) || new Map();
		events.set(this.eventID, handler);
	}

	fireEvent(type:string, target:object, params?:any[]):void{
		let handlers = this.listeners.get(type) || new Map();
		handlers.forEach((value, index, handlers) => {
			value.apply(target, params);
		});
		
		/*
		for(let [key, value] of handlers.entries()){
			//console.log(key, value);
			//value.apply(target, params);
		}
		*/		
	}

	removeEvent(type:string):void{
		if(this.listeners.has(type)){
			let handlers = this.listeners.get(type) || new Map();
			handlers.delete(this.eventID);
		}
	}

	abstract componentDidMount(...components:any[]):void
	abstract componentWillUnmount():void
}
