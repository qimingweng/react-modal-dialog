import React, {PropTypes} from 'react';

// Done in SVG so we can avoid importing any CSS
const RECT_WIDTH = 1.5;
const MARGIN = 8;

class CloseCircle extends React.PureComponent {
  render() {
    const {
      diameter,
    } = this.props;

    const radius = diameter / 2;

    return <svg width={diameter} height={diameter}>
      <circle cx={radius} cy={radius} r={radius} fill="black"/>
      <g transform={`rotate(45 ${diameter / 2} ${diameter / 2})`}>
        <rect
          x={MARGIN}
          y={(diameter - RECT_WIDTH) / 2}
          width={diameter - (2 * MARGIN)}
          height={RECT_WIDTH}
          fill="white"
        />
        <rect
          y={MARGIN}
          x={(diameter - RECT_WIDTH) / 2}
          height={diameter - (2 * MARGIN)}
          width={RECT_WIDTH}
          fill="white"
        />
      </g>
    </svg>;
  }
}

CloseCircle.propTypes = {
  diameter: PropTypes.number.isRequired,
};

export default CloseCircle;
