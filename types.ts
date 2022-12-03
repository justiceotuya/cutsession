export interface TRegisterMerchant {
    name: string,
    email: string,
    cityOfOperation: string,
    username: string,
    password: string,
    phoneNumber: string
}

export interface TRegisterUser extends TRegisterMerchant {
    dateOfBirth: string
}
