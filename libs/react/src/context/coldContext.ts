import { createContext } from 'react'

const ColdContext = createContext({
    domain: "",
    clientId: "",
    redirectUri: "",
    audience: "",
    launchDarklyClientSideId: "",
})

export default ColdContext
