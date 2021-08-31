import React, { Component } from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
class CryptoItems extends Component {



  addToFavorite = ( item ) => {
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
        alert( response.data );
      } )
      .catch( ( err ) => err );
  };

  render() {
    const { item } = this.props;
    return (
      <>
        <Col style={{ padding: '10px' }}>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Img src={item.image_url} alt={item.title} />
              <Card.Text>{item.description}</Card.Text>
              <Card.Text>{item.toUSD}</Card.Text>
              <Card.Footer>
                <Button
                  variant='warning'
                  onClick={() => this.addToFavorite( item )}
                >
                  Favorite ❤️
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
