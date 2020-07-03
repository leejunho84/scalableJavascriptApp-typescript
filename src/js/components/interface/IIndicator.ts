import Component from "../component";

export interface IIndicator extends Component{
	activeIndex:number;
	indicators:IIndicatorData[];
}

export interface IIndicatorData{
	index?:number;
	active:boolean;
}

export interface IIndicatorSelectedEvent {
	index:number;
}