import AbstractView from '../AbstractView';
import LoginClient from './login-client';
import photographer from '../../assets/photographer.jpeg'


export default class LoginMerchant extends LoginClient {
    postID: string
    error: string

    constructor(params: Record<string, string>) {
        super(params);
        this.setTitle('Login');
    }
    formID = 'Login'
    userType = "Merchant"

    heroPhotograph = photographer
    loginSubtitle = "manage studio sessions"


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

    static async loginUser(params: { username: string, password: string, accessType: "USER" | "MERCHANT" }) {
        try {
            const request = await fetch('https://stoplight.io/mocks/pipeline/pipelinev2-projects/111233856/sign-in', {
                method: "POST",
                body: JSON.stringify({
                    ...params,
                    accessType: "USER"
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
    if (e) {
        e.preventDefault();
        // actual logic, e.g. validate the form
        var formEl = document.forms.Login;

        var formData = new FormData(formEl);

        var username = formData.get('username') as string;
        var password = formData.get('password') as string;
        Login.loginUser({ username, password, accessType: 'USER' })
        // let test = new Login({})
        // console.log(Login.clickActionButton())

    }
});
