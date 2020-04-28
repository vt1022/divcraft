import React, { Component } from 'react'
import Character from './Character.js'
import SelectionEyes from './SelectionEyes.js'
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
          "head": "head",
          "hair": "hair",
          "eyes": "eyes1",
          "nose": "nose",
          "mouth": "mouth",
          "body": "body"
        }
      },
      eyesCss: ["eyes1", "eyes2", "eyes3", "eyes4", "eyes5"],
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
        console.log(data);
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
      dbRef.push(this.state.userCharacterName);
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
  // a reusable function to change different features
  changeFeature = (newFeature, newFeatureCssClass) => {
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
    newCharObj["charStyles"][newFeature] = newFeatureCssClass
    this.setState({
      currentCharacter: newCharObj
    })
  }

  render() {
    const {body, hair, eyes, head, mouth, nose} = this.state.currentCharacter.charStyles
    const {eyesCss} = this.state
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
        <SelectionEyes 
          eyes={eyesCss} 
          changeFeatureFunction={this.changeFeature}
        />
      </div>
    );
  }
}

export default App