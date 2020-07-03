import Component from "./component";
import { ISelectbox, ISelectedEvent } from "./interface/ISelectbox";
import { IGallery } from "./interface/IGallery";

export default class CategoryItem extends Component {
	constructor(context:HTMLElement){
		super(context);
		this.selector = '[data-component-categoryitem]';
		this.attrName = 'data-component-categoryitem';
	}

	componentDidMount(...components:any[]){
		const [gallery, select] = components;
		const gelleryComponent:IGallery = gallery;
		const selectComponent:ISelectbox = select;
		selectComponent.addEvent('selected', function(this:HTMLElement, args:ISelectedEvent){
			alert(args.value);
		});
	}
	componentWillUnmount(){}
}