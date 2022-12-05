import AbstractView from '../AbstractView';
import model from '../../assets/prewedding.jpeg'
import { API_URL } from '../../../config';
import { stringify } from 'postcss';
import axios from 'axios';

export default class LoginClient extends AbstractView {
    postID: string
    error: string

    constructor(params: Record<string, string>) {
        super(params);
        this.setTitle('Login Client');
    }
    formID = 'login-client'

    heroPhotograph = model

    userType = "Client"

    pageTitle = "Welcome back"


    pageSubtitle = "Log in to search and book studio sessions"

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
        return `Photo by <a href="https://unsplash.com/@jonathanborba?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jonathan Borba</a> on <a href="https://unsplash.com/s/photos/wedding-shoot?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>`
    }



    static async loginUser(params: Record<string, string>) {
        const options = {
            method: 'POST',
            url: `${API_URL}/sign-in`,
            headers: { 'Content-Type': 'application/json', Prefer: 'code=200, dynamic=true' },
            data: { ...params, accessType: "USER" },
        };

        try {
            const response = await axios.request(options)
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }
}

document.body.addEventListener('submit', e => {
    let formId = "login-client"
    if (e && (e.target as HTMLFormElement).id === formId) {
        e.preventDefault();
        // actual logic, e.g. validate the form
        var formEl = document.forms[formId];

        var formData = new FormData(formEl);

        let data: Record<string, string> = {}
        for (const pair of formData.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
            data[pair[0]] = pair[1] as string
        }
        LoginClient.loginUser(data as Record<string, string>)
    }
});
