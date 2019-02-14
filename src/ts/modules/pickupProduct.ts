import Module from "./module";

export default class PickupProduct extends Module {
    constructor(){
        super('[data-module-pickup-product]', 'data-module-pickup-product');
    }

    public moduleWillMount():void{}
    public moduleWillUnmount():void{}
}