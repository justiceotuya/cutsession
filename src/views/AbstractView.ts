type InputType = {
  type: string, name: string, id: string, placeholder: string, minLength: string, maxLength: string, required: string, data: string, value: string, disabled: string, options?: any
}

export default class AbstractView {
  params: any
  formInput: Record<string, string>[]

  pageSubtitle: string

  formID: string
  heroPhotograph: string

  pageTitle: string
  buttonText: string
  constructor(params: any) {
    this.params = params;
    this.buttonText = "Log in to your account"
  }

  setTitle(title: string) {
    document.title = title;
  }

  attributtion() {
    return ""
  }

  linkToLoginOrRegisterText = "First time here?"
  linkToLoginOrRegisterLink = `/register/client`
  linkToLoginOrRegisterlinkText = "Get started"

  userType = this.getUserType()?.toLowerCase()

  getUserType() {
    let userData = localStorage.getItem('data')
    if (userData) {
      return JSON.parse(userData).type;
    }
  }
  linkToLoginOrRegister() {
    return `<p class="text-sm text-custom-gray-400 text-center">${this.linkToLoginOrRegisterText ?? ""}<a class="text-black underline " href="${this.linkToLoginOrRegisterLink ?? ""}"> ${this.linkToLoginOrRegisterlinkText ?? ""}</a></p>`
  }
  renderInput({ type, name, id, placeholder, minLength, maxLength, required, data, value, disabled }: InputType) {
    return `   <input ${data}="${name}" type="${type}" name="${name}" id="${id}" placeholder="${placeholder}"  minLength="${minLength}" maxLength="${maxLength}"
   value="${value || ""}" class="bg-white rounded border border-primary h-45px px-2 py-3 w-full placeholder:text-sm placeholder:text-custom-gray-500" ${required ? "required" : ""} disabled="${disabled}"/>`
  }
  renderTextArea({ type, name, id, placeholder, minLength, maxLength, required, data, value, disabled }: InputType) {
    return `<textarea ${data}="${name}" type="${type}" name="${name}" id="${id}" placeholder="${placeholder}" minLength="${minLength}" maxLength="${maxLength}" value="${value || ""}" class="bg-white rounded border border-primary h-full px-2 py-3 w-full placeholder:text-sm placeholder:text-custom-gray-500 " ${required ? "required" : ""} disabled="${disabled}"></textarea>`
  }

  renderSelect({ type, name, id, placeholder, options, required, data, value, disabled }: InputType) {
    return `<select ${data}="${name}" type="${type}" name="${name}" id="${id}" placeholder="${placeholder}" value="${value || ""}" class="bg-white rounded border border-primary h-45px px-2 py-3 w-full placeholder:text-sm placeholder:text-custom-gray-500" ${required ? "required" : ""}disabled="${disabled}" >
      ${options.map(item => ` <option value="${item}">${item}</option>`)}
    </select>`
  }

  renderInputFeilds(args) {
    const { inputType, ...others } = args
    if (inputType === "textarea") {
      return this.renderTextArea(others)
    }
    if (inputType === "select") {
      return this.renderSelect(others)
    }
    return this.renderInput(others)
  }

  getInput() {
    return this.formInput.map(item => {
      const { type, placeholder, name, label, labelFor, id, inputType, data } = item
      const customInput = inputType === "textarea" ? "textarea" : "input"
      return `
                    <div class="flex flex-col mb-2" id="container-${id}">
                        <label for="${labelFor}" class="text-sm mb-2">${label}</label>
                        <div class="w-full relative">
                          ${this.renderInputFeilds(item)}
                            </div>
                    </div>
                      `
    }).join('')
  }

  navItems: {
    link: string;
    text: string;
  }[] = []


  pageNavbar() {
    return `
    <div class="h-16 border-primary border-b flex items-center justify-between px-12 gap-2 flex-wrap">
                <div class="h-16 flex items-center justify-center">
                    <a href="/" class="text-2xl text-black pr-2 ">CutScene</a>
                    ${this.userType ? `<p class="h-4 bg-gray-300 w-px "></p>
                    <p class="text-base text-custom-gray-400 pl-2 first-letter:uppercase">${this.userType}</p>` : ""}
                </div>
                ${this.navItems.length ? `<div class="h-16 flex gap-3 items-center justify-center">
                ${this.navItems.map(item => {
      const { link, text } = item;

      return ` <a href="${link}" class=" text-black pr-2 hover:underline">${text}</a>`
    }).join('')}
     <button  class=" text-black pr-2 hover:underline" id="logout">Logout</button>
                 </div>`: `<div class="hidden"></div>
    `}
            </div>`
  }
  async getHtml() {
    return `
    <div>
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
                <div class="hidden sm:flex w-1/2 relative bg-custom-gray-500">
                    <img alt="photographer" src="${this.heroPhotograph}" class="h-full w-full object-cover" type="image/webp"/>
                    <p class="absolute bottom-2 right-2  bg-white p-0.5 text-xs rounded">
                    ${this.attributtion()}
  </p>
                </div>
            </div>
        </div>
        </div>
    `;
  }
}


window.addEventListener('click', async (e) => {
  let formId = 'logout'
  if (e && (e.target as HTMLButtonElement).id === formId) {
    e.preventDefault();
    localStorage.removeItem('data')
    localStorage.removeItem("currentMerchant")
    window.location.href = "/"
  }
});
