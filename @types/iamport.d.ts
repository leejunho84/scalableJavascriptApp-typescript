// Type definitions for Iamport v1.1.5
// Project: Iamport
// Definitions: https://www.iamport.kr/

declare namespace IMP {
	type INIT = (identityCode:string) => void;
	type REQUEST_PAY = (requestParams:IRequestParmas, response:(result:IResponse)=>void)=>void;
	interface IRequestParmas {
		pg:string
		pay_method:string
		merchant_uid:string
		name:string
		amount:number
		buyer_email:string
		//buyer_name:$orderinfo.find('[data-email]').data('email'),
		buyer_name:string
		buyer_tel:string
		buyer_addr:string
		buyer_postcode:string
		m_redirect_url:string
		app_scheme:string
		notice_url:string
		bypass:{acceptmethod:string}
		escrow?:boolean
		vbank_due?:string
		custom_data?:string
	}

	interface IResponse {
		success:boolean
		pay_method:string
		pg_provider:string
		imp_uid:string
		merchant_uid:string
		paid_amount:string
		custom_data:string
		apply_num?:string
		vbank_num?:string
		vbank_name?:string
		vbank_holder?:string
		vbank_date?:string
		error_msg?:string
	}

	const init:INIT;
	const request_pay:REQUEST_PAY;
}