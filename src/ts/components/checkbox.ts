//checkbox component
import Component from './component';

export default class Checkbox extends Component{
	constructor(context:Element){
		super(context);

		this.selector = '[data-component-checkbox]';
		this.attrName = 'data-component-checkbox';
	}

	componentDidMount():void{}
	componentWillUnmount():void{}
}
