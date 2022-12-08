import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { NavLink } from 'react-router-dom'

const CheckOutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {step1 ? (<LinkContainer to='/login'>
                    <NavLink>Sign In</NavLink>
                </LinkContainer>
                ) : (
                    <NavLink disabled>Sign In</NavLink>)}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (<LinkContainer to='/shipping'>
                    <NavLink>Shipping</NavLink>
                </LinkContainer>
                ) : (
                    <NavLink disabled>Shipping</NavLink>)}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (<LinkContainer to='/payment'>
                    <NavLink>payment</NavLink>
                </LinkContainer>
                ) : (
                    <NavLink disabled>payment</NavLink>)}
            </Nav.Item>

            <Nav.Item>
                {step4 ? (<LinkContainer to='/placeorder'>
                    <NavLink>placeorder</NavLink>
                </LinkContainer>
                ) : (
                    <NavLink disabled>placeorder</NavLink>)}
            </Nav.Item>
        </Nav >
    )
}

export default CheckOutSteps