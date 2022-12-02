import LoginClient from './views/authentication/login-client';
import LoginMerchant from './views/authentication/login-merchant';
import Home from './views/home';


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
        { path: '/login/client', view: LoginClient },
        { path: '/login/merchant', view: LoginMerchant },
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
            route: routes[0],
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

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', e => {
        let dataLink = (e.target as HTMLAnchorElement).matches('[data-link]')
        let link = (e.target as HTMLAnchorElement).href
        if (dataLink && link) {
            e.preventDefault();
            navigateTo(link);
        }
    });



    router();
});
