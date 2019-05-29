import Component from "./component";

export default class Gallery extends Component {
	constructor(context:HTMLElement){
		super(context);
		this.selector = '[data-component-gallery]';
		this.attrName = 'data-component-gallery';
	}

	componentDidMount(...components:any[]){}
	componentWillUnmount(){}
}