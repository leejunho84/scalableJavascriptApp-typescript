import Component from "./component";

export default class SocialLogin extends Component {
    constructor(context:HTMLElement){
        super(context);
        this.selector = '[data-component-social-login]';
        this.attrName = 'data-component-social-login';
    }

    componentDidMount():void{}
    componentWillUnmount():void{}
}