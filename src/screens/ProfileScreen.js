import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Form, Row, Col, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserDetails, updateUserProfile } from '../actions/userActions'

const ProfileScreen = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const history = useNavigate()

    const userDetails = useSelector(state => state.userDetails)
    const { user, loading, error } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '/'

    useEffect(() => {
        if (!userInfo) {
            history('/login')
        } else {
            if (!user?.name) {
                dispatch(getUserDetails('profile'))
            } else {
                setName(user?.name)
                setEmail(user?.email)
            }
        }
    }, [userInfo, redirect, history, dispatch, user])


    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmpassword) {
            setMessage('Passwords are not same')
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }
    }

    //useDispatch

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {success && <Message variant='success'>profile updated</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <FormGroup controlId='name'>
                        <FormLabel>Name</FormLabel>
                        <FormControl
                            type='name'
                            value={name}
                            placeholder='Enter name'
                            onChange={(e) => setName(e.target.value)}
                        ></FormControl>
                    </FormGroup>
                    <FormGroup controlId='email'>
                        <FormLabel>Email</FormLabel>
                        <FormControl
                            type='email'
                            value={email}
                            placeholder='Enter Email'
                            onChange={(e) => setEmail(e.target.value)}
                        ></FormControl>
                    </FormGroup>
                    <FormGroup controlId='password'>
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            type='password'
                            value={password}
                            placeholder='Enter password'
                            onChange={(e) => setPassword(e.target.value)}
                        ></FormControl>
                    </FormGroup>
                    <FormGroup controlId='password'>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl
                            type='password'
                            value={confirmpassword}
                            placeholder='Enter confirm password'
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></FormControl>
                    </FormGroup>
                    <Button
                        type='submit'
                        variant='primary'
                    >
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
            </Col>
        </Row>
    )
}

export default ProfileScreen