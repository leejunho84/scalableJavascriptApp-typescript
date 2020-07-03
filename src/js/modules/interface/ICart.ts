export interface ICartUpdateProcessor{
    mode:string
    templatePath:string
    resultVar:string
    cache:number
}

export interface ICartUpdate {
    productId:string
    orderItemId:string
    quantity:string
    csrfToken:string
}