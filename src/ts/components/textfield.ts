//textField Component
import Component from './component';

export default class Text extends Component {
	private currentValue:string|string[]|number|undefined;
	private $input:any;

	constructor(context:Element){
		super(context);
		
		this.currentValue = '';
		this.selector = '[data-component-textField]';
		this.attrName = 'data-component-textField';
	}

	componentDidMount(...components:any[]):void{
		const _this = this;
		const $this = $(this.target);
		const $deleteBtn = $this.find('.deleteBtn');
		const $input = $this.find('input[type=text]');
		this.$input = $input;

		$input.on('focusin', (e) => {
			e.preventDefault();
			
			this.currentValue = $input.val();
			this.fireEvent('inputFocusIn', e.currentTarget, [this.currentValue]);
		});

		$input.on('focusout', (e) => {
			e.preventDefault();
			
			this.currentValue = $input.val();
			this.fireEvent('inputFocusOut', e.currentTarget, [this.currentValue]);
		});

		$input.on('change', (e) => {
			e.preventDefault();
			
			this.currentValue = $input.val();
			this.fireEvent('change', e.currentTarget, [this.currentValue]);
		});

		$deleteBtn.on('click', (e) => {
			e.preventDefault();
			$input.val('');
		});

		//input의 버튼 컴포넌트
		components.map((component)=>{
			component.addEvent('clicked', function(this:HTMLElement, ...args:any[]){
				_this.fireEvent('searching', $input[0], [$input.val()]);
			});
		});
	}

	componentWillUnmount():void{
		this.$input.off();
		this.currentValue = undefined;
		this.$input = undefined;
	}

	get value():string|string[]|number|undefined{
		return this.currentValue;
	}
	set value(val:string|string[]|number|undefined){
		this.$input.val(val);
	}
}
