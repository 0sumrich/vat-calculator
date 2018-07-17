import React, { Component } from 'react';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = { hover: false };
  }
  hover() {
    this.setState(prevState => {
      return { hover: !prevState.hover };
    });
  }
  render() {
    const { active, text, click, colors, tab, children } = this.props;
    const hover = this.state.hover;
    const style = {
      background: active || hover ? colors[0] : colors[1],
      boxShadow: active || hover ? "inset 1px 1px grey" : "2px 2px grey"
    };
    
    const tabIndex = tab ? tab : -1;
    console.log(tabIndex)
    return (
      <button
        className="btn"
        style={style}
        onClick={click}
        onMouseEnter={e => this.hover(e)}
        onMouseLeave={e => this.hover(e)}
        tabIndex={tabIndex} 
        >
        {children}
      </button>
    );
  }
}

export default Button;