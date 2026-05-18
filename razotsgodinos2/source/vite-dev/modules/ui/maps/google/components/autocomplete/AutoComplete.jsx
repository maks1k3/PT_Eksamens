import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithLocale from './WithLocale';

import ScriptsLoader from 'utils/ScriptsLoader';

import Input from 'ui/inputs/input';

const propTypes = {
	types: PropTypes.array, //(cities),(regions),address,geocode

	onLocationChange: PropTypes.func,

	apiKey: PropTypes.string,
	lang: PropTypes.string,
	libraries: PropTypes.array,
	version: PropTypes.string,

	value: PropTypes.any,
	valueId: PropTypes.any,

	onChange: PropTypes.func,

	InputProps: PropTypes.object,

	showValidationError: PropTypes.bool,
	disabled: PropTypes.bool,

	//from Field
	FieldInstance: PropTypes.object,
};

const defaultProps = {
	types: ['address'],
	libraries: ['places', 'visualization'],
	version: '3',
	showValidationError: false,
	disabled: false,
};

class AutoComplete extends Component {
	constructor(props) {
		super(props);
		this.input = React.createRef();

		this.lat = 0;
		this.lng = 0;
		this.place = null;
		this.listeners = {};

		const value = _.get(this.props, 'value', '');

		this.value = this.formatValue(value);
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		this.loadScripts();

		this.setValue(this.value);

		const { FieldInstance } = this.props;

		if (!_.isUndefined(FieldInstance)) {
			FieldInstance.register({ input: this, isInput: true });
		}
		//</editor-fold>
	}

	componentDidUpdate(prevProps) {
		//<editor-fold defaultstate="collapsed" desc="componentDidUpdate">
		if (prevProps.value !== this.props.value) {
			if (this.value !== this.props.value) {
				this.setValue(this.props.value);
			}
		}

		if (prevProps.valueId !== this.props.valueId) {
			this.setValue(this.props.value);
		}
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		if (this.google) {
			Object.keys(this.listeners).forEach(e => {
				this.google.maps.event.removeListener(this.listeners[e]);
			});

			if (this.autocomplete) {
				this.google.maps.event.clearInstanceListeners(this.autocomplete);
			}
			$('.pac-container').remove();
		}
		//</editor-fold>
	}
	/* ========================================================================*
  *
  *                     Methods
  *
  * ========================================================================*/

	setValue = value => {
		//<editor-fold defaultstate="collapsed" desc="setValue">
		value = this.formatValue(value);
		this.value = value;

		if (this.input.current) {
			this.input.current.setValue(value);
		}
		//</editor-fold>
	};

	getValue = () => {
		//<editor-fold defaultstate="collapsed" desc="getValue">
		return this.value;
		//</editor-fold>
	};

	formatValue = value => {
		//<editor-fold defaultstate="collapsed" desc="formatNumber">

		value = _.toString(value);

		value = _.trimStart(value);
		return value;
		//</editor-fold>
	};

	onScriptsLoaded = () => {
		//<editor-fold defaultstate="collapsed" desc="onScriptsLoaded">
		this.init();
		//</editor-fold>
	};

	loadScripts = () => {
		//<editor-fold defaultstate="collapsed" desc="loadScripts">
		const { apiKey, lang, libraries, version } = this.props;
		let _apiKey = apiKey;
		let _lang = lang;

		if (_.isUndefined(_apiKey)) {
			if (!_.isUndefined(store)) {
				_apiKey = _.get(store.getState(), 'configuration.googleMaps.key');
			}
		}

		if (_.isUndefined(_lang)) {
			if (!_.isUndefined(store)) {
				_lang = _.get(store.getState(), 'configuration.googleMaps.lang');
			}
		}

		const params = $.param({
			key: _apiKey,
			language: _lang,
			libraries: libraries.join(','),
			version: version,
		});

		const url = `https://maps.googleapis.com/maps/api/js?${params}`;

		ScriptsLoader.load({
			js: {
				GoogleMaps: url,
			},
			onLoad: this.onScriptsLoaded,
		});
		//</editor-fold>
	};

	init = () => {
		//<editor-fold defaultstate="collapsed" desc="init">
		this.google = window.google;
		const node = this.input.current.getDOMNode();

		const types = _.toArray(_g.cloneDeep(this.props.types));

		const options = {
			types: types, //(cities),(regions),address,geocode
		};
		const autocomplete = new this.google.maps.places.Autocomplete(
			node,
			options,
		);
		this.autocomplete = autocomplete;

		this.listeners['place_changed'] = autocomplete.addListener(
			'place_changed',
			this.onLocationChange,
		);
		//</editor-fold>
	};

	onLocationChange = () => {
		//<editor-fold defaultstate="collapsed" desc="onLocationChange">
		const { disabled } = this.props;
		if (disabled) {
			return;
		}

		const place = this.autocomplete.getPlace();
		if (!place.geometry) {
			return;
		}

		const position = place.geometry.location;

		const location = { lat: position.lat(), lng: position.lng() };

		this.lat = position.lat();
		this.lng = position.lng();
		this.place = place;

		const { onLocationChange } = this.props;

		const formatedAddress = _.get(place, 'formatted_address', '');

		if (!_g.isEmpty(formatedAddress)) {
			this.setValue(formatedAddress);

			const { onChange } = this.props;

			if (_.isFunction(onChange)) {
				onChange({ value: formatedAddress });
			}
		}

		if (_.isFunction(onLocationChange)) {
			onLocationChange({
				location,
				place,
				AutoComplete: this,
			});
		}
		//</editor-fold>
	};

	onChange = ({ value, event, Input, debounce }) => {
		//<editor-fold defaultstate="collapsed" desc="onChange">
		const { onChange, disabled } = this.props;

		if (disabled) {
			return;
		}

		this.value = value;

		if (_.isFunction(onChange)) {
			onChange({ value: value, event, Input, debounce });
		}
		//</editor-fold>
	};

	render() {
		const { InputProps, disabled, showValidationError } = this.props;

		return (
			<Input
				{...InputProps}
				ref={this.input}
				onChange={this.onChange}
				disabled={disabled}
				showValidationError={showValidationError}
			/>
		);
	}
}

AutoComplete.propTypes = propTypes;

AutoComplete.defaultProps = defaultProps;

AutoComplete = WithLocale(AutoComplete);

export default AutoComplete;
