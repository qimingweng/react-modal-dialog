import React, {PropTypes} from 'react';
import Spinner from 'spin.js';

export default class ReactSpinner extends React.Component {
  static propTypes = {
    config: PropTypes.object,
    color: PropTypes.string.isRequired
  }
  static defaultProps = {
    color: 'black'
  }
  componentDidMount() {
    const {color, config} = this.props;
    const spinConfig = config || {width: 2, radius: 10, length: 7, color};

    this.spinner = new Spinner(spinConfig);
    this.spinner.spin(React.findDOMNode(this.refs.container));
  }
  componentWillUnmount() {
    this.spinner.stop();
  }
  render() {
    return (<span ref="container"/>)
  }
}