import AbstractView from '../AbstractView';
import model from '../../assets/prewedding.jpg'
import { API_URL } from '../../../config';
import { TRegisterUser } from '../../../types';
import axios from '../../lib';

export default class RegisterClient extends AbstractView {
    postID: string
    error: string



    constructor(params: Record<string, string>) {
        super(params);
        this.setTitle('Register Client');

    }
    formID = 'register-client'

    heroPhotograph = model

    userType = "Client"

    pageSubtitle = "Enter your details below to create your account."

    pageTitle = "Create your account"

    buttonText = "Create your account"

    linkToLoginOrRegisterText = "Already have an account?"
    linkToLoginOrRegisterLink = `/login/client`
    linkToLoginOrRegisterlinkText = "Log in"

    formInput: Record<string, any>[] = [
        {
            labelFor: "name",
            data: "data-name",
            label: "Name",
            type: 'text',
            name: "name",
            id: "name",
            placeholder: "anwuli",
            minLength: "2",
            maxLength: "24",
            required: true
        },
        {
            labelFor: "email",
            data: "data-email",
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
            data: "data-username",
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
            data: "data-phonenumber",
            label: "Phone Number",
            type: 'text',
            name: "phoneNumber",
            id: "phoneNumber",
            placeholder: "08123456789",
            maxLength: "20",
            required: true
        },
        {
            labelFor: "cityOfResidence",
            data: "data-cityofresidence",
            label: "City Of Residence",
            type: 'text',
            name: "cityOfResidence",
            id: "cityOfResidence",
            placeholder: "Abuja",
            maxLength: "20",
            required: true
        },
        {
            labelFor: "dob",
            data: "data-dob",
            label: "Date of birth",
            type: 'date',
            name: "dob",
            id: "dob",
            placeholder: "dateOfBirth",
            required: true
        },
        {
            labelFor: "password",
            data: "data-password",
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




    static async registerUser(params: Record<string, string>) {

        const options = {
            method: 'POST',
            url: `${API_URL}/register/users`,
            headers: { 'Content-Type': 'application/json' },
            data: {
                ...params,
                // metadata: {}
            }
        };
        try {
            const request = await axios.request(options)
            if (request.status === 200) {
                window.location.href = `/login/client`
            }
        } catch (error) {
            console.log("error", error.message)
        }
    }



}

document.body.addEventListener('submit', e => {
    let formId = "register-client"
    if (e && (e.target as HTMLFormElement).id === formId) {
        e.preventDefault();
        // actual logic, e.g. validate the form
        var formEl = document.forms[formId];

        var formData = new FormData(formEl);

        let data: Record<string, string> = {}
        for (const pair of formData.entries()) {
            data[pair[0]] = pair[1] as string
        }


        RegisterClient.registerUser(data as Record<string, string>)
    }
});
