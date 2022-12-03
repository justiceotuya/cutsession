import AbstractView from './AbstractView'
import error from '../assets/error.jpeg'
export default class ErrorPage extends AbstractView {

  constructor(params: any) {
    super(params);
    this.setTitle('Error');
  }

  heroPhotograph = error

  attributtion() {
    return `Photo by <a href="https://unsplash.com/@etiennegirardet?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Etienne Girardet</a> on <a href="https://unsplash.com/s/photos/error?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>`
  }



  async getHtml() {
    return `
               <div class="h-screen w-screen">
            <div class="h-16 border-primary border-b flex items-center justify-center">
                <div class="h-16 flex items-center justify-center">
                    <p class="text-2xl text-black pr-2 ">CutScene</p>
                </div>
            </div>
            <div class="flex h-[calc(100vh-64px)]">
                <div class="flex-1 justify-center px-5">
                    <div class=" w-full max-w-sm mt-14 md:mt-16 lg:mt-32 mx-auto">
                        <div class="">
                            <p class="text-4xl text-center font-bold">Error 404 page </p>
                        </div>
                    </div>
                    </div>
                    <div class="hidden sm:flex w-1/2 relative">
                        <img alt="photographer" src="${this.heroPhotograph}" class="h-full w-full object-cover" />
                        <p class="absolute bottom-2 right-2  bg-white p-0.5 text-xs rounded">
                            ${this.attributtion()}
                        </p>
                </div>
            </div>
        </div>
    `;
  }
}
