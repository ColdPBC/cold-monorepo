import documentationTemplate from './documentationTemplate.mdx';
import "../src/styles.css";
import 'flowbite';
import {auth0UserMock, worker} from '../../../libs/react/src';

// Storybook executes this module in both bootstap phase (Node)
// and a story's runtime (browser). However, we cannot call `setupWorker`
// in Node environment, so need to check if we're in a browser.
if (typeof global.process === 'undefined' || global.process.title === 'browser') {

    // Start the mocking when each story is loaded.
    // Repetitive calls to the `.start()` method do not register a new worker,
    // but check whether there's an existing once, reusing it, if so.
    worker.start({
        onUnhandledRequest(req) {
            if(!req.url.href.includes('http://localhost:4400')){
                console.warn(
                    'Found an unhandled %s request to %s',
                    req.method,
                    req.url.href,
                )
            } else {
                console.warn(
                    'Found an unhandled %s request to %s',
                    req.method,
                    req.url.href,
                )
            }

        },
    }).then((r) => console.log(r));
}

export default {
    parameters: {
        actions: {argTypesRegex: "^on[A-Z].*"},
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        previewTabs: {
            "storybook/docs/panel": {index: -1},
        },
        docs: {
            page: documentationTemplate,
        },
        backgrounds: {
            default: 'cold',
            values: [
                {
                    name: 'cold',
                    value: '#080912',
                },
                {
                    name: 'white',
                    value: '#FFFFFF'
                },
            ],
        },
        cookie: {
            "coldpbc": {
                accessToken: "accessToken",
                user: auth0UserMock,
            }
        },
        auth0AddOn: {
            isLoading: false,
            isAuthenticated: true,
            getAccessTokenSilently: () => {
                return "accessToken"
            },
            getAccessTokenWithPopup: ()  => {},
            getIdTokenClaims: ()  => {},
            loginWithRedirect: ()  => {},
            loginWithPopup: ()  => {},
            logout: ()  => {},
            handleRedirectCallback: ()  => {},
            buildAuthorizeUrl: ()  => {},
            buildLogoutUrl: ()  => {},
            user: auth0UserMock,
        }
    },
    decorators: [
    ]
};
