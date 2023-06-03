import React from 'react'
import ProfileAuth0 from './profileAuth0'

describe('<ProfileAuth0 />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ProfileAuth0 />)
  })
})