import Component from "./component";

export default class ProductOption extends Component {
    constructor(context:Element){
        super(context);
        this.selector = '[data-component-product-options]';
		this.attrName = ['data-component-product-options', 'data-product-options'];
    }

    componentDidMount(...components:any[]):void{
        //console.log('component_productOption:', components);
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