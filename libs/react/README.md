# ColdPBC React Component Library

## Available Scripts

### 1. start

Run storybook locally to test your components.

### How to use

1. Import 'ColdContextProvider' from the library.
2. Wrap the provider around your app.
3. Pass in the env variables as props to the provider.
4. Call the 'Application' component from the library.
5. Wrap the 'Application' component in the ColdContextProvider.
6. Pass in the Auth0 domain, clientId, redirectUri, and audience as props to the ColdContextProvider.
7. Pass in the LaunchDarkly clientSideId as a prop to the ColdContextProvider.


#### Example Code

```javascript
import { ColdContextProvider, Application} from '@coldpbc/components';

export const Main () => {
    return (
        <ColdContextProvider
            domain={domain}
            clientId={clientId}
            redirectUri={window.location.origin + '/callback'}
            audience={audience}
            launchDarklyClientSideId={launchDarklyClientSideId}
            >
            <Application />
        </ColdContextProvider>
    )
}
```

## Running unit tests

Run `nx test react` to execute the unit tests via [Vitest](https://vitest.dev/).
