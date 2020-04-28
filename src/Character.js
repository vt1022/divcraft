import React, {Component} from 'react'
import './Character.css'

class Character extends Component {
  render() {
    const {head, hair, hairLeft, hairRight, eyes, eyeLeft, eyeRight, nose, mouth, body} = this.props;
    return(
      <div className="canvas">
        <div className="character">
          <div className={head}>
            <div className={hair}>
              <div className={hairLeft}></div>
              <div className={hairRight}></div>
            </div>
            <div className={eyes}>
              <div className={eyeLeft}></div>
              <div className={eyeRight}></div>
            </div>
            <div className={nose}></div>
            <div className={mouth}></div>
          </div>
          <div className={body}></div>
        </div>
      </div>
    )
  }
}

export default Character