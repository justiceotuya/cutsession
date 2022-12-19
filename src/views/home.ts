import AbstractView from './AbstractView';
import studio from '../assets/studio.jpg'
export default class extends AbstractView {
  constructor(params: any) {
    super(params);
    this.setTitle('Home');
  }

  heroPhotograph = studio
  attributtion() {
    return `Photo by <a href="https://unsplash.com/es/@doscocoslocos?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Marissa Lewis</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  `
  }
  async getHtml() {
    return `
    <div>
        <div class="h-screen w-screen overflow-x-hidden">
            ${this.pageNavbar()}
            <div class="flex h-[calc(100vh-64px)] bg-studio relative">
<div class="absolute inset-0 bg-black bg-opacity-60"></div>
                <div class="absolute inset-0 flex-1 flex p-2 md:p-8 max-w-4xl text-center items-center justify-center m-auto">
                    <div class="mb-5 w-full text-white mt-8  mx-auto px-2 md:px-0">
                        <div class="mb-6">
                            <h1 class="font-semibold text-custom-gold-light text-3xl md:text-4xl lg:text-6xl mb-10 md:leading-loose">Effortlessly book your studio sessions with CutSession</h1>

                               <a href="/login/client" class=" rounded-3xl bg-custom-gold py-2.5 px-5 text-lg mb-6 text-black" type="submit">Login as User</a>

                                 <a href="/login/merchant" class=" rounded-3xl bg-custom-gold py-2.5 px-5 text-lg mb-6 text-black" type="submit">Login as Merchant</a>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    `;
  }
}
