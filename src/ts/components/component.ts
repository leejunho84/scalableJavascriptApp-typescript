import Sandbox from '../sandbox';
import IComponent from '../interface/icomponent';

export default abstract class Component extends Sandbox {
	protected context:Element
	protected target:any
	protected attributes:any
	private eventID:number
	private listeners:Map<string, Map<number, Function>>

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

	public componentWillMount():any{
		this.target = this.context; //this.context.querySelector(this.selector);
		this.attributes = this.rtnToAttributes(this.context, this.attrName);
		this.componentsInitalize(this.context, this.componentDidMount);
		return this;
	}

	public addEvent(type:string, handler:Function):void{
		if(!this.listeners.has(type)) this.listeners.set(type, new Map());
		let events = this.listeners.get(type) || new Map();
		events.set(this.eventID, handler);
	}

	public fireEvent(type:string, target:EventTarget|null, params?:any[]):void{
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

	public removeEvent(type:string):void{
		if(this.listeners.has(type)){
			let handlers = this.listeners.get(type) || new Map();
			handlers.delete(this.eventID);
		}
	}

	public abstract componentDidMount(...components:any[]):void
	public abstract componentWillUnmount():void
}
