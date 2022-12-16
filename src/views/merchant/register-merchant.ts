import AbstractView from '../AbstractView';
import photographer from '../../assets/photographer.jpeg'
import { API_URL } from '../../../config';
import { TRegisterMerchant } from '../../../types';
import axios from '../../lib'
export default class RegisterMerchant extends AbstractView {
    postID: string
    error: string

    constructor(params: Record<string, string>) {
        super(params);
        this.setTitle('Register Merchant');
    }
    formID = 'register-merchant'

    heroPhotograph = photographer

    userType = "Merchant"

    pageSubtitle = "Enter your details below to create your account."

    pageTitle = "Create your account"
    buttonText = "Create your account"

    linkToLoginOrRegisterText = "Already have an account?"
    linkToLoginOrRegisterLink = `/login/merchant`
    linkToLoginOrRegisterlinkText = "Log in"

    formInput: Record<string, any>[] = [
        {
            labelFor: "name",
            label: "Name",
            type: 'text',
            name: "name",
            id: "name",
            placeholder: "anwuli",
            minLength: "2",
            maxLength: "25",
            required: true
        },
        {
            labelFor: "email",
            label: "Email",
            type: 'email',
            name: "email",
            id: "email",
            placeholder: "eg anwuli@",
            maxLength: "50",
            required: true
        },
        {
            labelFor: "username",
            label: "Username",
            type: 'text',
            name: "username",
            id: "username",
            placeholder: "anwuli",
            minLength: "6",
            maxLength: "20",
            required: true
        },
        {
            labelFor: "phoneNumber",
            label: "Phone Number",
            type: 'text',
            name: "phoneNumber",
            id: "phoneNumber",
            placeholder: "08123456789",
            maxLength: "20",
            required: true
        },
        {
            labelFor: "cityOfOperation",
            label: "City Of Operation",
            type: 'text',
            name: "cityOfOperation",
            id: "cityOfOperation",
            placeholder: "Abuja",
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
        return `Photo by <a href="https://unsplash.com/@jonathanborba?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jonathan Borba</a> on <a href="https://unsplash.com/s/photos/wedding-shoot?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>`
    }



    static async register(params: Record<string, string>) {
        try {
            const request = await axios.request({
                url: `${API_URL}/register/merchants`,
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: {
                    ...params
                }
            })
            if (request.status === 200) {
                window.location.href = "/login/merchant"
            }
        } catch (error) {
            console.log("error", error.message)
        }
    }



}

document.body.addEventListener('submit', e => {
    let formId = "register-merchant"
    if (e && (e.target as HTMLFormElement).id === formId) {
        e.preventDefault();
        // actual logic, e.g. validate the form
        var formEl = document.forms[formId];

        var formData = new FormData(formEl);

        let data: TRegisterMerchant | Record<string, string> = {}
        for (const pair of formData.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
            data[pair[0]] = pair[1] as string
        }

        RegisterMerchant.register(data as Record<string, string>)

    }
});
