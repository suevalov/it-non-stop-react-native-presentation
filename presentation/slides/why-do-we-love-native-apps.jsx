import React from 'react';
import { Layout, Fill, Heading, Image } from '../../src/spectacle';
import { register, unregister } from '../../src/steps';

export default class WhyDoWeLoveNativeApps extends React.Component {

  static propTypes = {
    like: React.PropTypes.string.isRequired,
    index: React.PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      maxStep: 1
    };
  }

  componentWillMount() {
    register(this.props.index, {
      prev: () => {
        if (this.state.step > 0) {
          this.setState({ step: this.state.step - 1 });
          return false;
        }
        return true;
      },
      next: () => {
        if (this.state.step < this.state.maxStep) {
          this.setState({ step: this.state.step + 1 });
          return false;
        }
        return true;
      }
    });
  }

  componentWillUnmount() {
    unregister(this.props.index);
  }

  render() {
    return (
      <Layout>
        <Fill>
          <Heading size={2} textColor='darkPrimary'>Why do we</Heading>
          <Image src={this.props.like} width='30%' />
          <Heading size={2} textColor='darkPrimary'>native apps?</Heading>
        </Fill>
      </Layout>
    );
  }

}
