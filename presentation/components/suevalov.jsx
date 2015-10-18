import React, { Component } from 'react';

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
      <div className='suevalovComponent'>
        { this.renderMe() }
        <div>
          <a href='http://suevalov.com' target='_blank'>
            http://suevalov.com
          </a>
          <a href='mailto:suevalov.me@gmail.com'>
            suevalov.me@gmail.com
          </a>
        </div>
      </div>
    );
  }
}
