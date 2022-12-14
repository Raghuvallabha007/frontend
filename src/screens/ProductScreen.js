import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { ListGroup, Row, Col, Button, Image, ListGroupItem, Card, FormControl } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Rating from '../components/Rating';
import { selectedProduct } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = () => {
    const [qty, setQty] = useState(1)
    const params = useParams();
    const dispatch = useDispatch();
    const history = useNavigate();

    useEffect(() => {
        dispatch(selectedProduct(params.id))
    }, [params, dispatch])

    const selectedproductToComp = useSelector(state => state?.selectedProduct ? state?.selectedProduct : '')
    const { product, loading, error } = selectedproductToComp

    const addToCartHandler = () => {
        history(`/cart/${params.id}?qty=${qty}`)
    }
    return (
        <>
            <Link className='btn btn-dark my-3' to='/'>Go Back</Link>
            {
                loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                    (
                        <Row>
                            <Col md={6}>
                                <Image src={product.image} alt={product.name} fluid />
                            </Col>
                            <Col md={3}>
                                <ListGroup variant='flush'>
                                    <ListGroupItem>
                                        <h2>{product.name}</h2>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Rating
                                            value={product.rating}
                                            text={`${product.numReviews} reviews`}
                                        />
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        Price: {product.price}
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        Description: {product.description}
                                    </ListGroupItem>
                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <ListGroup variant='flush'>
                                        <ListGroupItem>
                                            <Row>
                                                <Col>
                                                    Price:
                                                </Col>
                                                <Col>
                                                    <strong>${product.price}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <Row>
                                                <Col>
                                                    Status:
                                                </Col>
                                                <Col>
                                                    {product.countInStock ? 'In Stock' : 'Out Of Stock'}
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                        {product.countInStock > 0 && (
                                            <ListGroupItem>
                                                <Row>
                                                    <Col>Qty</Col>
                                                    <Col>
                                                        <FormControl
                                                            as='select'
                                                            value={qty}
                                                            onChange={(e) => setQty(e.target.value)}
                                                        >
                                                            {
                                                                [...Array(product.countInStock).keys()].map(x => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                ))
                                                            }
                                                        </FormControl>
                                                    </Col>
                                                </Row>
                                            </ListGroupItem>
                                        )}
                                        <ListGroupItem>
                                            <Button
                                                onClick={addToCartHandler}
                                                className='btn-block'
                                                type='button'
                                                disabled={product.countInStock === 0}>Add to Cart</Button>
                                        </ListGroupItem>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                    )}

        </>
    )
}

export default ProductScreen