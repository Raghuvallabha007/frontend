import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap';
// import CheckOutSteps from '../components/CheckOutSteps';
import Message from './../components/Message';
import { createOrder, getOrderDetails } from '../actions/orderActions';
import Loader from './../components/Loader';

const OrderScreen = () => {
    const dispatch = useDispatch();
    const params = useParams();

    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails

    if (!loading) {
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }

        order.itemsPrice = addDecimals(order?.orderItems.reduce((acc, item) =>
            acc + item.price * item.qty, 0
        ));
    }

    useEffect(() => {
        if (!order || order?._id !== params?.id) {
            dispatch(getOrderDetails(params?.id))
        }
    }, [dispatch, params?.id, order?._id, order])

    const placeOrderHandler = () => {
        dispatch(createOrder())
    }

    return loading ? <Loader /> : error ? <Message variant='danger'></Message> :
        <>
            <h1>Order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup>
                        <ListGroupItem>
                            <h2>Shipping</h2>
                            <p>
                                <b>Name: </b>{order.user.name}
                            </p>
                            <p><a href={`mailto:${order.user.mail}`}>{order.user.mail}</a></p>
                            <p>
                                <b>Address: </b>
                                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                                {order.shippingAddress.postalCode}{' '},
                                {order.shippingAddress.country}
                            </p>
                            {order.deliveredAt ? (<Message variant='success'>Delivered on {order.deliveredAt}
                            </Message>) : (
                                <Message variant='danger'>Not Delivered</Message>
                            )}
                        </ListGroupItem>
                        <ListGroupItem>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method:</strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (<Message variant='success'>Paid on {order.paidAt}
                            </Message>) : (
                                <Message variant='danger'>Not Paid</Message>
                            )}
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2>Ordered Items</h2>
                            {order.orderItems.length === 0 ? <Message>Your cart is empty</Message> :
                                (<ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroupItem key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x {item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>)}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup>
                            <ListGroupItem>
                                <h2>Order summary</h2>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order?.itemsPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping price</Col>
                                    <Col>${order?.shippingPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order?.taxPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order?.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            {error && <ListGroupItem><Message variant='danger'>{error}</Message>
                            </ListGroupItem>}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
}

export default OrderScreen