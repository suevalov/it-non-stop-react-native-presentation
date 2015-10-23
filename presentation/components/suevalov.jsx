import React, { Component } from 'react';

import { Link } from '../../src/spectacle';

export default class Suevalov extends Component {

  static propTypes = {
    photo: React.PropTypes.string
  }

  renderMe() {
    const styles = {
      'margin': '20px auto',
      'width': '100px',
      'height': '100px',
      'borderRadius': '60px'
    };
    return (
        <img src={this.props.photo} style={styles} />
    );
  }

  render() {
    return (
      <div className="suevalovComponent">
        { this.renderMe() }
        <div>
          <Link href="http://suevalov.com">
            http://suevalov.com
          </Link>
          <Link href="mailto:suevalov.me@gmail.com">
            suevalov.me@gmail.com
          </Link>
        </div>
      </div>
    );
  }

}
