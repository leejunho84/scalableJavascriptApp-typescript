import Module from "./module";

export default class Review extends Module {
    constructor(){
        super('[data-module-review]', 'data-module-review');
    }

    public moduleWillMount(...components:any):void{

    }
    public moduleWillUnmount():void{}
}