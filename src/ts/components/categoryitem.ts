import Component from "./component";

export default class CategoryItem extends Component {
	constructor(context:HTMLElement){
		super(context);
		this.selector = '[data-component-categoryitem]';
		this.attrName = 'data-component-categoryitem';
	}

	componentDidMount(...args:any[]){
		console.log(args);
	}
	componentWillUnmount(){}
}