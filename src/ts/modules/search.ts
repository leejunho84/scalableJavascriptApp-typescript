import Module from './module';

export default class Search extends Module{
	constructor(){
		super('[data-module-search]', 'data-module-search');
	}

	moduleWillMount(...components:any[]):void{
		components.map((component)=>{
			console.log(component);
		})
	}
	moduleWillUnmount():void{}
}
