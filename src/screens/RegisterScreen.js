import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Form, Row, Col, Button, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

const RegisterScreen = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const history = useNavigate()

    const userRegister = useSelector(state => state.userRegister)
    const { userInfo, loading, error } = userRegister

    const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '/'

    useEffect(() => {
        if (userInfo) {
            history(redirect)
        }
    }, [userInfo, redirect, history])


    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmpassword) {
            setMessage('Passwords are not same')
        } else {
            dispatch(register(name, email, password))
        }
        //dispatch(login(email, password))
    }

    //useDispatch

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <FormGroup controlId='name'>
                    <FormLabel>Name</FormLabel>
                    <FormControl
                        type='name'
                        placeholder='Enter name'
                        onChange={(e) => setName(e.target.value)}
                    ></FormControl>
                </FormGroup>
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
                <FormGroup controlId='password'>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl
                        type='password'
                        placeholder='Enter confirm password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></FormControl>
                </FormGroup>
                <Button
                    type='submit'
                    variant='primary'
                >
                    Register
                </Button>
                <Row className='py-3'>
                    <Col>
                        Have an account ? <Link to={redirect ?
                            `/login?redirect=${redirect}` : '/login'}>
                            Register...</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default RegisterScreen