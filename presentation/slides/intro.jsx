import React from 'react';
import { Heading, Image, Layout, Fill } from '../../src/spectacle';
import { Suevalov } from '../components';

export default class IntroSlide extends React.Component {

  static propTypes = {
    logo: React.PropTypes.string.isRequired,
    photo: React.PropTypes.string.isRequired
  };

  render() {
    return (
      <div>
        <Layout>
          <Fill>
            <Image src={this.props.logo} width='300px' />
          </Fill>
        </Layout>
        <Layout>
          <Fill>
            <Heading size={1} caps textColor='darkPrimary'>
              React Native
            </Heading>
            <Heading size={6} fontNormal textColor='darkPrimary'>
              Building native applications for iOS and Android
            </Heading>
          </Fill>
        </Layout>
        <Suevalov photo={this.props.photo} />
      </div>
    );
  }

}