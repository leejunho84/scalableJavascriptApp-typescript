import Module from "./module";

export default class MiniCart extends Module {
    constructor(){
        super('[data-module-minicart]', 'data-module-minicart');
    }

    public moduleWillMount():void{}
    public moduleWillUnmount():void{}
}