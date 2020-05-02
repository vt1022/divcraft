import React, {Component} from 'react'

class Character extends Component {
  render() {
    const {head, hair, eyes, nose, mouth, body} = this.props;
    return(
      <div className="character">
        <div className={head}>
          <div className={hair}>
          </div>
          <div className={eyes}>
            <div className="left"></div>
            <div className="right"></div>
          </div>
          <div className={nose}></div>
          <div className={mouth}></div>
          <div className={body}>
          </div>
        </div>
      </div>
    )
  }
}

export default Character