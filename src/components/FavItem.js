import React, { Component } from 'react';
import { Col, Card, Button, Modal, Form, FormGroup } from 'react-bootstrap';
import axios from 'axios';

class FavItem extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      showModal: false,
    };
  }
  editModal = () => {
    this.setState( {
      showModal: true,
      title: '',
      toUSD: '',
      sImage: '',
    } );
  };

  deleteFavItem = ( index, id ) => {
    const requestConfig = {
      method: 'delete',
      baseURL: process.env.REACT_APP_API_SERVER,
      url: `/deleteFav/${id}`,
      params: { index: index },
    };
    axios( requestConfig )
      .then( ( response ) => {
        alert( response.data );
      } )
      .catch( ( err ) => err );
  };

  closeUpdateModal = () => {
    this.state( {
      showModal: false,
    } );
  };

  render() {
    const { item, index, id, handlechange, updateFav } = this.props;
    return (
      <Col style={{ padding: '10px' }}>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Img src={item.image} alt={item.title} />
            <Card.Text>{item.description}</Card.Text>
            <Card.Text>{item.toUSD}</Card.Text>
            <Card.Footer>
              <Button
                variant='warning'
                onClick={() =>
                  this.editModal( item.title, item.toUSD, item.image_url, index )
                }
              >
                Edit ✏️
              </Button>
              {'  '}
              <Button
                variant='warning'
                onClick={() => this.deleteFavItem( index, id )}
              >
                delete ❌
              </Button>
            </Card.Footer>
          </Card.Body>
        </Card>
        <Modal show={this.state.show} onHide={this.closeUpdateModal}>
          <Modal.Header>
            <Modal.Title> Update Fav </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id='formGroups'>
              <FormGroup style={{ margin: '10px' }}>
                <Form.Label style={{ marginBottom: '10px' }}>Title</Form.Label>
                <Form.Control
                  className='md-4'
                  placeholder='item Title'
                  onChange={handlechange}
                  type='text'
                  name='title'
                  value={this.state.title}
                  id='titleInput'
                ></Form.Control>
                <Form.Label style={{ marginBottom: '10px' }}>toUSD</Form.Label>
                <Form.Control
                  className='md-4'
                  placeholder='item Description'
                  onChange={handlechange}
                  type='text'
                  name='toUSD'
                  value={this.state.toUSD}
                  id='descriptionInput'
                ></Form.Control>
                <Form.Label style={{ marginBottom: '10px' }}>image</Form.Label>
                <Form.Control
                  className='md-4'
                  name='image'
                  placeholder='item Description'
                  onChange={handlechange}
                  type='text'
                  value={this.state.sImage}
                  id='descriptionInput'
                ></Form.Control>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type='submit'
              variant='success'
              className='mr-1'
              style={{ margin: '10px' }}
              onClick={() => updateFav()}
            >
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </Col>
    );
  }
}

export default FavItem;
