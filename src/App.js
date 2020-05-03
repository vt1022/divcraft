import React, { Component } from 'react'
import Character from './Character.js'
import FeaturesSelection from './FeaturesSelection.js'
import NewestCharacters from './NewestCharacters.js'
import firebase from './firebase.js'
import './style/style.css'

class App extends Component {
  constructor() {
    super();
    this.state = {
      characterArray: [],
      userCharacterName: "",
      currentCharacter: {
        "charName": "",
        "charStyles": {
          "head": "",
          "hair": "",
          "eyes": "",
          "nose": "",
          "mouth": "",
          "body": ""
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
          "charName": data[key].charName,
          "charStyles": {
            "head": head,
            "hair": hair,
            "eyes": eyes,
            "nose": nose,
            "mouth": mouth,
            "body": body
          }
          
        }
        arrayOfCharacters.unshift(characterObject)
        this.setState({
          characterArray: arrayOfCharacters,
          currentCharacter: characterObject
        })
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.userCharacterName.trim() !== "") {
      const {head, hair, eyes, nose, mouth, body} = this.state.currentCharacter.charStyles
      const dbRef = firebase.database().ref()
      const characterObjToFirebase = {
        "charName": this.state.userCharacterName,
        "charStyles": {
          "head": head,
          "hair": hair,
          "eyes": eyes,
          "nose": nose,
          "mouth": mouth,
          "body": body
        }
      }
      dbRef.push(characterObjToFirebase)
      this.setState({userCharacterName: ""})
    } else {
      this.setState({userCharacterName: ""})
    }
  }
  // take user input and save into state
  handleNameInput = (e) => {
    this.setState({userCharacterName: e.target.value})
  }
  // updates the buttons to display selected feature category
  handleFeatureNavClick = (clickedFeature) => {
    const showThese = []
    for (let i = 1; i < 6; i++) {
      showThese.push(clickedFeature+i)
    }
    this.setState({featuresToShowCss: showThese})
  }
  // a reusable function to change different features:
  changeFeature = (newFeatureCssClass) => {
    const {body, hair, eyes, head, mouth, nose} = this.state.currentCharacter.charStyles
    const newCharObj = {
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
    // regEx to grab class without numbers
    const re = /[a-z]+/gi 
    const clickedFeature = re.exec(newFeatureCssClass).join()
    newCharObj['charStyles'][clickedFeature] = newFeatureCssClass
    this.setState({currentCharacter: newCharObj})
  }
  // get info from FeaturesSelection.js and update state.currentChar
  handleCharacterListClick = (charId) => {
    const clickedCharacter = this.state.characterArray
      .filter((character) => character.charId === charId)
    this.setState({currentCharacter: clickedCharacter[0]})
  }

  render() {
    const {body, hair, eyes, head, mouth, nose} = this.state.currentCharacter.charStyles
    const {featuresToShowCss, characterArray} = this.state
    return (
      <div className="App">
        <div className="wrapper">
          <header>
            <h1>DivCraft</h1>
          </header>

          <section className="charCreation">
            <Character 
              head={head}
              hair={hair}
              eyes={eyes}
              nose={nose}
              mouth={mouth}
              body={body}
            />
            <div className="grass"></div>

            <form action="" onSubmit={this.handleSubmit}>
              <label htmlFor="characterName">Name:</label>
              <input 
                type="text" 
                id="characterName"
                placeholder="display name"
                value ={this.state.userCharacterName}
                onChange={this.handleNameInput} 
              />
              <button className="button">Create</button>
            </form>

            <FeaturesSelection 
              selectedFeatureArray={featuresToShowCss} 
              changeFeatureFunction={this.changeFeature}
              featureNavClickFunction={this.handleFeatureNavClick}
            />

          </section>

          <section className="newestCharacters">
              <NewestCharacters 
                characterArray={characterArray}
                handleCharacterListClick={this.handleCharacterListClick}  
              />
          </section>
        </div> {/* wrapper */}

        <footer>
          <p><a href="https://twitter.com/vinccimantsui">@vinccimantsui</a> © 2020</p> 
        </footer>
      </div>
    );
  }
}

export default App