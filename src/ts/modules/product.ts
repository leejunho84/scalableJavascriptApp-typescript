import Module from './module';

export default class Product extends Module {
	constructor(){
		super('[data-module-product]', 'data-module-product');
	}

	moduleWillMount(...components:any[]):void{
		console.log(this);
		console.log('module_product:', components);
		UIkit.notify('상품을 선택해 주세요', {timeout:10000,pos:'top-center',status:''});
	}
	moduleWillUnmount():void{}
}