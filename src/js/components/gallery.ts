import Component from "./component";
import { IIndicator, IIndicatorData, IIndicatorSelectedEvent } from "./interface/IIndicator";

export default class Gallery extends Component {
	private _activeIndex:number = 0;
	constructor(context:HTMLElement){
		super(context);
		this.selector = '[data-component-gallery]';
		this.attrName = 'data-component-gallery';
	}

	componentDidMount(...components:IIndicator[]){
		const _this = this;
		const [indicator] = components;
		const imgContainer = this.context.querySelector('.img-container');

		if(imgContainer && indicator){
			const indicatorData:IIndicatorData[] = [];
			const imgs = imgContainer.querySelectorAll('img');
			imgs.forEach((img, index, imgs)=>{
				if(this.hasClass(img, 'active')){
					this._activeIndex = index;
					indicator.activeIndex = index;
				}
				indicatorData.push({
					index:index,
					active:this.hasClass(img, 'active') ? true : false
				});
			});
			indicator.indicators = indicatorData;
			indicator.addEvent('selected', function(this:HTMLElement, args:IIndicatorSelectedEvent){
				_this.removeClass(imgs[_this._activeIndex], 'active');
				_this.addClass(imgs[args.index], 'active');
				_this._activeIndex = args.index;
			});
		}
	}

	componentWillUnmount(){}
}