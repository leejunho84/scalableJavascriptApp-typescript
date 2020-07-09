enum MessageProperty {
	emptyProductId = '상품의 ID가 없습니다.',
	notEnoughSkuQuantiry = '해당 상품의 재고가 없습니다.',
	serverError = '일시적인 오류입니다. 잠시후 다시 시도해주세요.',
	skuMaxQuantity = '개 까지 구매가능 합니다.',
	skuEmptyQuantity = '상품의 수량이 없습니다.',
	emptySkuPricing = '해당 조건에 부합하는 sku정보가 없습니다.',
	emptyComponent = '정의된 컴포넌트가 없습니다.',
	mustSelectOption = '옵션을 선택해주세요.',
	doRemoveItem = '삭제하시겠습니까?',
	doRemoveAllItem = '장바구니에 담긴 상품을 모두 삭제하시겠습니까?',
	moveItemToCart = '상품이 장바구니로 이동하였습니다.',
	moveItemToLater = '상품이 나중에 구매하기로 이동하였습니다.',
	addItemToWishList = '상품이 위시리스트에 추가 되었습니다.',
	removeItemToWishList = '상품이 위시리스트에서 삭제 되었습니다.',
	removeCartItem = '모든상품을 삭제하였습니다.',
	notAvailabel = '유효하지 않는 값입니다.',
	modifyCartConfirm = '<br/>해당상품의 수량변경 또는 삭제하여야 주문이 가능합니다.<br/>장바구니로 이동하시겠습니까?',
	paymentTypeInfoError = '결제 수단 정보로 인한 문제가 발생하였습니다.<br/>고객센터(_GLOBAL.SITE.TEL)로 문의 주시면 신속히 처리 도와드리겠습니다.',
	paymentAgree = '상품, 가격, 할인, 배송정보에 동의해주세요',
	needAddress = '주소를 입력해주세요',
	postCodeResultEmpty = '검색된 주소가 없습니다.',
	needDetailAddress = '상세주소를 입력해주세요',
	mustSearchPostcode = '주소를 검색해 주세요.',
	keywordIsShort = '검색 키워드가 짧습니다.',
	wrongAddress = '주소 입력 중 오류가 발생하였습니다. 다시 시도해 주세요.',
	requiredTextField = '필수 입력항목 입니다.',
	regexErrorTextField = '잘못된 입력값 입니다.',
	shippingAddressEmpty = '배송주소가 비어있습니다.',
	selectQuantityCancel = '수량선택을 취소하였습니다.',
	mustLogin = '로그인을 해야합니다.'
}

export default class MessageHelper{
	constructor(){};
	static messageProperty(){
		return MessageProperty;
	}
}