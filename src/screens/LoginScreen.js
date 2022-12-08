import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Form, Row, Col, Button, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const history = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo, loading, error } = userLogin

    const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '/'

    useEffect(() => {
        if (userInfo) {
            history(redirect)
        }
    }, [userInfo, redirect, history])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    //useDispatch

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <FormGroup controlId='email'>
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        type='email'
                        placeholder='Enter Email'
                        onChange={(e) => setEmail(e.target.value)}
                    ></FormControl>
                </FormGroup>
                <FormGroup controlId='password'>
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        type='password'
                        placeholder='Enter password'
                        onChange={(e) => setPassword(e.target.value)}
                    ></FormControl>
                </FormGroup>
                <Button
                    type='submit'
                    variant='primary'
                >
                    Sign In
                </Button>
                <Row className='py-3'>
                    <Col>
                        New customer ? <Link to={redirect ?
                            `/register?redirect=${redirect}` : '/register'}>
                            Register...</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default LoginScreen