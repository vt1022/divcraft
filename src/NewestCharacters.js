import React, {Component} from 'react'
import Character from './Character'
import FadeIn from 'react-fade-in'

class NewestCharacters extends Component {
  render() {
    const {characterArray} = this.props
    return (
        <ul>
          { // control # of chars to show with slice
            characterArray.slice(0, 5).map((character) => {
              const {body, hair, eyes, head, mouth, nose} = character.charStyles
              return(
                <li key={character.charId}>
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