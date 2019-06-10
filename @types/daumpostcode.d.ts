// Type definitions for daum postcode v2
// Project: daum postcode
// Definitions: http://postcode.map.daum.net/guide

declare namespace daum {
	interface IPostcode {
		oncomplete:(response:IResponsePostCode)=>void
		onresize?:(size:number)=>void
	}
	
	interface IResponsePostCode {
		address:string
		addressEnglish:string
		addressType:string
		apartment:string
		autoJibunAddress:string
		autoJibunAddressEnglish:string
		autoRoadAddress:string
		autoRoadAddressEnglish:string
		bcode:string
		bname:string
		bname1:string
		bname2:string
		buildingCode:string
		buildingName:string
		hname:string
		jibunAddress:string
		jibunAddressEnglish:string
		noSelected:string
		postcode:string
		postcode1:string
		postcode2:string
		postcodeSeq:string
		query:string
		roadAddress:string
		roadAddressEnglish:string
		roadname:string
		roadnameCode:string
		sido:string
		sigungu:string
		sigunguCode:string
		userLanguageType:string
		userSelectedType:string
		zonecode:string
	}

	interface IDaum {
		Postcode:DaumPostcodeConstructor;
		open:()=>this;
		embed:(target:Element)=>this;
	}
	
	interface DaumPostcodeConstructor {
		new (option:IPostcode):IDaum;
	}
		
	const Postcode:DaumPostcodeConstructor;
	const open:()=>void;
	const embed:(target:Element)=>IDaum
}