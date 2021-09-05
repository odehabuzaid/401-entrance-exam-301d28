import React, { Component } from 'react';
import { Col, Card, Button, Modal, Form, FormGroup } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';
class FavItem extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      showModal: false,
      title: '',
      toUSD: '',
      sImage: '',
      index: '',
    };
  }
  editModal = ( title, toUSD, image_url, description, index ) => {
    this.setState( {
      showModal: true,
      title: title,
      toUSD: toUSD,
      sImage: image_url,
      description: description,
      index: index,
    } );
  };

  handleValueChange = ( e ) => {
    const { name, value } = e.target;
    this.setState( { [name]: value } );
  };

  deleteFavItem = ( index, id, componentDidMount ) => {
    const requestConfig = {
      method: 'delete',
      baseURL: process.env.REACT_APP_API_SERVER,
      url: `/deleteFav/${id}`,
      params: { index: index },
    };
    axios( requestConfig )
      .then( ( response ) => {
        swal( {
          position: 'top-end',
          icon: 'success',
          title: response.data,
          Button: false,
          timer: 1500,
        } );
        componentDidMount();
        this.forceUpdate();
      } )
      .catch( ( err ) => err );
  };

  closeUpdateModal = () => {
    this.setState( {
      showModal: false,
    } );
  };

  updateFav = ( id, componentDidMount ) => {
    const requestConfig = {
      method: 'put',
      baseURL: process.env.REACT_APP_API_SERVER,
      url: `/updateFav/${id}`,
      params: {
        title: this.state.title,
        description: this.state.description,
        toUSD: this.state.toUSD,
        image: this.state.sImage,
        index: this.state.index,
      },
    };
    axios( requestConfig )
      .then( ( response ) => {
        swal( {
          position: 'top-end',
          icon: 'success',
          title: response.data,
          Button: false,
          timer: 1500,
        } );
        componentDidMount();
        this.forceUpdate();
        this.closeUpdateModal();
      } )
      .catch( ( err ) => err );
  };

  render() {
    const { item, index, id, componentDidMount } = this.props;
    return (
      <Col style={{ padding: '5px' }}>
        <Card className='shadow' style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Img src={item.image} alt={item.title} />
            <Card.Text>{item.description}</Card.Text>
            <Card.Text>{item.toUSD}</Card.Text>
            <Card.Footer>
              <Button
                variant='warning'
                onClick={() =>
                  this.editModal(
                    item.title,
                    item.toUSD,
                    item.image,
                    item.description,
                    index,
                  )
                }
              >
                Edit ✏️
              </Button>
              {'  '}
              <Button
                variant='warning'
                onClick={() => this.deleteFavItem( index, id, componentDidMount )}
              >
                delete ❌
              </Button>
            </Card.Footer>
          </Card.Body>
        </Card>
        <Modal show={this.state.showModal} onHide={this.closeUpdateModal}>
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
                  onChange={( e ) => this.handleValueChange( e )}
                  type='text'
                  name='title'
                  value={this.state.title}
                  id='titleInput'
                ></Form.Control>
                <Form.Label style={{ marginBottom: '10px' }}>toUSD</Form.Label>
                <Form.Control
                  className='md-4'
                  placeholder='item Description'
                  onChange={( e ) => this.handleValueChange( e )}
                  type='text'
                  name='toUSD'
                  value={this.state.toUSD}
                  id='descriptionInput'
                ></Form.Control>
                <Form.Label style={{ marginBottom: '10px' }}>image</Form.Label>
                <Form.Control
                  className='md-4'
                  name='sImage'
                  placeholder='item Description'
                  onChange={( e ) => this.handleValueChange( e )}
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
              onClick={() => this.updateFav( id, componentDidMount )}
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
