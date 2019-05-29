import Module from "./module";

export default class Restock extends Module {
    constructor(){
        super('[data-module-restock]', 'data-module-restock');
    }

    public moduleWillMount(...components:any):void{
        console.log(components);
    }
    public moduleWillUnmount():void{}
}