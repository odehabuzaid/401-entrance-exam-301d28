import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import { Container, Row, Col } from 'react-bootstrap';
import CryptoItems from './CryptoItems';
class Home extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      apiData: [],
    };
  }

  componentDidMount = () => {
    const requestConfig = {
      method: 'get',
      baseURL: process.env.REACT_APP_API_SERVER,
      url: '/getapiData',
      params: { email: this.props.auth0.user.email },
    };
    axios( requestConfig )
      .then( ( response ) => {
        this.setState( {
          apiData: response.data,
        } );
        console.log( this.state.apiData );
      } )
      .catch( ( err ) => err );
  };

  render() {
    return (
      <>
        <Container fluid>
          <Row>
            <Col>
              {this.state.apiData.length > 0 &&
                this.state.apiData.map( ( item, index ) => (
                  <CryptoItems item={item} key={index} />
                ) )}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default withAuth0( Home );
