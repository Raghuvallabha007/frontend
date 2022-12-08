import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, FormGroup, FormLabel, Col, FormCheck } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckOutSteps from '../components/CheckOutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = () => {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    const dispatch = useDispatch();
    const history = useNavigate();

    if (!shippingAddress) {
        history('/shipping')
    }
    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        history('/placeorder');
    }

    return <FormContainer>
        <CheckOutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <FormGroup>
                <FormLabel as='legend'>Select method</FormLabel>
                <Col>
                    <FormCheck
                        type='radio'
                        label='paypal or credit'
                        id='PayPal'
                        name='paymentMethod'
                        value='PayPal'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    {/* <FormCheck
                        type='radio'
                        label='stripe'
                        id='Stripe'
                        name='paymenyMethod'
                        value='Stripe'
                        onCanPlay={(e) => setPaymentMethod(e.target.value)}
                    /> */}
                </Col>
            </FormGroup>
            <br></br>
            <Button type='submit' variant='primary'>Continue</Button>
        </Form>
    </FormContainer>
}

export default PaymentScreen