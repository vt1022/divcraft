import React, {Component} from 'react'
import Character from './Character'

class NewestCharacters extends Component {
  constructor() {
    super()
    this.state = {cardAnimation: false}
  }

  addAnimationClass = () => {
    this.setState ({cardAnimation: true})
  }

  liOnClick = (e, character) => {
    this.props.handleCharacterListClick(character.charId)
    this.addAnimationClass()
  }

  render() {
    const {characterArray, handleCharacterListClick} = this.props

    return (
      <ul>
        { // control # of chars to show with slice
          characterArray.slice(0, 5).map((character) => {
            const {body, hair, eyes, head, mouth, nose} = character.charStyles
            const {cardAnimation} = this.state
            return(
              <li key={character.charId}
                onClick={(e) => this.liOnClick(e, character)}
                // className={cardAnimation ? "rotate-diagonal-1" : ""}
              >
                <Character 
                  head={head}
                  hair={hair}
                  eyes={eyes}
                  nose={nose}
                  mouth={mouth}
                  body={body}
                />
                <h3>{character.charName}</h3>
              </li>
            )
          })
        }
      </ul>
    )
  }
}

export default NewestCharacters