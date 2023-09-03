import React from 'react'
import { Home } from './home'
import { mount } from 'cypress/react'

describe('<Home />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(<Home />)
  })
})
