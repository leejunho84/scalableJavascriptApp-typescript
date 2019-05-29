import { Vue, Component, Prop, Model } from 'vue-property-decorator';

@Component({
    template:`
        <div class="uk-grid delivery-addr-box">
            <div class="uk-width-7-10">
                <dl>
                    <!--/* <dt>받으시는 분</dt> */-->
                    <dd class="uk-margin-small-bottom txt-name">{{fullName}}</dd>
                </dl>
                <dl>
                    <!--/* <dt>배송지 주소</dt> */-->
                    <dd class="uk-margin-small-bottom txt-addr">
                        <span>({{postCode}})</span>
                        <span class="text-box">{{address1}} {{address2}}</span>
                    </dd>
                </dl>
                <dl>
                    <!--/* <dt>연락처</dt> */-->
                    <dd class="uk-margin-small-bottom txt-phone">{{replacePhone}}</dd>
                </dl>
            </div>
            <div class="uk-width-3-10">
                <a v-on:click="showOtherAddress" class="btn-link line medium uk-align-right btn-delivery-list">배송지 목록</a>
            </div>
        </div>
    `
})

export default class AddressInfoDetail extends Vue {
    @Prop() fullName!:string;
    @Prop() postCode!:string;
    @Prop() address1!:string;
    @Prop() address2!:string;
    @Prop() address3!:string;
    @Prop() phonePrimary!:string;

	created():void{}
    mounted():void{}
    showOtherAddress(e:Event):void{
        e.preventDefault();
        this.$emit('showOtherAddress', e.currentTarget);
    }

    get replacePhone():string{
        return this.phonePrimary.replace(/(^01[0-9]{1})([0-9]{3,4})([0-9]{3,4}$)/, '$1-$2-$3');
    }
}