import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { inject } from 'narcissus';

import UnstyledFlexDialog from './UnstyledFlexDialog';

const styles = {
  dialog: {
    position: 'relative',
    backgroundColor: 'white',
    padding: 20,
    color: '#333333',
    boxShadow: '0px 2px 15px rgba(0, 0, 0, 0.4)',
    borderRadius: 10,
  },
};

export default class FlexDialog extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    useDefaultStyle: PropTypes.bool.isRequired,
    width: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    margin: PropTypes.number,
    style: PropTypes.object,
  };
  static defaultProps = {
    width: 'auto',
    margin: 20,
    useDefaultStyle: true,
  };
  render = () => {
    const {
      props: {
        className,
        margin,
        style,
        width,
        useDefaultStyle,
        ...rest,
      },
    } = this;

    const combinedClassName = classNames(className, {
      [inject(styles.dialog)]: useDefaultStyle,
    });

    const combinedStyle = {
      ...style,
      width,
      padding: margin,
      boxSizing: 'border-box',
    };

    return <UnstyledFlexDialog style={combinedStyle} className={combinedClassName} {...rest}/>;
  };
}
