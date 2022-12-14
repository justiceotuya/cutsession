import AbstractView from '../AbstractView'
import { API_URL } from '../../../config';
// import axios from '../../lib';
import axios from 'axios';

export default class CreateSession extends AbstractView {

    constructor(params: any) {
        super(params);
        this.setTitle('Create Session');
    }

    formID = 'create-session'
    userType = "Merchant"
    pageSubtitle = "Create studio sessions"
    pageTitle = "Create session"

    buttonText = "Create session"

    linkToLoginOrRegister() {
        return ''
    }

    formInput: Record<string, any>[] = [

        {
            label: "Session start",
            labelFor: "startsAt",
            data: "data-startsat",
            type: 'datetime-local',
            name: "startsAt",
            id: "startsAt",
            placeholder: ""
        },
        {
            labelFor: "endsAt",
            data: "data-endsat",
            type: 'datetime-local',
            name: "endsAt",
            id: "endsAt",
            placeholder: "",
            label: "Session end",
        },
        {
            labelFor: "type",
            data: "data-type",
            type: "select",
            label: "Week type",
            inputType: 'select',
            name: "type",
            id: "type",
            options: ["WeekDay", "WeekEnd"],
            placeholder: "Enter notes about this booking"
        }
    ]


    async getHtml() {
        return `
        <div class="h-screen w-screen overflow-x-hidden">
            ${this.pageNavbar()}
            <div class="flex h-[calc(100vh-64px)]">
                <div class="flex-1 flex justify-center md:items-center overflow-auto scroll-p-5">
                    <div class="mb-5 w-full max-w-sm mt-8  mx-auto px-2 md:px-0">
                        <div class="mb-6">
                            <h1 class="font-semibold text-2xl mb-0.5 ">${this.pageTitle}</h1>
                            <p class="text-base text-custom-gray-400">${this.pageSubtitle}</p>
                        </div>
                        <form class="" id="${this.formID}">
                            ${this.getInput()}
                            <button class="w-full rounded-3xl bg-custom-gold py-2.5 text-sm mb-6" type="submit">${this.buttonText}</button>

                          <hr class="mb-6 border-primary" />

                         ${this.linkToLoginOrRegister()}
                          </form>
                    </div>
                </div>
            </div>
        </div>
    `;
    }

    static extractDate(date: string) {
        return new Date(date).toISOString().split("T")[1]
    }

    static async createSession(data: Record<string, string>) {
        const { merchantId, startsAt, endsAt, ...params } = data
        const options = {
            method: 'POST',
            url: `${API_URL}/studios/${merchantId}`,
            headers: { 'Content-Type': 'application/json' },
            data: {
                ...params,
                startsAt: this.extractDate(startsAt),
                endsAt: this.extractDate(endsAt)
            }
        };

        try {
            const request = await axios.request(options)
            if (request.status === 200) {
                alert("session created")
                window.location.href = `/merchant`
            }
        } catch (error) {
            console.error(error);
        }
    }
}


document.body.addEventListener('submit', e => {
    let formId = 'create-session'
    if (e && (e.target as HTMLFormElement).id === formId) {
        e.preventDefault();
        // actual logic, e.g. validate the form
        var formEl = document.forms[formId];

        var formData = new FormData(formEl);

        let data: Record<string, string> = {}
        for (const pair of formData.entries()) {
            data[pair[0]] = pair[1] as string
        }

        let userData = localStorage.getItem('data')
        if (userData) {
            data["merchantId"] = JSON.parse(userData)?.merchantId
        }
        CreateSession.createSession(data as Record<string, string>)
    }
});
