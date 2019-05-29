//checkbox component
import Component from './component';
import { ICheckbox } from './interface/ICheckbox';

export default class Checkbox extends Component implements ICheckbox{
	private _value:boolean;

	constructor(context:HTMLElement){
		super(context);

		this.selector = '[data-component-checkbox]';
		this.attrName = 'data-component-checkbox';
		this._value = false;
	}

	public componentDidMount():void{
		const checkbox = this.context.querySelector<HTMLInputElement>('input[type=checkbox]');
		if(checkbox){
			this._value = checkbox.checked;
			checkbox.addEventListener('change', (e)=>{
				const target = e.currentTarget as HTMLInputElement;
				this.value = checkbox.checked;
				this.fireEvent('change', target, {checked:target.checked});
			});
		}
	}

	public validate():boolean{
		let result = false;
		if(!this.attributes.required || this.attributes.required === 'false'){
			result = true;
		}else{
			result = this.value;
		}
		return result;
	}

	get value():boolean{
		return this._value;
	}

	set value(val:boolean){
		this._value = val;
	}

	public componentWillUnmount():void{}
}
