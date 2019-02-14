import Component from "./component";

export default class ProductOption extends Component {
    constructor(context:Element){
        super(context);
        this.selector = '[data-component-product-option]';
		this.attrName = ['data-component-product-option', 'data-product-options', 'data-product-restrict'];
    }

    componentDidMount(...components:any[]):void{    
        components.map((component)=>{
            component.addEvent('change', function(this:HTMLElement, ...args:any){
				console.log(args);
            });
            
            component.addEvent('changeQuantity', function(this:HTMLElement, ...args:any){
                console.log(args);
            });
        });
    }
    componentWillUnmount():void{}
}