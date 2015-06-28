import React, {PropTypes} from 'react';
import {debounce} from 'lodash';

/**
 * Injects props.topOffset and props.leftOffset to its child component
 */
export function centerComponent(ReactClass) {
	return React.createClass({
		displayName: ReactClass.displayName + 'Centered',
		getInitialState() {
			return {
				topOffset: null,
				leftOffset: null
			}
		},
		componentDidMount() {
			this.resizeChildNode();
			this.debouncedResize = debounce(this.resizeChildNode, 50);
			window.addEventListener('resize', this.debouncedResize);
		},
		componentWillUnmount() {
			window.removeEventListener('resize', this.debouncedResize);
		},
		componentDidUpdate(prevProps) {
			if (this.props.children != prevProps.children) {
				// children are different, resize
				this.resizeChildNode();
			}
		},
		resizeChildNode() {
			const node = React.findDOMNode(this.refs.component);
			const rect = {
				height: node.clientHeight,
				width: node.clientWidth
			};
			const windowWidth = document.documentElement.clientWidth;
			const windowHeight = document.documentElement.clientHeight;

			this.setState({
				topOffset: (windowHeight - rect.height)/2,
				leftOffset: (windowWidth - rect.width)/2
			});
		},
		render() {
			const {topOffset, leftOffset} = this.state;

			return (
				<ReactClass 
					ref="component" 
					topOffset={topOffset} 
					leftOffset={leftOffset} 
					recenter={this.resizeChildNode}
					{...this.props}/>
			)
		}
	});
}