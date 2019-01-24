//button component
import Component from './component';

export default class Button extends Component{
	constructor(context:Element){
		super(context);

		this.selector = '[data-component-button]';
		this.attrName = 'data-component-button';
	}

	componentDidMount():void{
		let $this = this.$(this.target);
		$this.on({
			mouseEnter:(e) => {
				e.preventDefault();
				this.fireEvent('mouseEnter', e.target);
			},
			mouseLeave:(e) => {
				e.preventDefault();
				this.fireEvent('mouseLeave', e.target);
			},
			click:(e) => {
				e.preventDefault();
				this.fireEvent('click', e.target);
			}
		});
	}

	componentWillUnmount():void{
		
	}
}
