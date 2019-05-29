import Vue from 'vue';
import Component from "./component";
import SelectboxVue from "./partials/selectboxVue";
import { ISelectOption } from './interface/ISelectbox';

export default class SelectBox extends Component {
	constructor(context:HTMLElement){
		super(context);

		this.selector = '[data-component-selectbox]';
		this.attrName = 'data-component-selectbox';
	}

	componentDidMount():void{
		const _this:SelectBox = this;
		const appendClass = this.context.getAttribute('class');
		let opts:ISelectOption[] = [];
		let select:HTMLSelectElement = this.target.querySelector('select');
		let options:NodeListOf<HTMLOptionElement> = select.querySelectorAll('option');
		let currentLabel:string|null = null;
		let currentIndex:number = 0;

		options.forEach((option, key, parent)=>{
			if(option.getAttribute('selected') === 'selected'){
				currentLabel = option.textContent;
				currentIndex = key;
			}
			
			opts.push({
				label:option.textContent || '',
				value:option.value,
				selected:option.getAttribute('selected') || '',
				disabled:option.getAttribute('disabled') || ''
			});
		});

		//option에서 selected가 없을경우 첫번째 option으로 설정
		if(currentLabel === null){
			currentLabel = options[0].textContent;
		}

		const vueSelectComponent = new Vue({
			el:this.context,
			data:{
				opened:false,
				currentIndex:currentIndex,
				currentLabel:currentLabel,
				opts:opts,
				appendClass:appendClass
			},
			components:{
				SelectboxVue
			},
			template:`
				<selectbox-vue
					v-bind:clsss="appendClass"
					v-bind="{opened:opened, currentLabel:currentLabel, options:opts, currentIndex:currentIndex, class:appendClass}"
					v-on="{
						optionEnter:optionEnter,
						optionLeave:optionLeave,
						optionSelected:optionSelected
					}" />
			`,
			methods:{
				optionEnter:function(){
					if(this.opened){
						this.opened = false;
					}else{
						this.opened = true;
					}
				},
				optionLeave:function(...args:any[]){
					this.opened = false;
				},
				optionSelected:function(...args:any[]){
					const target:HTMLOptionElement = args[0];
					this.currentLabel = target.textContent || '';
					this.currentIndex = +(target.getAttribute('index') || this.currentIndex);
					this.opened = false;

					//상위 모듈 및 컨테이너 컴포넌트에 이벤트 전달
					_this.fireEvent('selected', target, [target.getAttribute('value')]);
				}
			}
		});
	}
	componentWillUnmount():void{}
}