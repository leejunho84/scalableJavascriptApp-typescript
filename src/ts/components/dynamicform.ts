import Component from "./component";

export default class DynamicForm extends Component {
    constructor(context:Element){
        super(context);
        this.selector = '[data-component-dynamicform]';
        this.attrName = 'data-component-dynamicform';
    }

    componentDidMount():void{}
    componentWillUnmount():void{}
}