import AbstractView from './AbstractView';

export default class extends AbstractView {
  constructor(params: any) {
    super(params);
    this.setTitle('Home');
  }

  async getHtml() {
    return `
        <h1>Home</h1>
        <p>
          Welcome to CutScene
        </p>
        <p>
            <a href="/login/client" data-link>Login Client</a>
        </p> <p>
             <a href="/login/merchant" data-link>Login Merchant</a>
        </p>

        <br>
        <br>

        <p>
          GitHub repo: <a href="https://github.com/michaelcurrin/single-page-app-vanilla-js">michaelcurrin/single-page-app-vanilla-js</a>.
        </p>
    `;
  }
}
