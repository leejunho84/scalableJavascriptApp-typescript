import Component from './component';
import { ISearchAttributes } from './interface/ISearch';
import rxjs from 'rxjs';

export default class Search extends Component {
	public attributes:ISearchAttributes;

	constructor(context:HTMLElement){
		super(context);
		this.selector = '[data-component-search]';
		this.attrName = 'data-component-search';
		this.attributes = this.rtnToAttributes(this.context, this.attrName);
	}

	componentDidMount(...components:any[]):void{
		//console.log(this.attributes);
		/*rxjs.range(1, 200).pipe(
			filter(x => x % 2 === 1),
			map(x => x + x)
		).subscribe(x => console.log(x));*/
	}
	componentWillUnmount():void{}
}
