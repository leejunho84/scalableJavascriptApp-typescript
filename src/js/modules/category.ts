import Module from './module';
export default class Category extends Module {
	constructor(){
		super('[data-module-category]', 'data-module-category');
	}

	public moduleWillMount(...components:any[]){
		components.map((component)=>{
			//console.log(component);
		});
	}
	public moduleWillUnmount(){}
}