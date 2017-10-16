import React from 'react';
import PropTypes from 'prop-types';

import ModalPortal from './ModalPortal';
import ModalBackground from './ModalBackground';

/**
 * This is a shorthand that combines the portal and background, because it is
 * not often that I use one without the other. I have separated them out in
 * the source code so that one can build other combinations of Background and
 * Portal.
 */
export default class ModalContainer extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }
  render = () => {
    const {
      props: {
        children,
        ...rest,
      },
    } = this;

    return <ModalPortal {...rest}>
      <ModalBackground {...rest}>
        {children}
      </ModalBackground>
    </ModalPortal>;
  }
}
