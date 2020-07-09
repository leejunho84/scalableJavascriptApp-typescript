import {Component, Prop, Vue, Emit, Watch} from 'vue-property-decorator'
import { IIndicatorData } from '../interface/IIndicator';

@Component({
	template:`
		<div class="indicator" data-component-indicator="">
			<i class="icon-indicator" 
				v-for="(indicator, index) in indicators"
				v-bind:class={active:indicator.active}
				v-on:click="selected(index)"></i>
		</div>
	`
})

export default class DotIndicator extends Vue {
	@Prop() readonly indicators!:IIndicatorData[];

	created(){}
	mounted(){}

	@Emit('indicator-selected')
	selected(index:number):number{
		return index;
	}
}