//Radio Component
import Component from './component';

export default class Radio extends Component {
	constructor(context:Element){
		super(context);

		this.selector = '[data-component-radio]';
		this.attrName = 'data-component-radio';
	}

	componentDidMount():void{
		let $this = this.$(this.target);
		let $radio = $this.find('input[type=radio]');
		
		$radio.off('change').on('change', (e) => {
			let element = e.currentTarget;
			let $this = this.$(e.currentTarget);
			
			if($this.prop('checked')){
				$this.parent().addClass('checked').siblings().removeClass('checked');
				$this.siblings().attr('checked');
				this.fireEvent('change', e.currentTarget, [e.currentTarget.getAttribute('value')]);
			}
		});
		
		//기본 선택값 처리
		$radio.each((index, currentTarget) => {
			let $this = this.$(currentTarget);
			if(currentTarget.getAttribute('checked') === 'checked'){
				setTimeout(() => {
					$this.trigger('change');
					this.fireEvent('defaultFocus', currentTarget);
				});
			}
		});
	}

	componentWillUnmount():void{
		
	}
}
