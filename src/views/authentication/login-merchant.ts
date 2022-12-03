import AbstractView from '../AbstractView';
import LoginClient from './login-client';
import photographer from '../../assets/photographer.jpeg'
import { API_URL } from '../../../config';


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
            placeholder: "anwuli@"
        },
        {
            labelFor: "password",
            label: "Password",
            type: 'password',
            name: "password",
            id: "password",
            placeholder: "Type your password"
        }
    ]

    attributtion() {
        return `Photo by <a href="https://unsplash.com/@richardbrutyo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Richard Brutyo</a> on <a href="https://unsplash.com/@richardbrutyo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>`
    }


    static clickActionButton() {
        console.log("clicked Login")
        return undefined
    }

    static async loginMerchant(params: { username: string, password: string }) {
        try {
            const request = await fetch(`${API_URL}/sign-in`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...params,
                    accessType: "MERCHANT"
                })
            })
            const response = await request.json()
            console.log({ response })
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
        LoginMerchant.loginUser({ username, password })
        // let test = new Login({})
        // console.log(Login.clickActionButton())

    }
});
