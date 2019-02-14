import Module from './module';

export default class Product extends Module {
	constructor(){
		super('[data-module-product]', 'data-module-product');
	}

	moduleWillMount(...components:any[]):void{
		console.log(this);
		console.log('module_product:', components);
	}
	moduleWillUnmount():void{}
}