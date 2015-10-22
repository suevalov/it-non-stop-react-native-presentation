import React from 'react';
import { Row, Col } from 'elemental';
import { Heading, Image, List, ListItem } from '../../src/spectacle';
import stepped from '../stepped';

@stepped(4)
export default class BulletLoveNativeApps extends React.Component {

  static propTypes = {
    step: React.PropTypes.number.isRequired,
    image: React.PropTypes.string.isRequired
  };

  render() {
    return (
      <div>
        <Row>
          <Col>
            <Heading size={3} textColor='darkPrimary' style={{ marginTop: '-150px' }}>Нативные приложения</Heading>
          </Col>
        </Row>
        <Row>
          <Col xs='2/3'>
            <List>
              { this.props.step >= 0 ? <ListItem>Быстрые и отзывчивые</ListItem> : null }
              { this.props.step >= 1 ? <ListItem>Сложные жесты</ListItem> : null }
              { this.props.step >= 2 ? <ListItem>Нетривиальные анимации</ListItem> : null }
              { this.props.step >= 3 ? <ListItem>Консистентный UI</ListItem> : null }
            </List>
          </Col>
          <Col xs='1/3'>
            <Image src={this.props.image} width='100%' />
          </Col>
        </Row>
      </div>
    );
  }

}
