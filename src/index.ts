import LoginClient from './views/client/login-client';
import LoginMerchant from './views/merchant/login-merchant';
import RegisterClient from './views/client/register-client';
import RegisterMerchant from './views/merchant/register-merchant';
import ErrorPage from './views/error';
import Home from './views/home';
import Merchant from './views/merchant/dashboard';
import MerchantList from './views/client/dashboard';
import BookingPage from './views/client/booking';
import BookedSession from './views/client/booked-sessions';
import CreateSession from './views/merchant/create-session';


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

const routes = [
    { path: '/', view: Home, protected: false },
    { path: '/merchants', view: MerchantList, protected: true },
    { path: '/login/client', view: LoginClient, protected: false },
    { path: '/login/merchant', view: LoginMerchant, protected: false },
    { path: '/register/client', view: RegisterClient, protected: false },
    { path: '/register/merchant', view: RegisterMerchant, protected: false },
    { path: '/merchant/:id', view: Merchant, protected: true },
    { path: '/merchant', view: Merchant, protected: true },
    { path: '/booking/:id', view: BookingPage, protected: true },
    { path: '/bookings', view: BookedSession, protected: true },
    { path: '/create-session', view: CreateSession, protected: true },
];
const router = async () => {

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
            route: { path: '*', view: ErrorPage, protected: false },
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

    let isLoggedin = localStorage.getItem('data')
    let isMerchant: boolean | null = null
    let isUser: boolean | null = null
    if (isLoggedin) {
        isMerchant = JSON.parse(isLoggedin).type === "MERCHANT"
        isUser = JSON.parse(isLoggedin).type === "CLIENT"
    }
    let currentRoute: any
    if (window.location.pathname.startsWith("/merchant/")) {
        currentRoute = routes.find(r => r.path.startsWith("/merchant/"))
    } else if (window.location.pathname.startsWith("/booking/")) {
        currentRoute = routes.find(r => r.path.startsWith("/booking/"))
    } else {
        currentRoute = routes.find(r => r.path === window.location.pathname)
    }

    const authRoutes = ['/', '/login/client', '/login/merchant', '/register/client', '/register/merchant']

    if (!isLoggedin && currentRoute?.protected) {
        window.location.href = "/"
    } else if (isLoggedin && authRoutes.includes(currentRoute.path)) {
        if (isMerchant) {
            window.location.href = "/merchant"
        }
        if (isUser) {
            window.location.href = "/merchants"
        }
    }


    router();
}, true);
