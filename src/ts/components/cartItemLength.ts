import Component from "./component";

export default class CartItemLen extends Component {
    constructor(context:Element){
        super(context);
        this.selector = '[data-component-cartItem-length]';
		this.attrName = 'data-component-cartItem-length';
    }

    componentDidMount():void{}
    componentWillUnmount():void{}
}