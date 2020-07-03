//textField Component
import Component from './component';
import { ITextFieldAttributes } from './interface/ITextField';

export default class Text extends Component {
	private _input?:HTMLInputElement|null;
	private _error?:Element|null;
	private _pattern!:RegExp;
	public attributes:ITextFieldAttributes;

	constructor(context:HTMLElement){
		super(context);

		this.selector = '[data-component-textfield]';
		this.attrName = 'data-component-textfield';
		this.attributes = this.rtnToAttributes(this.context, this.attrName);
	}

	public componentDidMount(...components:any[]):void{
		const _this = this;
		this._input = this.context.querySelector<HTMLInputElement>('input[type=text]');
		this._error = this.context.querySelector('.server-error-message');
		this._pattern = new RegExp(this.attributes.regex);

		if(this._input){
			this._input.addEventListener('focusin', function(this:HTMLInputElement, e:Event){
				e.preventDefault();
				_this.fireEvent('inputFocusIn', e.currentTarget, {value:this.value});
			});

			this._input.addEventListener('focusout', function(this:HTMLInputElement, e:Event){
				e.preventDefault();
				_this.fireEvent('inputFocusOut', e.currentTarget, {value:this.value});
			});

			this._input.addEventListener('change', function(this:HTMLInputElement, e:Event){
				e.preventDefault();

				if(_this.validate){
					_this.fireEvent('change', e.currentTarget, {value:this.value});
				}
			});
		}
	}

	public componentWillUnmount():void{}

	get validate():boolean{
		let result = false;
		if(this.attributes.required === 'true'){
			if(this.value !== ''){
				if(this.attributes.regex){
					//value 체크 후, 정규식을 체크, 정규식 메시지에 여부에 따라 error표시
					if(this._pattern.test(this.value)){
						if(this._error){
							this._error.textContent = '';
						}
						result = true;
					}else{
						if(this._error){
							this._error.textContent = this.attributes.regexMsg || this.message.requiredTextField;
						}
						result = false;
					}
				}else{
					//value만 체크함, 정규식이 없는 상태
					if(this._error){
						this._error.textContent = '';
					}
					result = true;
				}
			}else{
				result = false;
				if(this._error){
					this._error.textContent = this.message.requiredTextField;
				}
			}
		}else{
			result = true;
		}
		return result;
	}

	get value():string{
		return (this._input) ? this._input.value : '';
	}
	set value(val:string){
		if(this._input){
			this._input.value = val;
		}
	}
	get errorValue():string{
		return (this._error) ? this._error.textContent||'' : '';
	}
	set errorValue(val:string){
		if(this._error){
			this._error.textContent = val;
		}
	}
}
