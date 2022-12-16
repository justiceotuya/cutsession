import AbstractView from '../AbstractView'
import { API_URL } from '../../../config';
// import axios from '../../lib';
import axios from 'axios';

export default class BookingPage extends AbstractView {

  constructor(params: any) {
    super(params);
    this.setTitle('Booking');
  }

  formID = 'booking'
  userType = "Client"
  pageSubtitle = "Book studio sessions"
  pageTitle = "Booking"

  navItems = [{
    link: "/bookings",
    text: "Bookings"
  }, {
    link: "/merchants",
    text: "Merchants"
  },
  ]

  buttonText = "Book session"

  linkToLoginOrRegister() {
    return ''
  }

  formInput: Record<string, any>[] = [
    {
      labelFor: "title",
      type: "text",
      label: "Title",
      name: "title",
      id: "title",
      placeholder: "Enter title of this booking",
      required: true
    },
    {
      labelFor: "date",
      label: "Date of session",
      type: 'date',
      name: "date",
      id: "date",
      placeholder: "",
      required: true
    },
    {
      labelFor: "notes",
      type: "text",
      label: "Notes",
      inputType: 'textarea',
      name: "notes",
      id: "notes",
      placeholder: "Enter notes about this booking",
      required: true
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

  static async bookSession(data: Record<string, string>) {
    const options = {
      method: 'POST',
      url: `${API_URL}/bookings`,
      headers: { 'Content-Type': 'application/json' },
      data: {
        ...data,
        "userId": data.userId.length > 15 ? data.userId : 'c3073b9d-edd0-49f2-a28d-b7ded8ff9a8b',
      }
    };

    try {
      const request = await axios.request(options)
      if (request.status === 200) {
        // let currentMerchant = localStorage.getItem('currentMerchant')
        // if (currentMerchant) {
        //   window.location.href = `/bookings/${currentMerchant}`
        // }
        history.back()
      }
    } catch (error) {
      console.error(error);
    }
  }
}


document.body.addEventListener('submit', e => {
  let formId = "booking"
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
    data["sessionId"] = window.location.pathname.split("/booking/")[1]
    let userData = localStorage.getItem('data')
    if (userData) {
      data["userId"] = JSON.parse(userData)?.userId
    }
    console.log({ data })
    BookingPage.bookSession(data as Record<string, string>)
  }
});
