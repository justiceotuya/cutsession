export default class AbstractView {
  params: any
  formInput: Record<string, string>[]
  userType: string

  loginSubtitle: string

  formID: string
  heroPhotograph: string

  constructor(params: any) {
    this.params = params;
  }

  setTitle(title: string) {
    document.title = title;
  }


  attributtion() {
    return ""
  }


  getInput() {
    return this.formInput.map(item => {
      const { type, placeholder, name, label, labelFor, id } = item
      return `
                    <div class="flex flex-col mb-4">
                        <label for="${labelFor}" class="text-sm mb-2">${label}</label>
                        <div class="w-full relative">
                        <input type="${type}" name="${name}" id="${id}" placeholder="${placeholder}"
                            class="bg-white rounded border border-primary h-full px-2 py-3 w-full placeholder:text-sm placeholder:text-custom-gray-500" required/>
                           ${type === "password" ? `<button type="button" class="border absolute right-3 top-3 ">toggle</button>` : ''}
                            </div>
                    </div>
                      `
    }).join('')
  }
  async getHtml() {
    return `
        <div class="h-screen w-screen">
            <div class="h-16 border-primary border-b flex items-center justify-center">
                <div class="h-16 flex items-center justify-center">
                    <p class="text-2xl text-black pr-2 ">CutScene</p>
                    <p class="h-4 bg-gray-300 w-px "></p>
                    <p class="text-base text-custom-gray-400 pl-2 ">${this.userType}</p>
                </div>
            </div>
            <div class="flex h-[calc(100vh-64px)]">
                <div class="flex-1 justify-center px-5">
                    <div class=" w-full max-w-sm mt-14 md:mt-16 lg:mt-32 mx-auto">
                        <div class="mb-6">
                            <h1 class="font-semibold text-2xl mb-0.5 ">Welcome back</h1>
                            <p class="text-base text-custom-gray-400">Log in to ${this.loginSubtitle}.</p>
                        </div>
                        <form class="" id="${this.formID}">
                            ${this.getInput()}
                            <button class="w-full rounded-3xl bg-custom-gold py-2.5 text-sm mb-6" type="submit">Log in to your account</button>

                          <hr class="mb-6 border-primary" />

                         <p class="text-sm text-custom-gray-400 text-center">First time here? <a class="text-black underline " href="/register/${this.userType.toLowerCase()}"> Get started</a></p>
                          </form>
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
