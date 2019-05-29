import Component from './component';
import { ISearchAttributes } from './interface/ISearch';
import Rx from '../libs/rxjs';
import { filter, map } from '../libs/operators';

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
		/*Rx.range(1, 200).pipe(
			filter(x => x % 2 === 1),
			map(x => x + x)
		).subscribe(x => console.log(x));*/
	}
	componentWillUnmount():void{}
}
