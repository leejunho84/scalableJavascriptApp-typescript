import Component from "./component";

export default class Indicator extends Component{
	constructor(context:HTMLElement){
		super(context);
		this.selector = '[data-component-indicator]';
		this.attrName = 'data-component-indicator';
	}

	componentDidMount(){

	}
	componentWillUnmount(){}
}