import React, {Component} from 'react'

class SelectionEyes extends Component {
  render() {
    const eyes = ["eyes1", "eyes2", "eyes3", "eyes4", "eyes5"];
    return(
      <div className="SelectionEyes">
        {
          eyes.map((eye)=> {
            return(
              <button className="eyesContainer">
                <div className={eye}></div>
              </button>
            )
          })
        }
      </div>
    )
  }
}

export default SelectionEyes