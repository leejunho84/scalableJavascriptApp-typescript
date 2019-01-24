//textField Component
import Component from './component';

export default class Text extends Component {
	private currentValue:string|number|undefined;
	private $input:any;

	constructor(context:Element){
		super(context);
		
		this.currentValue = '';
		this.selector = '[data-component-textField]';
		this.attrName = 'data-component-textField';
	}

	componentDidMount():void{
		let $this = this.$(this.target);
		let $deleteBtn = $this.find('.deleteBtn');
		let $input = $this.find('input[type=text]');
		this.$input = $input;

		$input.on('focusin', (e) => {
			e.preventDefault();
			
			this.currentValue = this.$input.val();
			this.fireEvent('inputFocusIn', e.currentTarget, [this.currentValue]);
		});

		$input.on('focusout', (e) => {
			e.preventDefault();
			
			this.currentValue = this.$input.val();
			this.fireEvent('inputFocusOut', e.currentTarget, [this.currentValue]);
		});

		$input.on('change', (e) => {
			e.preventDefault();
			
			this.currentValue = this.$input.val();
			this.fireEvent('change', e.currentTarget, [this.currentValue]);
		});

		$deleteBtn.on('click', (e) => {
			e.preventDefault();
			this.$input.val('');
		});
	}

	componentWillUnmount():void{
		this.$input.off();
		this.currentValue = undefined;
		this.$input = undefined;
	}

	get value():string|number|undefined{
		return this.currentValue;
	}
	set value(val:string|number|undefined){
		this.$input.val(val);
	}
}
