import React from 'react';
import { Row, Col } from 'elemental';
import { Image } from '../../src/spectacle';

const image = require('../images/styles.png');

export default class ReactStyles extends React.Component {

  static propTypes = {
    step: React.PropTypes.number.isRequired
  };

  render() {
    return (
      <Row>
        <Col>
          <Image src={image} width='100%' />
        </Col>
      </Row>
    );
  }

}
