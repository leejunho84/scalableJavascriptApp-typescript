import { Vue, Component, Prop } from 'vue-property-decorator';
import { IAddress } from '../interface/IPostCodeSearch';

@Component({
	template: `
		<div class="list-group postcodelist" v-bind:class="{active:actived}" style="max-height:250px; overflow-y:auto;">
			<a class="list-group-item" v-if="items.length > 0"
				v-for="(item, index) in items"
				v-on:click="itemSelect"
					v-bind="{href:index}"
					ref="item">
					<span class="postcode6">({{ postCode(item) }})</span>
					<span class="addr">{{item.ko_common}} {{item.ko_doro}}</span>
				</a>
			</a>
			<span class="list-group-item" v-else>
				검색결과가 없습니다.
			</span>
		</div>
	`
})

export default class PostCodeResultList extends Vue {
	@Prop() actived!:boolean;
	@Prop() items!:IAddress[];

	constructor(){
		super();
	}

	created():void{
		console.log("SearchList init");
	}

	mounted():void{
		console.log('mounted success');
	}

	itemSelect(e:Event):void{
		e.preventDefault();
		const target = e.currentTarget as Element;
		const index = target.getAttribute('href');
		if(index){
			this.$emit('itemSelected', this.items[+index]);
		}
	}

	postCode(item:any):string{
		return item.postcode6.replace(/([0-9]{3})/, '$1-');
	}
}
