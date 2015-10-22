import React from 'react';
import { Row, Col } from 'elemental';
import { Heading } from '../../src/spectacle';

export default class UserExperinceOrDeveloperVelocity extends React.Component {

  static propTypes = {
    step: React.PropTypes.number.isRequired,
    onUpdateStep: React.PropTypes.func.isRequired,
  };

  render() {
    const styles = {
      version: {
        size: 3,
        textColor: 'light'
      },
      or: {
        size: 5,
        textColor: 'light',
        style: {
          fontWeight: 'bold'
        }
      }
    };

    return (
      <Row>
        <Col xs='40%'>
          <Heading {...styles.version}>
            User Experience
          </Heading>
        </Col>
        <Col xs='20%'>
          <Heading {...styles.or}>
            или
          </Heading>
        </Col>
        <Col xs='40%'>
          <Heading {...styles.version}>
            Developer Experience
          </Heading>
        </Col>
      </Row>
    );
  }

}
