import Vue from 'vue';
import Component from "./component";
import SelectboxVue from "./partials/selectboxVue";

export default class SelectBox extends Component {
	constructor(context:Element){
		super(context);

		this.selector = '[data-component-selectbox]';
		this.attrName = 'data-component-selectbox';
	}

	componentDidMount():void{
		const _this:SelectBox = this;
		let opts:any[] = [];
		let select:HTMLSelectElement = this.target.querySelector('select');
		let options:NodeListOf<HTMLOptionElement> = select.querySelectorAll('option');
		let currentLable:string|null = '';
		let currentIndex:number = 0;

		options.forEach((option, key, parent)=>{
			if(option.getAttribute('selected') === 'selected'){
				currentLable = option.textContent;
				currentIndex = key;
			}
			
			opts.push({
				label:option.textContent,
				value:option.value,
				selected:option.getAttribute('selected'),
				disabled:option.getAttribute('disabled')
			});
		});

		const vueSelectComponent = new Vue({
			el:this.context,
			data:{
				opened:false,
				currentIndex:currentIndex,
				currentLabel:currentLable,
				opts:opts
			},
			components:{
				SelectboxVue
			},
			template:`
				<selectbox-vue
					v-bind="{opened:opened, currentLabel:currentLabel, options:opts, currentIndex:currentIndex}"
					v-on="{
						optionEnter:optionEnter,
						optionLeave:optionLeave,
						optionSelected:optionSelected,
					}" />
			`,
			methods:{
				optionEnter:function(...args:any[]){
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