import Module from './module';
export default class Category extends Module {
	constructor(){
		super('[data-module-category]', 'data-module-category');
	}

	public moduleWillMount(...components:any[]){
		console.log(components);
		components.map(v=>{
			// console.log(v);
		});
	}
	public moduleWillUnmount(){}
}