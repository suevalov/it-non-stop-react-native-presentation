/* eslint new-cap:0, max-statements:0, react/no-did-mount-set-state:0 */
/* global window document localStorage */

import React from "react/addons";
import assign from "object-assign";
import cloneWithProps from "react/lib/cloneWithProps";
import Radium from "radium";
import Presenter from "./presenter";
import Export from "./export";
import Overview from "./overview";

React.initializeTouchEvents(true);

const Style = Radium.Style;

import Progress from "./progress";
const TransitionGroup = Radium(React.addons.TransitionGroup);

@Radium
class Deck extends React.Component {
  constructor(props) {
    super(props);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._goToSlide = this._goToSlide.bind(this);
    this.state = {
      lastSlide: null
    };
  }
  componentDidMount() {
    const slide = this._getSlideIndex();
    this.setState({
      lastSlide: slide
    });
    localStorage.setItem("spectacle-slide",
      JSON.stringify({slide: this.context.slide, forward: false, time: Date.now()}));
    this._attachEvents();
  }
  componentWillUnmount() {
    this._detachEvents();
  }
  _attachEvents() {
    window.addEventListener("storage", this._goToSlide);
    window.addEventListener("keydown", this._handleKeyPress);
  }
  _detachEvents() {
    window.removeEventListener("storage", this._goToSlide);
    window.removeEventListener("keydown", this._handleKeyPress);
  }
  _handleKeyPress(e) {
    const event = window.event ? window.event : e;
    // left, page down
    if (event.keyCode === 37 || event.keyCode === 33) {
      this._prevSlide();
    }
    // right, page up
    if (event.keyCode === 39 || event.keyCode === 34) {
      this._nextSlide();
    }
    if (event.keyCode === 79 && !event.ctrlKey && !event.metaKey) { // o
      this._toggleOverviewMode();
    }
    if (event.keyCode === 80 && !event.ctrlKey && !event.metaKey) { // o
      this._togglePresenterMode();
    }
  }
  _toggleOverviewMode() {
    const suffix = this.context.overview ? "" : "?overview";
    this.context.router.replaceWith("/" + (this.context.slide) + suffix);
  }
  _togglePresenterMode() {
    const suffix = this.context.presenter ? "" : "?presenter";
    this.context.router.replaceWith("/" + (this.context.slide) + suffix);
  }
  _getSuffix() {
    if (this.context.presenter) {
      return "?presenter";
    } else if (this.context.overview) {
      return "?overview";
    }
    return "";
  }
  _goToSlide(e) {
    if (e.key === "spectacle-slide") {
      const data = JSON.parse(e.newValue);
      const slide = this._getSlideIndex();
      this.setState({
        lastSlide: slide || 0
      });
      this.context.router.replaceWith("/" + (data.slide) + this._getSuffix());
    }
  }
  _prevSlide() {
    const slide = this._getSlideIndex();
    this.setState({
      lastSlide: slide
    });
    if (slide > 0) {
      this.context.router.replaceWith("/" + this._getHash(slide - 1) + this._getSuffix());
      localStorage.setItem("spectacle-slide",
        JSON.stringify({slide: this._getHash(slide - 1), forward: false, time: Date.now()}));
    }
  }
  _nextSlide() {
    const slide = this._getSlideIndex();
    this.setState({
      lastSlide: slide
    });
    if (slide < this.props.children.length - 1) {
      this.context.router.replaceWith("/" + this._getHash(slide + 1) + this._getSuffix());
      localStorage.setItem("spectacle-slide",
        JSON.stringify({slide: this._getHash(slide + 1), forward: true, time: Date.now()}));
    }
  }
  _getHash(slide) {
    let hash = slide;
    if ("id" in this.props.children[slide].props) {
      hash = this.props.children[slide].props.id;
    }
    return hash;
  }
  _getTouchEvents() {
    const self = this;

    return {
      onTouchStart(e) {
        self.touchObject = {
          startX: e.touches[0].pageX,
          startY: e.touches[0].pageY
        };
      },
      onTouchMove(e) {
        const direction = self._swipeDirection({
          x1: self.touchObject.startX,
          x2: e.touches[0].pageX,
          y1: self.touchObject.startY,
          y2: e.touches[0].pageY
        });

        self.touchObject = {
          startX: self.touchObject.startX,
          startY: self.touchObject.startY,
          endX: e.clientX,
          endY: e.clientY,
          length: Math.round(Math.sqrt(Math.pow(e.touches[0].pageX - self.touchObject.startX, 2))),
          direction
        };

        if (direction !== 0) {
          e.preventDefault();
        }
      },
      onTouchEnd(e) {
        self._handleSwipe(e);
      },
      onTouchCancel(e) {
        self._handleSwipe(e);
      }
    };
  }
  _handleClick(e) {
    if (this.clickSafe === true) {
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopPropagation();
    }
  }
  _handleSwipe() {
    if (typeof (this.touchObject.length) !== "undefined" && this.touchObject.length > 44) {
      this.clickSafe = true;
    } else {
      this.clickSafe = false;
    }

    if (Math.abs(this.touchObject.length) > 20) {
      if (this.touchObject.direction === 1) {
        this._nextSlide();
      } else if (this.touchObject.direction === -1) {
        this._prevSlide();
      }
    }

    this.touchObject = {};
  }
  _swipeDirection(touch) {
    const xDist = touch.x1 - touch.x2;
    const yDist = touch.y1 - touch.y2;
    const r = Math.atan2(yDist, xDist);
    let swipeAngle = Math.round(r * 180 / Math.PI);

    if (swipeAngle < 0) {
      swipeAngle = 360 - Math.abs(swipeAngle);
    }
    if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
      return 1;
    }
    if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
      return 1;
    }
    if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
      return -1;
    }

    return 0;
  }
  _getSlideIndex() {
    let index = 0;
    if (!parseInt(this.context.slide, 10)) {
      this.props.children.forEach((slide, i) => {
        if (slide.props.id === this.context.slide) {
          index = i;
        }
      });
    } else {
      index = parseInt(this.context.slide, 10);
    }
    return index;
  }
  _renderSlide() {
    const slide = this._getSlideIndex();
    const child = this.props.children[slide];
    return cloneWithProps(child, {
      key: slide,
      hash: this.context.slide,
      slideIndex: slide,
      lastSlide: this.state.lastSlide,
      transition: child.props.transition.length ?
        child.props.transition :
        this.props.transition,
      transitionDuration: child.props.transition.transitionDuration ?
        child.props.transitionDuration :
        this.props.transitionDuration
    });
  }
  render() {
    const globals = this.context.export ? {
      body: assign(this.context.styles.global.body, {
        minWidth: 1100,
        minHeight: 850,
        overflow: "auto"
      })
    } : {};

    const styles = {
      deck: {
        backgroundColor: this.context.presenter || this.context.overview ? "black" : "",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
      },
      transition: {
        height: "100%",
        width: "100%",
        perspective: 1000,
        transformStyle: "flat"
      }
    };

    let componentToRender;
    if (this.context.presenter) {
      componentToRender = (<Presenter slides={this.props.children}
        slide={this._getSlideIndex()} hash={this.context.slide} lastSlide={this.state.lastSlide} />);
    } else if (this.context.export) {
      componentToRender = <Export slides={this.props.children} />;
    } else if (this.context.overview) {
      componentToRender = <Overview slides={this.props.children} slide={this._getSlideIndex()} />;
    } else {
      componentToRender = (<TransitionGroup component="div" style={[styles.transition]}>
                            {this._renderSlide()}
                          </TransitionGroup>);
    }

    return (
      <div
        className="spectacle-deck"
        style={[styles.deck]}
        onClick={this._handleClick}
        {...this._getTouchEvents()}>
        {componentToRender}
        {!this.context.export ? <Progress
          items={this.props.children}
          currentSlide={this._getSlideIndex()}
          type={this.props.progress}/> : ""}
        <Style rules={assign(this.context.styles.global, globals)} />
      </div>
    );
  }
}

Deck.displayName = "Deck";

Deck.defaultProps = {
  transitionDuration: 500,
  progress: "pacman"
};

Deck.propTypes = {
  children: React.PropTypes.node,
  transition: React.PropTypes.array,
  transitionDuration: React.PropTypes.number,
  progress: React.PropTypes.oneOf(["pacman", "bar", "number", "none"])
};

Deck.contextTypes = {
  styles: React.PropTypes.object,
  router: React.PropTypes.object,
  presenter: React.PropTypes.bool,
  export: React.PropTypes.bool,
  overview: React.PropTypes.bool,
  slide: React.PropTypes.number
};

export default Deck;
