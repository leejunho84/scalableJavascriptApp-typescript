import Module from './module';
import Text from '../components/textfield';
import Button from '../components/button';

export default class Search extends Module{
	constructor(){
		super('[data-module-search]', 'data-module-search');
		this.componentsInitalize(this.context, this.moduleWillMount);
	}

	moduleWillMount(...components:any[]):void{
		components.map((component)=>{
			console.log(component);
		})
	}
	moduleWillUnmount():void{}
}
