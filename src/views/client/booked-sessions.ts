import axios from '../../lib';
// import axios from "axios";
import { API_URL } from '../../../config';
import AbstractView from '../AbstractView';
import auth from '../../lib/index'
type TMerchantData = {
    cityOfOperation: string
    email: string
    merchantId: string
    name: string
    phoneNumber: string
}
type TMerchantSession = {
    bookingId: string,
    bookingRef: string,
    date: string,
    endsAt: string,
    notes: string,
    sessionId: string,
    startsAt: string,
    title: string,
    userId: string,

}
export default class BookedSession extends AbstractView {
    merchantData: TMerchantData[] = []
    constructor(params: any) {
        super(params);
        this.setTitle('Merchant');
    }



    navItems = [{
        link: "/bookings",
        text: "Bookings"
    }, {
        link: this.getUserType() === "MERCHANT" ? "/merchant" : "/merchants",
        text: this.getUserType() === "MERCHANT" ? "Session" : "Merchants"
    },
    ]

    static async FetchBookedSessions(params: Record<string, string>) {
        // let newParams = params.filter(item)
        Object.keys(params).forEach((k) => (params[k] == null || params[k] == "") && delete params[k]);
        const options = {
            url: `${API_URL}/bookings`,
            method: 'GET',
            params: { limit: '20', offset: '1', ...params },
        };
        try {
            const response = await axios.request(options);
            console.log(response.data)
            return response.data
        } catch (error) {
            console.error(error);
        }
    }


    static normaliseTime(time: string): string {
        const [hour, minute, ...rest] = time.split(":")
        return `${hour}:${minute}`
    }

    static isMerchant(): boolean {
        let user = localStorage.getItem("data")
        if (user) {
            return JSON.parse(user)?.type === "MERCHANT"
        }
        return false
    }



    static getMerchantHtml(item: TMerchantSession) {
        const { bookingId,
            bookingRef,
            date,
            endsAt,
            notes,
            sessionId,
            startsAt,
            title,
            userId,
        } = item

        return `
              <div
        class="bg-custom-gold-light flex-grow  border border-secondary rounded-lg overflow-hidden w-full px-7 py-3 mb-4 relative before:absolute before:bg-custom-gold before:h-4/5 before:w-1 before:rounded-lg before:top-2 before:left-3 flex items-start sm:items-center justify-between gap-3 flex-col sm:flex-row">
        <div>
            <p class="font-medium text-gray-text-200 mb-0.5">
                ${title}
            </p>

            <p class="text-sm text-gray-text-200 mb-1">
                ${notes}
            </p>

            <p class="text-sm text-gray-text-100">
                ${new Date(date).toDateString()}, ${this.normaliseTime(startsAt)} — ${this.normaliseTime(endsAt)}
            </p>
        </div>

        ${!this.isMerchant() ? `<p class="bg-black text-white px-2 py-1 font-medium rounded-xl"> #${bookingRef} </p>` :
                ""}
    </div>    `
    }


    formInput: Record<string, any>[] = [
        {
            labelFor: "city",
            label: "City",
            type: 'text',
            name: "city",
            id: "city",
            placeholder: "Enter city name",
            minLength: "2",
            required: true
        },
        {
            labelFor: "merchant",
            label: "Merchant",
            type: 'text',
            name: "merchant",
            id: "merchant",
            placeholder: "Enter merchant name",
            minLength: "2",
        },
        {
            labelFor: "period",
            type: "select",
            label: "Period",
            inputType: 'select',
            name: "period",
            id: "period",
            options: ["Single", "Date-range"],
        },
        {
            label: "Session start",
            labelFor: "startsAt",
            type: 'datetime-local',
            name: "startsAt",
            id: "startsAt",
            placeholder: ""
        },
        {
            labelFor: "endsAt",
            type: 'datetime-local',
            name: "endsAt",
            id: "endsAt",
            placeholder: "",
            label: "Session end",
        },
    ]

    async getHtml() {
        return `
       ${this.pageNavbar()}
            <div class=" flex gap-8 flex-wrap bg-custom-gray-800 min-h-screen">
            <div
                class="max-w-5xl w-11/12 md:w-full h-full mt-16 bg-white  rounded-t-xl  m-auto shadow-so2 pb-8 overflow-hidden">
                <div class="w-full bg-custom-gold px-8 py-3">
                    <p class=" text-black px-6 py-1 font-medium rounded-xl text-xl"> Booked sessions </p>
                </div>
                <form id="booking-form" class="w-full bg-custom-gold px-8 py-3 gap-3 ">

                <div class="flex flex-wrap gap-3">
                  ${this.getInput()}
                </div>
                     <button class=" rounded-3xl bg-black py-2.5 px-5 text-sm mb-6 text-white" type="submit">Search Bookings</button>
                </form>
                <div id="merchantData" class="max-w-2xl w-full m-auto mt-8 h-full">
                </div>
            </div>
        </div>
    `;
    }
}



window.addEventListener('submit', async (e) => {
    let formId = 'booking-form'
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
            let userType = JSON.parse(userData).type;
            if (userType === "MERCHANT") {
                data["merchantId"] = JSON.parse(userData).merchantId
            }
        }

        let result: { data: TMerchantSession[] } = await BookedSession.FetchBookedSessions(data as Record<string, string>)
        let merchantHTMLData = result.data.map(item => {
            return BookedSession.getMerchantHtml(item)
        }).join("")

        let merchantDom = document.getElementById("merchantData")
        if (merchantDom) {
            merchantDom.innerHTML = merchantHTMLData
        }
    }
});

window.addEventListener('DOMContentLoaded', async () => {
    if (window.location.pathname === "/bookings") {
        let periodContainer = document.querySelector("#container-period")
        let endsAtContainer = document.querySelector("#container-endsAt")
        let merchantContainer = document.querySelector("#container-merchant")
        let endsAt = document.querySelector("#endsAt")

        //initially hide the session end dete picker input because the default period is single
        endsAtContainer?.classList.add("hidden")
        //hide the merchants input feild if the current loggedin user is merchant and use the merchant id from storage to make all requests
        let userData = localStorage.getItem('data')
        if (userData) {
            let userType = JSON.parse(userData).type
            userType === "MERCHANT" && merchantContainer?.classList.add("hidden")
        }

        periodContainer?.addEventListener("change", (e) => {
            let value = (e.target as HTMLSelectElement).value


            if (value === "Single") {
                console.log("value", value)
                console.log("endsAt", endsAt);
                (endsAt as HTMLInputElement).value = ""
                endsAtContainer?.classList.add("hidden")
                // (endsAt.target as HTMLSelectElement).value
            } else {
                endsAtContainer?.classList.remove("hidden")
            }
        })
    }
})
