//Radio Component
import Component from './component';
import Rx from 'rxjs';

export default class Radio extends Component {
	constructor(context:HTMLElement){
		super(context);

		this.selector = '[data-component-radio]';
		this.attrName = 'data-component-radio';
	}

	componentDidMount():void{
		let $this = $(this.target);
		let $radio = $this.find('input[type=radio]');

		const radios:NodeListOf<HTMLInputElement> = this.context.querySelectorAll('input[type=radio]');
		radios.forEach((radio, index, radios)=>{
			Rx.fromEvent(radio, 'input').subscribe((e)=>{
				e.preventDefault();
				
				const element = e.currentTarget as HTMLInputElement;
				const parent = element.parentElement;
				const prevSibling = element.previousElementSibling;
	
				if(prevSibling){
					const currentClass = prevSibling.getAttribute('class');
					const replceClass = (currentClass) ? currentClass.replace('selected', '') : '';
					prevSibling.setAttribute('class', (currentClass)?`${replceClass} selected`:'selected');
				}
	
				this.fireEvent('change', element, [element.getAttribute('value')]);
			});
		});
		

		//기본 선택값 처리
		$radio.each((index, currentTarget) => {
			let $this = $(currentTarget);
			if(currentTarget.getAttribute('checked') === 'checked'){
				setTimeout(() => {
					$this.trigger('change');
					this.fireEvent('defaultFocus', currentTarget);
				});
			}
		});
	}

	componentWillUnmount():void{}
}
