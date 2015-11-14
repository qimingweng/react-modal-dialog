import React, {PropTypes} from 'react';

import ModalPortal from './ModalPortal';
import ModalBackground from './ModalBackground';

/**
 * This is a shorthand that combines the portal and background
 */
export default class ModalContainer extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }
  render = () => {
    const {children, ...props} = this.props;

    return <ModalPortal {...props}>
      <ModalBackground {...props}>
        {children}
      </ModalBackground>
    </ModalPortal>;
  }
}
