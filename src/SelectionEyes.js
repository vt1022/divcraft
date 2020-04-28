import React, {Component} from 'react'

class SelectionEyes extends Component {
  render() {
    const {changeFeatureFunction, eyes} = this.props
    return(
      <div className="SelectionEyes">
        {
          eyes.map((eye)=> {
            return(
              <button key={eye} className="eyesButton" 
                onClick={() => changeFeatureFunction("eyes", eye)} >
                <div className={eye}>
                  <div className="left"></div>
                  <div className="right"></div>
                </div>
              </button>
            )
          })
        }
      </div>
    )
  }
}

export default SelectionEyes