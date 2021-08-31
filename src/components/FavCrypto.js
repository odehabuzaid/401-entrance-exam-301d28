import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import FavItem from './FavItem';
import { withAuth0 } from '@auth0/auth0-react';
import { Container, Row, Col } from 'react-bootstrap';

class FavCrypto extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      favData: [],
      favItems: [],
    };
  }
  componentDidMount = () => {
    const requestConfig = {
      method: 'get',
      baseURL: process.env.REACT_APP_API_SERVER,
      url: '/favData',
      params: { email: this.props.auth0.user.email },
    };
    axios( requestConfig )
      .then( ( response ) => {
        this.setState( {
          favData: response.data,
          favItems: response.data.fav,
        } );
        console.log( 'favCrypto', this.state.favData );
        console.log( 'items', this.state.favItems );
      } )
      .catch( ( err ) => err );
  };

  handleValueChange = ( e ) => {
    const { name, value } = e.target;
    this.setState( { [name]: value } );
  };

  render() {
    return (
      <>
        <Container fluid>
          <Row>
            <Col>
              {this.state.favItems.length > 0 &&
                this.state.favItems.map( ( item, index ) => (
                  <FavItem
                    item={item}
                    key={index}
                    index={index}
                    id={this.state.favData._id}
                    handlechange={this.handleValueChange}
                    updateFav={this.updateFav}
                  />
                ) )}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default withAuth0( FavCrypto );
