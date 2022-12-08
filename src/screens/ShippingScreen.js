import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckOutSteps from '../components/CheckOutSteps'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = () => {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalcode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');

    const dispatch = useDispatch();
    const history = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history('/payment');
    }

    return <FormContainer>
        <CheckOutSteps step1 step2 />
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <FormGroup controlId='address'>
                <FormLabel>Address</FormLabel>
                <FormControl
                    type='text'
                    placeholder='Enter Address'
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}
                ></FormControl>
            </FormGroup>
            <FormGroup controlId='city'>
                <FormLabel>City</FormLabel>
                <FormControl
                    type='text'
                    placeholder='Enter city'
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}
                ></FormControl>
            </FormGroup>
            <FormGroup controlId='postalCode'>
                <FormLabel>Postal code</FormLabel>
                <FormControl
                    type='text'
                    placeholder='Enter postal code'
                    value={postalCode}
                    required
                    onChange={(e) => setPostalcode(e.target.value)}
                ></FormControl>
            </FormGroup>
            <FormGroup controlId='country'>
                <FormLabel>Country</FormLabel>
                <FormControl
                    type='text'
                    placeholder='Enter country'
                    value={country}
                    required
                    onChange={(e) => setCountry(e.target.value)}
                ></FormControl>
            </FormGroup>
            <br></br>
            <Button type='submit' variant='primary'>Continue</Button>
        </Form>
    </FormContainer>
}

export default ShippingScreen