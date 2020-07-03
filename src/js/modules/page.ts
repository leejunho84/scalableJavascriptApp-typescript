import Module from "./module";

export default class Page extends Module {
    constructor(){
        super('[data-module-page]', 'data-module-page');
    }

    moduleWillMount(){}
    moduleWillUnmount(){}
}