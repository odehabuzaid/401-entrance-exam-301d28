import React, { Component } from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import swal from 'sweetalert';
class CryptoItems extends Component {
  addToFavorite = ( item, componentDidMount ) => {
    const { title, description, toUSD, image_url } = item;
    let email = this.props.auth0.user.email;
    const requestConfig = {
      method: 'post',
      baseURL: process.env.REACT_APP_API_SERVER,
      url: '/createFav',
      params: { email, title, description, toUSD, image_url },
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

  render() {
    const { item, componentDidMount } = this.props;
    return (
      <>
        <Col style={{ padding: '5px' }}>
          <Card className='shadow' style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Img src={item.image_url} alt={item.title} />
              <Card.Text>{item.description}</Card.Text>
              <Card.Text>{item.toUSD}</Card.Text>
              <Card.Footer>
                <Button
                  variant='warning'
                  onClick={() => this.addToFavorite( item, componentDidMount )}
                >
                  add-to-watchlist ➕
                </Button>
              </Card.Footer>
            </Card.Body>
          </Card>
        </Col>
      </>
    );
  }
}

export default withAuth0( CryptoItems );
