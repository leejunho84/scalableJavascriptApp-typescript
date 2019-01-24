import Module from './module';

export default class Product extends Module {
    constructor(){
        super('[data-module-product]', 'data-module-product');
        this.componentsInitalize(this.context, this.moduleWillMount);
    }

    moduleWillMount(...components:any[]):void{
        console.log('module_product:', components);
    }
	moduleWillUnmount():void{}
}