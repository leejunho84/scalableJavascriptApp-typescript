import Vue from 'vue';
import SearchResultComponent from './partials/postCodeListVue';
import Component from './component';
import { ITextField, IChangeEventArguments, IFocusInEventArguments, IFocusOutEventArguments } from './interface/ITextField';
import { IPostCodeAttributes, IPostCodify, IAddress } from './interface/IPostCodeSearch';

export default class PostCodeSearch extends Component {
	public attributes:IPostCodeAttributes;
	private _resultComponent?:SearchResultComponent;
	private _searchComponent?:ITextField;
	private _detailComponent?:ITextField;
	private _selectedAddress?:IAddress;
	private _postcodeKeyword:string;
	private _addressValidate:boolean;

	constructor(context:HTMLElement){
		super(context);
		this.selector = '[data-component-postcodify]';
		this.attrName = 'data-component-postcodify';
		this.attributes = this.rtnToAttributes(this.context, this.attrName);

		this._postcodeKeyword = '';
		this._addressValidate = false;
	}

	componentDidMount(...components:any[]):void{
		let _this = this;
		const [search, detail]:ITextField[] = components;
		this._searchComponent = search;
		this._detailComponent = detail;
		
		this._searchComponent.addEvent('change', function(this:HTMLElement, args:IChangeEventArguments){
			if(_this._postcodeKeyword !== args.value){
				_this._addressValidate = false;
			}
			_this._postcodeKeyword = args.value;
		});

		this._searchComponent.addEvent('inputFocusIn', function(this:HTMLInputElement, args:IFocusInEventArguments){
			if(_this._resultComponent){
				_this._resultComponent.actived = true;				
			}
		});

		this._searchComponent.addEvent('inputFocusOut', function(this:HTMLInputElement, args:IFocusOutEventArguments){
				setTimeout(()=>{
					if(_this._resultComponent){
						_this._resultComponent.actived = false;
					}
				}, 20);
		});

		this._detailComponent.addEvent('changed', function(this:HTMLInputElement, val:string){
			_this.fireEvent('detailAddressChanged', this, {value:this.value});
		});

		const postSubmit = this.context.querySelector('button');
		if(postSubmit){
			postSubmit.addEventListener('click', async (e)=>{
				e.preventDefault();

				if(this._searchComponent && this._searchComponent.validate){
					if(this._postcodeKeyword.length > 2){
						try{
							const postCodeResult = await _this.postCodify(_this.attributes.api, {q:this._postcodeKeyword});
							const parsePostCode = this.rtnJson(postCodeResult) as IPostCodify;
							if(parsePostCode.count > 0){
								if(this._resultComponent){
									this._resultComponent.items = parsePostCode.results;
									this._resultComponent.actived = true;
									//this._validate = searchComponent.validate;
								}
							}else{
								UIkit.modal.alert(this.message.postCodeResultEmpty);
							}
						}catch(e){
							throw new Error(e);
						}
					}else{
						UIkit.modal.alert(this.message.keywordIsShort);
					}
				}else{
					UIkit.modal.alert(this.message.needAddress);
				}
			});
		}

		//result initialize
		this.postCodeResultMounte();
	}

	private postCodeResultMounte():void{
		const resultWrap = this.context.querySelector('.result-wrap');
		const _this = this;
		if(resultWrap){
			this._resultComponent = new Vue({
				el:resultWrap,
				data:{items:[], actived:false},
				components:{
					SearchResultComponent
				},
				template:`
					<search-result-component 
						v-bind:items="items"
						v-bind:actived="actived"
						v-on:itemSelected="itemSelected" />
				`,
				methods:{
					itemSelected:function(address:IAddress){
						if(_this._searchComponent){
							_this._searchComponent.value = address.ko_doro;
							_this._addressValidate = _this._searchComponent.validate;
						}						
						_this._selectedAddress = address;
						this.$data.actived = false;
						_this.fireEvent('selectedAddress', _this.context, address);
					}
				}
			});
		}
	}

	private postCodify(url:string, requestParams:{q:string}):Promise<string>{
		return new Promise((resolve, reject)=>{
			$.ajax({
				url:url,
				method:'GET',
				data:requestParams,
				complete:(response)=>{
					if(response.status === 200){
						resolve(response.responseText);
					}else{
						reject(`${this.message.serverError}(${response.status})`);
					}
				}
			});
		});
	}
	componentWillUnmount():void{}

	get validate():boolean{
		let postCodeInspact:boolean = false;
		let detailInspact:boolean = (this._detailComponent) ? this._detailComponent.validate : false;

		if(this._searchComponent && this._searchComponent.validate){
			if(!this._addressValidate){
				postCodeInspact = false;
				this._searchComponent.errorValue = this.message.mustSearchPostcode;
			}else{
				postCodeInspact = true;
			}
		}else{
			postCodeInspact = false;
		}

		return (postCodeInspact && detailInspact) ? true : false;
	}

	get selectedAddress():IAddress|null{
		return (this._selectedAddress) ? this._selectedAddress : null;
	}

	get detailAddress():string{
		return (this._detailComponent) ? this._detailComponent.value : '';
	}
}