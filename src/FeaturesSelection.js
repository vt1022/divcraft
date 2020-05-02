import React, {Component} from 'react'

class FeaturesSelection extends Component {
  render() {
    const {featureNavClickFunction, changeFeatureFunction, selectedFeatureArray} = this.props
    const changeableFeatures = ["hair", "head", "eyes", "nose", "mouth", "body"];
    return(
      <div className="FeaturesSelection">
        <ul className="featuresNav">
          {
            changeableFeatures.map( (feature) => {
              return(
                <li key={feature}>
                  <button onClick={() => featureNavClickFunction(feature)}>{feature}</button>
                </li> 
              )
            })
          }
        </ul>
        {
          selectedFeatureArray.map( (cssClass) => {
            // regEx to grab class without numbers
            const re = /[a-z]+/gi
            const globalClass = re.exec(cssClass).join()
            return(
              <button key={cssClass} className="featureButton" 
              onClick={() => changeFeatureFunction(cssClass)}>
                <div className={`${cssClass} ${globalClass}`}>
                  { // add left, right for eyes
                    globalClass === "eyes"
                      ? <>
                          <div className="left"></div>
                          <div className="right"></div>
                        </>
                      : <></>
                  }
                </div>
              </button>
            )
          })
        }
      </div>
    )
  }
}

export default FeaturesSelection