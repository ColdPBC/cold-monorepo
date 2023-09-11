import { createContext } from 'react'
import {Auth0ProviderOptions} from "@auth0/auth0-react";

const ColdContext = createContext({
  auth0Options: {} as Auth0ProviderOptions,
  launchDarklyClientSideId: "",
})

export default ColdContext
