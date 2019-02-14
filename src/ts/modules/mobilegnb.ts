import Module from "./module";

export default class MobileGnb extends Module {
    constructor(){
        super('[data-module-mobilegnb]', 'data-module-mobilegnb');
    }

    public moduleWillMount():void{}
    public moduleWillUnmount():void{}
}