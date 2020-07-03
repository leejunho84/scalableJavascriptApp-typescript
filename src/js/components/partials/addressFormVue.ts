import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
    template:`
        <div>
            <input type="hidden" name="address.fullName" v-bind:value=fullName />
            <input type="hidden" name="address.phonePrimary.phoneNumber" v-bind:value=phonePrimary />
            <input type="hidden" name="address.addressLine1" v-bind:value=address1 />
            <input type="hidden" name="address.addressLine2" v-bind:value=address2 />
            <input type="hidden" name="address.postalCode" v-bind:value=postCode />
        </div>
    `
})

export default class AddressForm extends Vue {
    @Prop() fullName!:string;
    @Prop() postCode!:string;
    @Prop() address1!:string;
    @Prop() address2!:string;
    @Prop() phonePrimary!:string;

	created():void{}
    mounted():void{}
}