import Component from "./component";

export default class Search extends Component {
    constructor(context:Element){
        super(context);

        this.selector = '[data-component-search]';
        this.attrName = 'data-component-search';
    }

    componentDidMount():void{}
    componentWillUnmount():void{}
}