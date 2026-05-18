import React, { PureComponent as Component } from "react";
import PropTypes from "prop-types";

import ResponsiveGrid from "ui/list/responsive_grid";
import Thumbnail from "ui/media/thumbnail";

import styles from "./Videos.module.less";

const propTypes = {
  classNames: PropTypes.object,

  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      thumbnail: PropTypes.string,
      player: PropTypes.string,
      provider: PropTypes.string,
    })
  ).isRequired,

  getGridProps: PropTypes.func,

  onItemClick: PropTypes.func,
  renderItem: PropTypes.func,
};

const defaultProps = {
  classNames: {},
  getGridProps: () => {
    return {
      minWidth: 200,
      gutter: 10,
    };
  },
};

class Videos extends Component {
  constructor(props) {
    super(props);
  }

  /* ========================================================================*
   *
   *                     Methods
   *
   * ========================================================================*/

  onItemClick = ({ item, index }) => {
    //<editor-fold defaultstate="collapsed" desc="onItemClick">
    const { items, onItemClick } = this.props;

    if (_.isFunction(onItemClick)) {
      onItemClick({
        item,
        index,
        items,
        Videos: this,
      });
    }

    const _items = _.map(items, (item) => {
      const { provider, player } = item;
      return {
        src: player,
        provider: provider,
      };
    });

    openPopup({
      name: "video",
      data: {
        current: index,
        hideOnOverlayClick: false,
        autoPlay: true,
        onGalleryFinish: "loop",
        items: _items,
      },
    });
    //</editor-fold>
  };

  /* ========================================================================*
   *
   *                     Renderers
   *
   * ========================================================================*/

  renderItem = ({ gridItemWidth, item, index }) => {
    //<editor-fold defaultstate="collapsed" desc="renderItem">
    const classNames = this.classNames;
    const { renderItem } = this.props;

    if (_.isFunction(renderItem)) {
      return renderItem({
        classNames,
        item,
        index,
        gridItemWidth,
        onItemClick: () => {
          this.onItemClick({ item, index });
        },
        Videos: this,
      });
    }

    const className = _g.classNames(
      classNames["item"],
      { [classNames["item-full"]]: gridItemWidth === "100%" },
      { [classNames["item-grid"]]: gridItemWidth !== "100%" }
    );

    const { thumbnail } = item;
    return (
      <Thumbnail
        key={index}
        className={className}
        src={thumbnail}
        width={gridItemWidth}
        height="200px"
        showPlayIcon={true}
        onClick={() => {
          this.onItemClick({ item, index });
        }}
      />
    );
    //</editor-fold>
  };

  render() {
    const classNames = _g.getClassNames(styles, this.props.classNames);
    this.classNames = classNames;

    const { items, getGridProps } = this.props;

    return (
      <ResponsiveGrid
        items={items}
        getGridProps={getGridProps}
        renderItem={this.renderItem}
      />
    );
  }
}

Videos.propTypes = propTypes;

Videos.defaultProps = defaultProps;

export default Videos;
