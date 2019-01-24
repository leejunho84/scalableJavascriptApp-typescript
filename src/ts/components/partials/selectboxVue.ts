import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
	template: `
		<div class="select-box pc"
			v-on:mouseleave="mouseLeave"
			v-bind:class="{checked:opened}">
			<a class="select-head" ref="header" v-on:click="mouseEnter">
				<span class="currentOpt">{{currentLabel}}</span>
			</a>
			<ul class="select-body" ref="body">
				<li class="list"
					ref="option"
					v-for="(option, index) in options"
					v-bind:class="{
						disabled:option.disabled === 'disabled',
						checked:currentIndex === index
					}">
					<a v-bind="{href:option.value, index:index, value:option.value}"
						v-on:click="optionSelect">
						<span class="label">{{option.label}}</span>
					</a>
				</li>
			</ul>
		</div>
	`
})

export default class selectBoxVue extends Vue{
	//일반적으로 클래스의 프로퍼티를 constructor를 생성하여 초기화를 하는 반면
	//vue에서 사용되는 프로퍼티는 상위 모듈에서 받아서 사용해야하므로 ( 프로퍼티 값을 변경하면 단방향데이터 바인딩에 위배되는 행위이다. )
	//프로퍼티에 '!' 를 사용하여 우회 정의한다. 

	@Prop() currentIndex!:number;
	@Prop() currentLabel!:string;
	@Prop() opened!:boolean;
	@Prop() options!:object;

	constructor(){
		super();
	}

	created():void{
		//console.log("method created");
	}

	mounted():void{
		//vnode가 dom영역에 append된 상태, 컴포넌트는 이곳에서 부터 시작된다.
		//컴포넌트의 엘리먼트 접근을 보장한다.
		const body:any = this.$refs.body;
		const options:any = this.$refs.option;

		//선택된 옵션의 offsetTop값을 가져와 해당위치로 이동시킨다.
		body.scrollTo({top:options[this.currentIndex].offsetTop});
	}
	
	mouseEnter(e:MouseEvent):void{
		e.preventDefault();
		//셀렉트 해더 클릭시 상위컴포넌트 메소드에 이벤트 전달
		this.$emit('optionEnter', e.currentTarget);
	}

	mouseLeave(e:MouseEvent):void{
		e.preventDefault();
		//셀렉트에서 마우스 out시 상위컴포너느 메소드에 이벤트 전달
		this.$emit('optionLeave', e.currentTarget);
	}

	optionSelect(e:MouseEvent):void{
		e.preventDefault();
		//옵션선택시 상위 컴포넌트 메소드에 이벤트 전달
		this.$emit('optionSelected', e.currentTarget);
	}
}