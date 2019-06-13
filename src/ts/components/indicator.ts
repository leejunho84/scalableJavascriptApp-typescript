import Component from "./component";
import Vue from "vue";
import DotIndicator from "./partials/dotIndicatorVue";
import { IIndicatorData, IIndicator } from "./interface/IIndicator";

export default class Indicator extends Component{
	private _indicators:IIndicatorData[];
	private _activeIndex:number = 0;

	constructor(context:HTMLElement){
		super(context);
		this.selector = '[data-component-indicator]';
		this.attrName = 'data-component-indicator';
		this._indicators = [{active:true}];
	}

	componentDidMount(){
		const _this = this;
		const indicator = new Vue({
			el:this.context,
			data:{currentIndex:this._activeIndex, indicators:this._indicators},
			components:{
				DotIndicator
			},
			template:`
				<dot-indicator 
					v-bind="{indicators:indicators}" 
					@indicator-selected=selected />
			`,
			methods:{
				selected:function(index:number){
					this.indicators[_this._activeIndex].active = false;
					this.indicators[index].active = true;
					_this._activeIndex = index;
					_this.fireEvent('selected', this.$el, {index:index});
				}
			}
		});
	}

	componentWillUnmount(){}

	get activeIndex(){
		return this._activeIndex;
	}

	set activeIndex(index:number){
		this._activeIndex = index;
	}

	get indicators():IIndicatorData[]{
		return this._indicators;
	}

	set indicators(indicatorsData:IIndicatorData[]){
		indicatorsData.forEach((indicator, index, indicators)=>{
			if(this._indicators[index]){
				this._indicators[index].active = indicator.active;
			}else{
				this._indicators.push(indicator);
			}
		});
	}
}