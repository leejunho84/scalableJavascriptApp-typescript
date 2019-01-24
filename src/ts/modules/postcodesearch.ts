import Module from './module';
import Text from '../components/textfield';
import Button from '../components/button';
import Vue from 'vue';
import SearchResultComponent from './partials/postCodeList';

export default class PostCodeSearch extends Module{
	constructor(selector:string){
		super(selector, 'data-module-postcodesearch');

		let _self = this;
		let textComponent = new Text(this.context);
		let buttonComponent = new Button(this.context);

		buttonComponent.addEvent('buttonClick', function(this:HTMLElement, ...args:any[]){
			let opts = {
				url:_self.attributes.api,
				data:{
					q:textComponent.value
				}
			};

			/*
			_self.promise(opts).then(function(params:any){
				let data:any = _self.strToJson(params, true);
				vueComponent['items'] = data.results;
			}).catch(function(err:any){
				console.log(err);
			});*/
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

	moduleWillMount():void{}
	moduleWillUnmount():void{}
}