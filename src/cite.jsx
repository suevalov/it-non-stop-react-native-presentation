import React from 'react/addons';
import assign from 'object-assign';
import Base from './base';
import Radium from 'radium';

@Radium
class Cite extends Base {
  render() {
    return (
      <cite style={[this.context.styles.components.cite, this.getStyles()]}>
        - {this.props.children}
      </cite>
    )
  }
}

Cite.contextTypes = {
  styles: React.PropTypes.object
}

export default Cite;