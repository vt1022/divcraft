import React, { Component } from 'react'
import Character from './Character.js'
import firebase from './firebase.js'
import './App.css'

class App extends Component {
  constructor() {
    super();
    this.state = {
      characters: [],
      userCharacterName: "",
    }
    // const charactersObject = {
    //   "charId": key,
    //   "charName": userCharacterName,
    //   "head": headClass,
    //   "hair": hairClass,
    //     "hairLeft": hairLeftClass,
    //     "hairRight": hairRightClass,
    //   "eyes": eyeClass,
    //     "eyeLeft": eyeLeftClass,
    //     "eyeRight": eyeRightClass,
    //   "nose": noseClass,
    //   "mouth": mouthClass,
    //   "body": bodyClass
    // }
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();
    dbRef.on('value', (result) => {
      const data = result.val()
      const arrayOfClasses = []
      // set default character with classes
      // for (let key in data) {
      //   arrayOfClasses.push({"bookId": key, "bookName": data[key]})
      //   this.setState({
      //     books: arrayOfClasses
      //   })
      // }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.userCharacterName.trim() !== "") {
      const dbRef = firebase.database().ref()
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

  render() {
    const {characters, userCharacterName} = this.state
    return (
      <div className="App">
        <form action="" onSubmit={this.handleSubmit}>
          <label htmlFor="characterName">Name:</label>
          <input type="text" id="characterName" onChange={this.handleNameInput} value ={userCharacterName}/>
          <button>Create</button>
        </form>
        <Character 
          head="head"
          hair="hair"
          hairLeft="left"
          hairRight="right"
          eyes="eyes"
          eyeLeft="left"
          eyeRight="right"
          nose="nose"
          mouth="mouth"
          body="body"
        />
      </div>
    );
  }
}

export default App