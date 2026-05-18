import React, { PureComponent as Component } from "react";
import PropTypes from "prop-types";

import AutoComplete from "ui/maps/google/components/autocomplete";
import LocationMap from "ui/maps/google/components/location_map";

import styles from "./EditLocation.module.less";

const propTypes = {
  classNames: PropTypes.object,

  address: PropTypes.string,
  lat: PropTypes.number,
  lng: PropTypes.number,
  zoom: PropTypes.number,

  onLocationChanged: PropTypes.func,
  onZoomChanged: PropTypes.func,

  AutoCompleteProps: PropTypes.object,
  LocationMapProps: PropTypes.object,
};

const defaultProps = {
  classNames: {},
  address: "",
  lat: 56.95096612859509,
  lng: 24.136962890625,
  zoom: 7,
};

class EditLocation extends Component {
  constructor(props) {
    super(props);

    this.locationMap = React.createRef();

    const { lat, lng, zoom, address } = this.props;
    this.state = {
      lat: lat,
      lng: lng,
      zoom: zoom,
      address: address,
    };
  }

  componentDidUpdate(prevProps) {
    //<editor-fold defaultstate="collapsed" desc="componentDidUpdate">
    const updatedState = {};

    _.forEach(["lat", "lng", "zoom", "address"], (key) => {
      if (
        !_.isUndefined(prevProps[key]) &&
        prevProps[key] !== this.props[key]
      ) {
        if (this.state[key] !== this.props[key]) {
          updatedState[key] = this.props[key];
        }
      }
    });

    if (!_g.isEmpty(updatedState)) {
      this.setState(updatedState);
    }
    //</editor-fold>
  }

  /* ========================================================================*
   *
   *                     Methods
   *
   * ========================================================================*/

  getLocation = () => {
    //<editor-fold defaultstate="collapsed" desc="getLocation">
    const { lat, lng, zoom, address } = this.state;

    return { lat, lng, zoom, address };
    //</editor-fold>
  };

  onAutoCompleteLocationChange = ({ location }) => {
    //<editor-fold defaultstate="collapsed" desc="onAutoCompleteLocationChange">
    const { lat, lng } = location;

    this.setState({
      lat,
      lng,
    });

    const { onLocationChanged } = this.props;

    if (_.isFunction(onLocationChanged)) {
      onLocationChanged({ lat, lng, EditLocation: this });
    }
    //</editor-fold>
  };

  onAutocompleteChange = ({ value }) => {
    //<editor-fold defaultstate="collapsed" desc="onAutocompleteChange">
    this.setState({
      address: value,
    });
    //</editor-fold>
  };

  onLocationChanged = ({ lat, lng }) => {
    //<editor-fold defaultstate="collapsed" desc="onLocationChanged">

    this.setState({ lat, lng });

    const { onLocationChanged } = this.props;

    if (_.isFunction(onLocationChanged)) {
      onLocationChanged({ lat, lng, EditLocation: this });
    }
    //</editor-fold>
  };

  onZoomChanged = ({ zoom }) => {
    //<editor-fold defaultstate="collapsed" desc="onZoomChanged">
    this.setState({ zoom });

    const { onZoomChanged } = this.props;

    if (_.isFunction(onZoomChanged)) {
      onZoomChanged({ zoom, EditLocation: this });
    }
    //</editor-fold>
  };

  render() {
    const classNames = _g.getClassNames(styles, this.props.classNames);
    const { AutoCompleteProps, LocationMapProps } = this.props;
    const { lat, lng, zoom, address } = this.state;

    return (
      <div className={classNames["wrapper"]}>
        <div className={classNames["autocomplete-wrapper"]}>
          <AutoComplete
            types={["address"]} //(cities),(regions),address,geocode
            onLocationChange={this.onAutoCompleteLocationChange}
            onChange={this.onAutocompleteChange}
            value={address}
            {...AutoCompleteProps}
          />
        </div>
        <LocationMap
          ref={this.locationMap}
          lat={lat}
          lng={lng}
          zoom={zoom}
          onLocationChanged={this.onLocationChanged}
          onZoomChanged={this.onZoomChanged}
          {...LocationMapProps}
        />
      </div>
    );
  }
}

EditLocation.propTypes = propTypes;

EditLocation.defaultProps = defaultProps;

export default EditLocation;
