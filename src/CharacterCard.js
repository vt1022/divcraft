import React, {Component} from 'react'
import Character from './Character'

class CharacterCard extends Component {
  constructor() {
    super()
    this.state = {cardAnimation: false}
  }

  addAnimationClass = () => {
    this.setState({cardAnimation: true})
  }

  liOnClick = (e, character) => {
    this.addAnimationClass()
    this.props.handleCharacterListClick(character.charId)
  }

  keyPressed = (e, eForClickFunction, character) => {
    if (e.key === "Enter") {
      this.liOnClick(eForClickFunction, character)
    }
  }

  render() {
    const {character} = this.props
    const {body, hair, eyes, head, mouth, nose} = this.props.character.charStyles
    const {cardAnimation} = this.state
    return (
      <li onClick={(e) => this.liOnClick(e, character)}
        onKeyDown={(e, eForClickFunction) => this.keyPressed(e, eForClickFunction, character)}
        className={cardAnimation ? "rotate-diagonal-1" : ""}
        onAnimationEnd={() => this.setState({cardAnimation: false})}
        tabIndex="0"
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
  }
}

export default CharacterCard