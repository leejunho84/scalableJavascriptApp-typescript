import Module from './module';
import Text from '../components/textfield';
import Button from '../components/button';

export default class Search extends Module{
	constructor(selector:string){
		super(selector, 'data-module-search');

		let _self = this;
		let textComponent = new Text(this.context);
		let buttonComponent = new Button(this.context);

		console.log(_self.attributes);
	}

	moduleWillMount():void{}
	moduleWillUnmount():void{}
}
