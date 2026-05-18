import PropTypes from 'prop-types';
import invariant from 'utils/invariant';

import { NodeType, closest } from './utils';

export function defaultGetHelperDimensions({ node }) {
	return {
		height: node.offsetHeight,
		width: node.offsetWidth,
	};
}

export function defaultShouldCancelStart(event) {
	// Cancel sorting if the event target is an `input`, `textarea`, `select` or `option`
	const interactiveElements = [
		NodeType.Input,
		NodeType.Textarea,
		NodeType.Select,
		NodeType.Option,
		NodeType.Button,
	];

	if (interactiveElements.indexOf(event.target.tagName) !== -1) {
		// Return true to cancel sorting
		return true;
	}

	if (closest(event.target, el => el.contentEditable === 'true')) {
		return true;
	}

	return false;
}

export const propTypes = {
	axis: PropTypes.oneOf(['x', 'y', 'xy']),
	contentWindow: PropTypes.any,
	disableAutoscroll: PropTypes.bool,
	distance: PropTypes.number,
	getContainer: PropTypes.func,
	getHelperDimensions: PropTypes.func,
	modifyHelper: PropTypes.func,
	helperClass: PropTypes.string,
	helperContainer: PropTypes.oneOfType([
		PropTypes.func,
		typeof HTMLElement === 'undefined'
			? PropTypes.any
			: PropTypes.instanceOf(HTMLElement),
	]),
	hideSortableGhost: PropTypes.bool,
	keyboardSortingTransitionDuration: PropTypes.number,
	lockAxis: PropTypes.string,
	lockOffset: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
		PropTypes.arrayOf(
			PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		),
	]),
	lockToContainerEdges: PropTypes.bool,
	onSortEnd: PropTypes.func,
	onSortMove: PropTypes.func,
	onSortOver: PropTypes.func,
	onSortStart: PropTypes.func,
	pressDelay: PropTypes.number,
	pressThreshold: PropTypes.number,
	shouldCancelStart: PropTypes.func,
	transitionDuration: PropTypes.number,
	updateBeforeSortStart: PropTypes.func,
	useDragHandle: PropTypes.bool,
	useWindowAsScrollContainer: PropTypes.bool,
};

export const defaultProps = {
	axis: 'y',
	disableAutoscroll: false,
	distance: 0,
	getHelperDimensions: defaultGetHelperDimensions,
	hideSortableGhost: true,
	lockOffset: '50%',
	lockToContainerEdges: false,
	pressDelay: 0,
	pressThreshold: 5,
	shouldCancelStart: defaultShouldCancelStart,
	transitionDuration: 300,
	useWindowAsScrollContainer: false,
};

export const omittedProps = Object.keys(propTypes);

export function validateProps(props) {
	invariant(
		!(props.distance && props.pressDelay),
		'Attempted to set both `pressDelay` and `distance` on SortableContainer, you may only use one or the other, not both at the same time.',
	);
}
