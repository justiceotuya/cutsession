import LoginClient from './views/authentication/login-client';
import LoginMerchant from './views/authentication/login-merchant';
import RegisterClient from './views/authentication/register-client';
import RegisterMerchant from './views/authentication/register-merchant';
import ErrorPage from './views/error';
import Home from './views/home';
import Merchants from './views/merchants';


type TMatch = {
    route: {
        path: string;
        view: typeof Home;
    };
    result: RegExpMatchArray | null;
}

const pathToRegex = (path: string) =>
    new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');

const getParams = (match: TMatch) => {
    const values = (match.result as RegExpMatchArray).slice(1);

    const keys = Array.from(
        match.route.path
            .matchAll(/:(\w+)/g))
        .map(result => result[1]
        );

    return Object.fromEntries(
        keys.map((key, i) => {
            return [
                key,
                values[i]
            ];
        })
    );
};

const navigateTo = (url: string) => {
    history.pushState(null, "", url);
    router();
};

const router = async () => {
    const routes = [
        { path: '/', view: Home },
        { path: '/merchants', view: Merchants },
        { path: '/login/client', view: LoginClient },
        { path: '/login/merchant', view: LoginMerchant },
        { path: '/register/client', view: RegisterClient },
        { path: '/register/merchant', view: RegisterMerchant },
    ];

    // Test each route for a potential match.
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        match = {
            route: { path: '*', view: ErrorPage },
            result: [
                location.pathname
            ]
        };
    }

    const view = new match.route.view(getParams(match));
    const app = document.querySelector('#app')
    if (app) {
        app.innerHTML = await view.getHtml();
    }
};

window.addEventListener('popstate', router);
let url = location.href;

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', e => {
        requestAnimationFrame(() => {
            if (url !== location.href) {
                console.log('url changed');
                url = location.href
            }
            let dataLink = (e.target as HTMLAnchorElement).matches('[data-link]')
            let link = (e.target as HTMLAnchorElement).href
            if (dataLink && link) {
                e.preventDefault();
                navigateTo(link);
            }
        });
    });



    router();
}, true);
