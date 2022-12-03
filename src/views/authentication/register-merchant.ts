import AbstractView from '../AbstractView';
import photographer from '../../assets/photographer.jpeg'
import { API_URL } from '../../../config';
import { TRegisterMerchant } from '../../../types';

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

    formInput = [
        {
            labelFor: "name",
            label: "Name",
            type: 'text',
            name: "name",
            id: "name",
            placeholder: "anwuli"
        },
        {
            labelFor: "email",
            label: "Email",
            type: 'email',
            name: "email",
            id: "email",
            placeholder: "eg anwuli@"
        },
        {
            labelFor: "username",
            label: "Username",
            type: 'text',
            name: "username",
            id: "username",
            placeholder: "anwuli"
        },
        {
            labelFor: "phoneNumber",
            label: "Phone Number",
            type: 'text',
            name: "phoneNumber",
            id: "phoneNumber",
            placeholder: "08123456789"
        },
        {
            labelFor: "cityOfOperation",
            label: "City Of Operation",
            type: 'text',
            name: "cityOfOperation",
            id: "cityOfOperation",
            placeholder: "Abuja"
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
        return `Photo by <a href="https://unsplash.com/@jonathanborba?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jonathan Borba</a> on <a href="https://unsplash.com/s/photos/wedding-shoot?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>`
    }



    static async registerUser(params: Record<string, string>) {
        try {
            const request = await fetch(`${API_URL}/register/users`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...params,
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

        RegisterMerchant.registerUser(data as Record<string, string>)

    }
});
