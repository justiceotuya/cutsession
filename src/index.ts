import LoginClient from './views/client/login-client';
import LoginMerchant from './views/merchant/login-merchant';
import RegisterClient from './views/client/register-client';
import RegisterMerchant from './views/merchant/register-merchant';
import ErrorPage from './views/error';
import Home from './views/home';
import Merchant from './views/merchant/dashboard';
import MerchantList from './views/client/dashboard';


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
        { path: '/merchants', view: MerchantList },
        { path: '/login/client', view: LoginClient },
        { path: '/login/merchant', view: LoginMerchant },
        { path: '/register/client', view: RegisterClient },
        { path: '/register/merchant', view: RegisterMerchant },
        { path: '/merchant/:id', view: Merchant },
        { path: '/merchant', view: Merchant },
        // { path: '/booking/:id', view: Merchant },
        // { path: '/create-merchant', view: Merchant },
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
