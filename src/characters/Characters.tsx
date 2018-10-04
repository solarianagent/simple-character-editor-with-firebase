import * as React from 'react';
import { Redirect } from 'react-router';

import { CharacterItem } from './CharacterItem';
import './Characters.css';
import { characterService, ICharacter } from './CharacterService';

interface ICharactersState {
  characters: ICharacter[],
  toCharacterEditor: boolean,
  characterToEdit?: string
}

class Characters extends React.Component<{}, ICharactersState> {
  constructor(props: React.Props<{}>) {
    super(props);
    this.state = {characters: [], toCharacterEditor: false};
  }

  public componentDidMount() {
    characterService.getCharacters()
      .then(characters => this.setState({characters}))
  }

  public goToCharacterEdit = (characterToEdit?: string) => (mouseEvent: React.MouseEvent) => {
    this.setState((state) => ({...state, characterToEdit, toCharacterEditor: true}))
  }

  public render() {
    const {toCharacterEditor, characterToEdit} = this.state;

    if(toCharacterEditor) {
      return characterToEdit ? 
        <Redirect to={`/character/${characterToEdit}`} /> :
        <Redirect to='/character' />
    }

    return <div className="pure-menu">
      <ul className="pure-menu-list">
        {this.state.characters.map(character => 
          <li className="pure-menu-item" key={character.id}>
            <CharacterItem characterName={character.name} characterSymbol={""} onClick={this.goToCharacterEdit(character.id)}/>
          </li>
        )}
      </ul>
    </div> 
  }
}


export default Characters;