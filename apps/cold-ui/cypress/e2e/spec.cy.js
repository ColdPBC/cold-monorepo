import { visit } from 'cypress/react'

describe('template spec', () => {
  it('passes', () => {
    visit('https://example.cypress.io')
  })
})
