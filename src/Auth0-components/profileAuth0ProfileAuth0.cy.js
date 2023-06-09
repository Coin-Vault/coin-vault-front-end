import cy from 'cypress'
import React from 'react'
import ProfileAuth0 from './profileAuth0'

describe('<ProfileAuth0 />', () => {
  it('renders', () => {
    cy.mount(<ProfileAuth0 />)
  })
})