import axios from '../../lib';
import { API_URL } from '../../../config';
import AbstractView from '../AbstractView';

type TMerchantData = {
  cityOfOperation: string
  email: string
  merchantId: string
  name: string
  phoneNumber: string
  userId: string
}
export default class MerchantList extends AbstractView {
  merchantData: TMerchantData[] = []
  constructor(params: any) {
    super(params);
    this.setTitle('Merchants');
  }

  static async fetchMerchant() {
    const options = {
      method: 'GET',

    };
    try {
      const response = await axios.get(`${API_URL}/clients?type=MERCHANT&limit=20&offset=1`, options);
      return response.data.data
    } catch (error) {
      console.error(error);
    }
  }

  static getMerchantHtml(item: TMerchantData) {
    const { phoneNumber, name, cityOfOperation, email, merchantId, userId } = item
    const id = merchantId ?? userId
    return `
      <a href="/merchant/${id}" class="bg-white flex-grow  border border-card rounded-2xl shadow-s01 w-80 overflow-hidden">
            <div class="h-36 bg-custom-gold flex items-center justify-center font-extrabold text-7xl text-white " >AO</div>
            <div class="px-6 pb-9 pt-6">
                <p class="font-semibold text-base leading-6 text-custom-gray-600 pb-1" >${name}</p>
                <p class="text-sm text-custom-gray-600 pb-1">${name} is a merchant based in ${cityOfOperation}</p>
                <p class="text-sm text-custom-gray-700">${phoneNumber} · ${email}</p>
            </div>
        </a>
    `
  }

  async getHtml() {
    return `
       ${this.pageNavbar()}
       <div class="p-8 flex gap-8 flex-wrap bg-custom-gray-800" id="merchantData" >
       Loading merchants ...
       </div>
    `;
  }
}



window.addEventListener('DOMContentLoaded', async () => {
  console.log("changes")
  if (window.location.pathname === "/merchants") {
    let data: TMerchantData[] = await MerchantList.fetchMerchant()
    let merchantHTMLData = data.map(item => {
      return MerchantList.getMerchantHtml(item)
    }).join("")

    let merchantDom = document.getElementById("merchantData")
    if (merchantDom) {
      merchantDom.innerHTML = merchantHTMLData
    }
  }

});
