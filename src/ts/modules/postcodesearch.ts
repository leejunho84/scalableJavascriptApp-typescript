import Module from './module';
import Vue from 'vue';
import SearchResultComponent from './partials/postCodeList';

export default class PostCodeSearch extends Module{
	constructor(){
		super('[data-module-postcode-search]', 'data-module-postcode-search');
	}

	moduleWillMount(...components:any[]):void{
		let _this = this;
		components.map((component)=>{
            component.addEvent('searching', function(this:HTMLElement, ...args:any[]){
				if(args[0] === '') return;
				_this.ajax(_this.attributes.api, 'GET', {q:args[0]}, (data:any)=>{
					const result:any = _this.rtnJson(data);
					vueComponent['items'] = result.results;
				});
			});
		});

		const vueComponent = new Vue({
			el:'#postcode-result',
			data:{items:[]},
			components:{
				SearchResultComponent
			},
			template:`
				<search-result-component 
					v-bind:items="items"
					v-on:itemSelected="itemSelected" />
			`,
			methods:{
				itemSelected:function(this:HTMLElement, target:any){
					console.log(target[0].getAttribute('href'));
				}
			}
		});
	}
	moduleWillUnmount():void{}
}