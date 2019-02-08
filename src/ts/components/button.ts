//button component
import Component from './component';

export default class Button extends Component{
	private $this:any;
	constructor(context:Element){
		super(context);

		this.selector = '[data-component-button]';
		this.attrName = 'data-component-button';
	}

	componentDidMount():void{
		this.$this = $(this.target);
		this.$this.on({
			mouseenter:(e:Event) => {
				e.preventDefault();
				this.fireEvent('mouseOver', e.target);
			},
			mouseleave:(e:Event) => {
				e.preventDefault();
				this.fireEvent('mouseOut', e.target);
			},
			click:(e:Event) => {
				e.preventDefault();
				this.fireEvent('clicked', e.target);
			}
		});
	}

	componentWillUnmount():void{
		this.$this.off();
	}
}
