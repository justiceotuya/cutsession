import AbstractView from '../AbstractView';
import LoginClient from '../client/login-client';
import photographer from '../../assets/photographer.jpeg'
import { API_URL } from '../../../config';
import axios from '../../lib';


export default class LoginMerchant extends LoginClient {
    postID: string
    error: string

    constructor(params: Record<string, string>) {
        super(params);
        this.setTitle('Login');
    }
    formID = 'login-merchant'
    userType = "Merchant"

    heroPhotograph = photographer
    pageSubtitle = "Log in to manage studio sessions"
    pageTitle = "Welcome back"

    linkToLoginOrRegisterLink = `/register/merchant`

    formInput = [
        {
            labelFor: "username",
            label: "Username",
            type: 'text',
            name: "username",
            id: "username",
            placeholder: "anwuli@",
            minLength: "6",
            maxLength: "20",
            required: true
        },
        {
            labelFor: "password",
            label: "Password",
            type: 'password',
            name: "password",
            id: "password",
            placeholder: "Type your password",
            minLength: "6",
            required: true
        }
    ]

    attributtion() {
        return `Photo by <a href="https://unsplash.com/@richardbrutyo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Richard Brutyo</a> on <a href="https://unsplash.com/@richardbrutyo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>`
    }


    static clickActionButton() {
        console.log("clicked Login")
        return undefined
    }

    static async login(params: { username: string, password: string }) {
        const options = {
            method: 'POST',
            url: `${API_URL}/sign-in`,
            data: { ...params, accessType: "MERCHANT" },
        };

        try {
            const request = await axios.request(options)
            if (request.status === 200) {
                let merchantId = 'c3073b9d-edd0-49f2-a28d-b7ded8ff9a8b'
                localStorage.setItem("data", JSON.stringify({
                    ...request.data,
                    merchantId,
                    type: "MERCHANT"
                }))
                // window.location.href = `/merchant/${merchantId}`
                window.location.href = `/merchant`
            }
        } catch (error) {
            console.log("error", error.message)
        }
    }



}

document.body.addEventListener('submit', e => {
    let formId = 'login-merchant'
    if (e && (e.target as HTMLFormElement).id === formId) {
        e.preventDefault();
        // actual logic, e.g. validate the form
        var formEl = document.forms[formId];

        var formData = new FormData(formEl);

        var username = formData.get('username') as string;
        var password = formData.get('password') as string;
        LoginMerchant.login({ username, password })
        // let test = new Login({})
        // console.log(Login.clickActionButton())

    }
});
