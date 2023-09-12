<div align="center">
<p style="margin-bottom: 1px"><a href="http://nestjs.com/" target="blank"><img src="https://cold-public-assets.s3.us-east-2.amazonaws.com/Asset+4Logotype_Preferred.svg" width="699" alt="Cold Climate Logo" title="Cold Climate Logo"/></a></p>
<div style="font-size: 40px;"> @coldpbc/react : Component Library </div>
</div>

#  

### Getting Started

1. Install dependencies

```zsh
yarn 
```

2. Build Library

```zsh
yarn build:dev
```

3. Build Storybook

```zsh
yarn build-storybook
```

4. Start Storybook

```zsh
yarn storybook
```

## Available Scripts

### Prebuild

Generates Barrel Files For Library (`index.ts`)

**NOTE: This is run automatically before `build:dev` or `build:prod`)**

```zsh
yarn prebuild
```

### Build:dev

Builds the library in development mode.

```zsh
yarn build:dev
```

### Build:prod

Builds the library in production mode.

```zsh
yarn build:prod
```

### Build Storybook

```zsh
yarn build-storybook
```

### Start Storybook

```zsh
yarn storybook
```

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
