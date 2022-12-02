import AbstractView from '../AbstractView';
import model from '../../assets/prewedding.jpeg'

export default class LoginClient extends AbstractView {
    postID: string
    error: string



    constructor(params: Record<string, string>) {
        super(params);
        this.setTitle('Login Client');
    }
    formID = 'LoginClient'

    heroPhotograph = model

    userType = "Client"

    loginSubtitle = "search and book studio sessions"

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
        LoginClient.loginUser({ username, password, accessType: 'USER' })
        // let test = new Login({})
        // console.log(Login.clickActionButton())

    }
});
