import React, { Component } from 'react'
import Character from './Character.js'
import FeaturesSelection from './FeaturesSelection.js'
import firebase from './firebase.js'
import './style/style.css'

class App extends Component {
  constructor() {
    super();
    this.state = {
      characterArray: [],
      userCharacterName: "",
      currentCharacter: {
        "charId": "01",
        "charName": "default",
        "charStyles": {
          "head": "head1",
          "hair": "hair1",
          "eyes": "eyes1",
          "nose": "nose1",
          "mouth": "mouth1",
          "body": "body1"
        }
      },
      featuresToShowCss: ["eyes1", "eyes2", "eyes3", "eyes4", "eyes5"]
    }
  }
  
  componentDidMount() {
    const dbRef = firebase.database().ref();
    dbRef.on('value', (result) => {
      const data = result.val()
      const arrayOfCharacters = []
      // set default character with classes
      for (let key in data) {
        const {body, eyes, hair, head, mouth, nose} = data[key].charStyles
        const characterObject = {
          "charId": key,
          "charName": key.charName,
          "charStyles": {
            "head": head,
            "hair": hair,
            "eyes": eyes,
            "nose": nose,
            "mouth": mouth,
            "body": body
          }
        }
        arrayOfCharacters.push(characterObject)
        this.setState({
          characterArray: arrayOfCharacters,
          currentCharacter: characterObject
        })
        console.log(data)
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {character} = this.state;
    if (this.state.userCharacterName.trim() !== "") {
      const dbRef = firebase.database().ref()
      // push this to fb:
      // const characterObject = {
      //   "charName": this.state.userCharacterName,
      //   "charStyles": {
      //     "head": head,
      //     "hair": hair,
      //     "eyes": eyes,
      //     "nose": nose,
      //     "mouth": mouth,
      //     "body": body
      //   }
      // }
      // change this to push object:
      dbRef.push(this.state.userCharacterName)
      this.setState({
        userCharacterName: ""
      })
    } else {
      this.setState({
        userCharacterName: ""
      })
    }
  }
  // take user input and save into state
  handleNameInput = (e) => {
    this.setState({
      userCharacterName: e.target.value,
    })
    
    console.log(this.state.userCharacterName);
  }

  handleFeatureNavClick = (clickedFeature) => {
    const showThese = []
    for (let i = 1; i < 6; i++) {
      showThese.push(clickedFeature+i)
    }
    this.setState({
      featuresToShowCss: showThese
    })
  }

  // a reusable function to change different features
  changeFeature = (newFeatureCssClass) => {
    const {body, hair, eyes, head, mouth, nose} = this.state.currentCharacter.charStyles
    // change the selected feature
    const newCharObj = {
      "charId": this.state.currentCharacter.charId,
      "charName": this.state.currentCharacter.charName,
      "charStyles": {
        "head": head,
        "hair": hair,
        "eyes": eyes,
        "nose": nose,
        "mouth": mouth,
        "body": body
      }
    }
    const re = /[a-z]+/gi
    const clickedFeature = re.exec(newFeatureCssClass).join()
    newCharObj['charStyles'][clickedFeature] = newFeatureCssClass
    this.setState({
      currentCharacter: newCharObj
    })
  }

  render() {
    const {body, hair, eyes, head, mouth, nose} = this.state.currentCharacter.charStyles
    const {featuresToShowCss} = this.state
    return (
      <div className="App">
        <form action="" onSubmit={this.handleSubmit}>
          <label htmlFor="characterName">Name:</label>
          <input type="text" id="characterName" onChange={this.handleNameInput} value ={this.state.userCharacterName}/>
          <button>Create</button>
        </form>

        <Character 
          head={head}
          hair={hair}
          eyes={eyes}
          nose={nose}
          mouth={mouth}
          body={body}
        />
        
        <FeaturesSelection 
          selectedFeatureArray={featuresToShowCss} 
          changeFeatureFunction={this.changeFeature}
          featureNavClickFunction={this.handleFeatureNavClick}
        />
      </div>
    );
  }
}

export default App