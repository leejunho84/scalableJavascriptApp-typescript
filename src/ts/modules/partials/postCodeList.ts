import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
	template: `
		<div v-if="items.length > 0">
			<a class="list-group-item list-group-item-action" 
				v-for="(item, index) in items"
				v-on:click="itemSelect"
				v-bind="{href:index}"
				ref="item">
				<span class="postcode5">{{item.postcode5}}</span>
				<span class="postcode6">({{ postCode(item) }})</span>
				<dl class="address-container">
					<dt class="label">도로명</dt>
					<dd class="address doro">{{item.ko_doro}}</dd>
					<dt class="label">지 번</dt>
					<dd class="address jibeon">{{item.ko_jibeon}}</dd>
				</dl>
			</a>
		</div>
		<div v-else>
			검색결과가 없습니다.
		</div>
	`
})

export default class SearchList extends Vue {
	@Prop() items!:object;

	constructor(){
		super();
	}

	created():void{
		console.log("SearchList init");
	}

	mounted():void{
		console.log('mounted success');
	}

	itemSelect(e:MouseEvent):void{
		e.preventDefault();
		this.$emit('itemSelected', [e.currentTarget]);
	}

	postCode(item:any):string{
		return item.postcode6.replace(/([0-9]{3})/, '$1-');
	}
}
