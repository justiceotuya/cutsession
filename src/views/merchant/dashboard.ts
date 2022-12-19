import axios from '../../lib';
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
  endsAt: string
  id: string
  merchantId: string
  startsAt: string
  type: string
}
export default class Merchant extends AbstractView {
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
  static async FetchStudioSessions() {
    let merchantIdFromURL;

    if (window.location.pathname === "/merchant") {
      let data = localStorage.getItem('data')
      if (data) {
        merchantIdFromURL = JSON.parse(data)?.merchantId
      }
    } else {
      merchantIdFromURL = window.location.pathname.replace("/merchant/", "")
    }




    const options = {
      method: 'GET',
    };
    try {
      const response = await axios.get(`${API_URL}/studios/${merchantIdFromURL}`, options);
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
    const { endsAt,
      id,
      startsAt,
      type,
      merchantId } = item

    return `
      <div class="bg-custom-gold-light flex-grow  border border-secondary rounded-lg overflow-hidden w-full px-7 py-3 mb-4 relative before:absolute before:bg-custom-gold before:h-4/5 before:w-1 before:rounded-lg before:top-2 before:left-3 flex items-center justify-between">
      <div>
      <p class="font-medium text-gray-text-200 mb-0.5">
      Studio session slot #${id}
      </p>
      <p class="text-sm text-gray-text-100">
       ${type}, ${this.normaliseTime(startsAt)} — ${this.normaliseTime(endsAt)}
      </p>
      </div>

    ${!this.isMerchant() ? `<a href="/booking/${id}" class="bg-black text-white px-6 py-1 font-medium rounded-xl"> Book </a>` : ""}
        </div>
    `
  }

  async getHtml() {
    return `
       ${this.pageNavbar()}
       <div class=" flex gap-8 flex-wrap bg-custom-gray-800 min-h-screen" >
       <div class="max-w-5xl w-11/12 md:w-full h-full mt-16 bg-white  rounded-t-xl  m-auto shadow-so2 pb-8 overflow-hidden" >

       <div class="w-full bg-custom-gold px-8 py-3 flex justify-between">
       <p class=" text-black px-6 py-1 font-medium rounded-xl text-xl"> Studio sessions </p>
  ${Merchant.isMerchant() ? `<a href= "/create-session" class="bg-black text-white px-6 py-1 font-medium rounded-xl"> Create session </a>` : ""}
       </div>
       <div id="merchantData" class="max-w-2xl w-full m-auto mt-8 h-full">
       Loading Sessions ...
       </div>
       </div>
       </div>
    `;
  }
}



window.addEventListener('DOMContentLoaded', async () => {
  if (window.location.pathname.startsWith("/merchant/") || window.location.pathname === ("/merchant")) {
    if (window.location.pathname.startsWith("/merchant/")) {
      let currentMerchant = window.location.pathname.split("/merchant/")[1]
      localStorage.setItem("currentMerchant", currentMerchant)
    }
    let data: TMerchantSession[] = await Merchant.FetchStudioSessions()
    let merchantHTMLData = data.map(item => {
      return Merchant.getMerchantHtml(item)
    }).join("")

    let merchantDom = document.getElementById("merchantData")
    if (merchantDom) {
      merchantDom.innerHTML = merchantHTMLData
    }
  }


});
