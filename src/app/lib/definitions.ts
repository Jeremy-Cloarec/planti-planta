export type Plant = {
    id: number
    title: string
    price: number
    quantity: number
}

export type User = {
    id: number
    name: string
    email: string
    password: string
}

export type Discount = {
    isDiscount: boolean,
    discountInput: string,
    message: string
}

