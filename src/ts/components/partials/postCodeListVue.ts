import { Vue, Component, Prop } from 'vue-property-decorator';
import { IAddress } from '../interface/IPostCodeSearch';

@Component({
	template: `
		<ul class="result-wrap" v-bind:class="{active:actived}">
			<li class="list" v-if="items.length > 0" v-for="(item, index) in items">
				<a 	v-on:click="itemSelect"
					v-bind="{href:index}"
					ref="item">
					<div class="address-wrap">
						<h5 class="zip-code">
							<span class="postcode6">({{ postCode(item) }})</span>
						</h5>
						<dl>
							<dt class="addr-type">도로명</dt>
							<dd class="addr">{{item.ko_doro}}</dd>
							<dt class="addr-type">지 번</dt>
							<dd class="addr">{{item.ko_jibeon}}</dd>
						</dl>
					</div>
				</a>
			</li>
			<li class="list" v-else>
				검색결과가 없습니다.
			</li>
		</ul>
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
